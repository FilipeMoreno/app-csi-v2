'use client'

import HeaderPages from '@/components/HeaderPages'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

import { format, isBefore, isWeekend, startOfDay } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useCallback, useEffect, useMemo, useState } from 'react'

const defaultTimes = [
	{
		time: '07:15 - 08:00',
		available: true,
		description: 'Agendar',
		period: 'morning',
	},
	{
		time: '08:00 - 08:45',
		available: true,
		description: 'Agendar',
		period: 'morning',
	},
	{
		time: '08:45 - 09:50',
		available: true,
		description: 'Agendar',
		period: 'morning',
	},
	{
		time: '09:50 - 10:35',
		available: true,
		description: 'Agendar',
		period: 'morning',
	},
	{
		time: '10:35 - 11:20',
		available: true,
		description: 'Agendar',
		period: 'morning',
	},
	{
		time: '11:20 - 12:05',
		available: true,
		description: 'Agendar',
		period: 'morning',
	},
	{
		time: '13:15 - 14:00',
		available: true,
		description: 'Agendar',
		period: 'afternoon',
	},
	{
		time: '14:00 - 14:45',
		available: true,
		description: 'Agendar',
		period: 'afternoon',
	},
	{
		time: '14:45 - 15:30',
		available: true,
		description: 'Agendar',
		period: 'afternoon',
	},
	{
		time: '15:50 - 16:35',
		available: true,
		description: 'Agendar',
		period: 'afternoon',
	},
	{
		time: '16:35 - 17:20',
		available: true,
		description: 'Agendar',
		period: 'afternoon',
	},
	{
		time: '17:20 - 18:05',
		available: true,
		description: 'Agendar',
		period: 'afternoon',
	},
]

export default function AgendamentoInformatica() {
	const [selectedTimes, setSelectedTimes] = useState([])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
	const [selectedTimeInfo, setSelectedTimeInfo] = useState(null)
	const [date, setDate] = useState<Date | undefined>(new Date())
	const [selectedSerie, setSelectedSerie] = useState('')
	const [availableTimes, setAvailableTimes] = useState(defaultTimes)
	const [agendamentos, setAgendamentos] = useState(() => {
		if (typeof window !== 'undefined') {
			const savedAgendamentos = localStorage.getItem('agendamentos')
			return savedAgendamentos ? JSON.parse(savedAgendamentos) : {}
		}
		return {}
	})
	const [currentUser, setCurrentUser] = useState({
		id: '1',
		name: 'Prof. Atual',
		isAdmin: false,
	})

	useEffect(() => {
		localStorage.setItem('agendamentos', JSON.stringify(agendamentos))
	}, [agendamentos])

	const handleDateChange = useCallback((newDate: Date | undefined) => {
		setDate(newDate)
		setSelectedTimes([])
	}, [])

	const handleTimeSelect = useCallback(
		(time) => {
			if (selectedTimes.length > 0 && !time.available) {
				// Previne ação em horários reservados quando há seleção
				return
			}

			if (time.available) {
				setSelectedTimes((prev) =>
					prev.includes(time)
						? prev.filter((t) => t !== time)
						: [...prev, time],
				)
			} else {
				setSelectedTimeInfo(time)
				setIsInfoModalOpen(true)
			}
		},
		[selectedTimes],
	)

	const handleAgendar = useCallback(() => {
		if (selectedTimes.length > 0 && selectedSerie && date) {
			const dateKey = format(date, 'yyyy-MM-dd')
			const updatedTimes = availableTimes.map((time) => {
				if (
					selectedTimes.some((selectedTime) => selectedTime.time === time.time)
				) {
					return {
						...time,
						available: false,
						description: 'Reservado',
						serie: selectedSerie,
						professor: 'Prof. Atual',
						atividade: (
							document.getElementById('atividade') as HTMLTextAreaElement
						).value,
					}
				}
				return time
			})
			setAgendamentos((prev) => ({
				...prev,
				[dateKey]: updatedTimes,
			}))
			setAvailableTimes(updatedTimes)
			setSelectedTimes([])
			setIsModalOpen(false)
			toast.success('Agendamento realizado com sucesso!')
		}
	}, [selectedTimes, selectedSerie, date, availableTimes])

	const handleCancelarAgendamento = useCallback(() => {
		if (selectedTimeInfo && date) {
			const dateKey = format(date, 'yyyy-MM-dd')
			const updatedTimes = availableTimes.map((time) => {
				if (
					selectedTimeInfo.originalTimes.some((ot) => ot.time === time.time)
				) {
					return {
						...time,
						available: true,
						description: 'Agendar',
						serie: undefined,
						professor: undefined,
						atividade: undefined,
					}
				}
				return time
			})
			setAgendamentos((prev) => ({
				...prev,
				[dateKey]: updatedTimes,
			}))
			setAvailableTimes(updatedTimes)
			setIsInfoModalOpen(false)
			toast.success('Agendamento cancelado com sucesso!')
		}
	}, [selectedTimeInfo, date, availableTimes])

	const mergeConsecutiveTimes = useCallback((times) => {
		const mergedTimes = []
		let currentMerge = null

		times.forEach((time, index) => {
			if (!currentMerge) {
				currentMerge = { ...time, originalTimes: [time] }
			} else if (
				!time.available &&
				!currentMerge.available &&
				time.serie === currentMerge.serie &&
				time.professor === currentMerge.professor &&
				time.atividade === currentMerge.atividade
			) {
				currentMerge.time = `${currentMerge.time.split(' - ')[0]} - ${time.time.split(' - ')[1]}`
				currentMerge.originalTimes.push(time)
			} else {
				mergedTimes.push(currentMerge)
				currentMerge = { ...time, originalTimes: [time] }
			}

			if (index === times.length - 1) {
				mergedTimes.push(currentMerge)
			}
		})

		return mergedTimes
	}, [])

	const { mergedMorningTimes, mergedAfternoonTimes } = useMemo(() => {
		const morning = availableTimes.filter((time) => time.period === 'morning')
		const afternoon = availableTimes.filter(
			(time) => time.period === 'afternoon',
		)
		return {
			mergedMorningTimes: mergeConsecutiveTimes(morning),
			mergedAfternoonTimes: mergeConsecutiveTimes(afternoon),
		}
	}, [availableTimes, mergeConsecutiveTimes])

	useEffect(() => {
		if (date) {
			const dateKey = format(date, 'yyyy-MM-dd')
			if (isWeekend(date) || isBefore(date, startOfDay(new Date()))) {
				setAvailableTimes([])
			} else if (dateKey in agendamentos) {
				setAvailableTimes(agendamentos[dateKey])
			} else {
				setAvailableTimes(defaultTimes)
			}
		}
	}, [date, agendamentos])

	const renderTimeSlots = (times) => (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{times.map((time) => (
				<Card
					key={time.time}
					className={`cursor-pointer ${
						time.available
							? selectedTimes.includes(time)
								? 'border-error bg-primary/15 text-primary'
								: 'bg-secondary text-secondary-foreground'
							: 'bg-destructive text-destructive-foreground'
					}`}
					style={{
						gridColumn: `span ${time.originalTimes?.length || 1}`,
					}}
					onClick={() => handleTimeSelect(time)}
				>
					<CardContent className="p-4">
						<div className="font-bold text-lg mb-2">{time.time}</div>
						<div className="text-sm">{time.description}</div>
						{!time.available && (
							<>
								<div className="mt-2 text-sm">{time.serie}</div>
								<div className="text-sm">{time.professor}</div>
								<div className="text-sm">{time.atividade}</div>
								{time.originalTimes && time.originalTimes.length > 1 && (
									<div className="mt-2 border-t pt-2">
										{time.originalTimes.map((originalTime, index) => (
											<div key={index} className="text-xs">
												{originalTime.time}
											</div>
										))}
									</div>
								)}
							</>
						)}
					</CardContent>
				</Card>
			))}
		</div>
	)

	return (
		<>
			<HeaderPages title="Agendamentos Informática" />
			<div className="w-full px-4 py-4 sm:px-6 lg:px-8">
				<div className="flex flex-col gap-8 lg:flex-row">
					<div>
						<Calendar
							mode="single"
							selected={date}
							onSelect={handleDateChange}
							className="rounded-lg border border-secondary p-8"
							locale={ptBR}
							disabled={(date) =>
								isWeekend(date) || isBefore(date, startOfDay(new Date()))
							}
						/>
					</div>
					<div className="flex-1">
						<h2 className="mb-4 font-semibold text-xl">
							{date?.toLocaleDateString('pt-BR', {
								weekday: 'long',
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
						</h2>
						<h3 className="mb-2 font-semibold text-lg">Manhã</h3>
						{renderTimeSlots(mergedMorningTimes)}
						<h3 className="mt-6 mb-2 font-semibold text-lg">Tarde</h3>
						{renderTimeSlots(mergedAfternoonTimes)}
						{selectedTimes.length > 0 && (
							<Button className="mt-4" onClick={() => setIsModalOpen(true)}>
								Agendar Horários Selecionados
							</Button>
						)}
					</div>
				</div>
			</div>

			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent>
					<DialogTitle>Agendar Horários</DialogTitle>
					<DialogDescription>
						Preencha as informações para agendar os horários selecionados.
					</DialogDescription>
					<form
						onSubmit={(e) => {
							e.preventDefault()
							handleAgendar()
						}}
					>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="serie" className="text-right">
									Série
								</Label>
								<Select onValueChange={setSelectedSerie}>
									<SelectTrigger className="col-span-3">
										<SelectValue placeholder="Selecione a série" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="1º Ano A">1º Ano A</SelectItem>
										<SelectItem value="2º Ano B">2º Ano B</SelectItem>
										<SelectItem value="3º Ano C">3º Ano C</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="atividade" className="text-right">
									Atividade
								</Label>
								<Textarea
									id="atividade"
									placeholder="Descreva a atividade"
									className="col-span-3"
								/>
							</div>
						</div>
						<DialogFooter>
							<Button type="submit">Agendar</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>

			<Dialog open={isInfoModalOpen} onOpenChange={setIsInfoModalOpen}>
				<DialogContent>
					<DialogTitle>Informações do Agendamento</DialogTitle>
					<DialogDescription>Detalhes do horário agendado:</DialogDescription>
					{selectedTimeInfo && (
						<div className="py-4">
							<p>
								<strong>Horário:</strong> {selectedTimeInfo.time}
							</p>
							<p>
								<strong>Série:</strong> {selectedTimeInfo.serie}
							</p>
							<p>
								<strong>Professor:</strong> {selectedTimeInfo.professor}
							</p>
							<p>
								<strong>Atividade:</strong> {selectedTimeInfo.atividade}
							</p>
						</div>
					)}
					<DialogFooter>
						{(currentUser.isAdmin ||
							(selectedTimeInfo &&
								selectedTimeInfo.professor === currentUser.name)) && (
							<Button onClick={handleCancelarAgendamento} variant="destructive">
								Cancelar Agendamento
							</Button>
						)}
						<Button onClick={() => setIsInfoModalOpen(false)}>Fechar</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	)
}
