import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { database } from '@/lib/firebaseService'
import { onValue, push, ref, remove, set } from 'firebase/database'
import { Plus, Trash2Icon } from 'lucide-react'
import { useEffect, useState } from 'react'

const daysOfWeek = [
	'segunda-feira',
	'terca-feira',
	'quarta-feira',
	'quinta-feira',
	'sexta-feira',
]

interface Horario {
	horario: string
	duracao: number
	id: string
}

interface Schedule {
	[key: string]: {
		[key: string]: Horario
	}
}

export default function HorariosSinaleiro() {
	const [schedule, setSchedule] = useState<Schedule>({})

	useEffect(() => {
		const scheduleRef = ref(database, 'sinal/horarios')
		onValue(scheduleRef, (snapshot) => {
			const data = snapshot.val()
			if (!data) {
				daysOfWeek.forEach((day) => {
					set(ref(database, `sinal/horarios/${day}`), {})
				})
			}
			setSchedule(data || {})
		})
	}, [])

	const addHorario = (day: string) => {
		const newHorarioRef = push(ref(database, `sinal/horarios/${day}`))
		set(newHorarioRef, {
			horario: '00:00',
			duracao: 10,
			id: newHorarioRef.key,
		})
	}

	const updateHorario = (
		day: string,
		id: string,
		horario: string,
		duracao: number,
	) => {
		set(ref(database, `sinal/horarios/${day}/${id}`), { horario, duracao, id })
	}

	const deleteHorario = (day: string, id: string) => {
		const horarioRef = ref(database, `sinal/horarios/${day}/${id}`)
		remove(horarioRef).then(() => {
			const dayRef = ref(database, `sinal/horarios/${day}`)
			onValue(
				dayRef,
				(snapshot) => {
					if (!snapshot.exists()) {
						set(dayRef, {})
					}
				},
				{ onlyOnce: true },
			)
		})
	}

	const sortedDaysOfWeek = daysOfWeek.sort((a, b) => {
		return daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b)
	})

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>
						<CardTitle className="font-bold">Lista de horários</CardTitle>
						<CardDescription>Horários em que a música tocará</CardDescription>
					</div>
					<Button variant="outline" onClick={() => addHorario('segunda-feira')}>
						<Plus className="mr-2 h-4 w-4" /> Adicionar Horário
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				<Tabs defaultValue="segunda-feira" className="w-full">
					<TabsList className="grid w-auto grid-cols-5">
						{sortedDaysOfWeek.map((day) => (
							<TabsTrigger value={day} key={day}>
								{day.replace('-feira', '')}
							</TabsTrigger>
						))}
					</TabsList>
					<ScrollArea className="h-96 w-auto">
						{sortedDaysOfWeek.map((day) => (
							<TabsContent value={day} key={day}>
								<div className="mb-2 flex justify-end">
									<Button variant="outline" onClick={() => addHorario(day)}>
										<Plus className="mr-2 h-4 w-4" /> Horário
									</Button>
								</div>
								{!schedule[day] || Object.values(schedule[day]).length === 0 ? (
									<div className="my-4 flex items-center justify-center">
										<h1 className="text-xs">
											Nenhum horário cadastrado para {day}
										</h1>
									</div>
								) : (
									Object.values(schedule[day]).map((time) => (
										<div
											key={time.id}
											className="my-4 flex h-full flex-row items-center space-x-2"
										>
											<label className="w-full">
												Horário
												<Input
													type="time"
													defaultValue={time.horario}
													onBlur={(e) =>
														updateHorario(
															day,
															time.id,
															e.target.value,
															time.duracao,
														)
													}
												/>
											</label>
											<label className="w-full">
												Duração
												<Input
													type="number"
													defaultValue={time.duracao}
													onBlur={(e) =>
														updateHorario(
															day,
															time.id,
															time.horario,
															Number(e.target.value),
														)
													}
												/>
											</label>
											<Button
												className="mt-6 h-full"
												variant={'outline'}
												onClick={() => deleteHorario(day, time.id)}
											>
												<Trash2Icon size={15} />
											</Button>
										</div>
									))
								)}
							</TabsContent>
						))}
					</ScrollArea>
				</Tabs>
			</CardContent>
		</Card>
	)
}
