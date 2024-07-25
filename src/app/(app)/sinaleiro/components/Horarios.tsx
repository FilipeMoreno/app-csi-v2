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
import { CheckIcon, Plus, Trash2Icon } from 'lucide-react'
import horarios from '../horarios.json'

export default function HorariosSinaleiro() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="font-bold">Lista de horários</CardTitle>
				<div className="flex flex-row items-center justify-between">
					<CardDescription>Horários em que a musica tocará</CardDescription>
					<Button variant="outline">
						<Plus className="mr-2 h-4 w-4" /> Horário
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				<Tabs defaultValue="segunda-feira" className="w-full">
					<TabsList className="grid w-auto grid-cols-5">
						{Object.entries(horarios).flatMap(([day], index) => (
							<TabsTrigger value={day} key={day}>
								{day.replace('-feira', '')}
							</TabsTrigger>
						))}
					</TabsList>
					<ScrollArea className="h-96 w-auto">
						{Object.entries(horarios).flatMap(([day, times], index) => (
							<TabsContent value={day} key={day}>
								{times.length === 0 && (
									<div className="my-4 flex items-center justify-center">
										<h1 className="text-xs">
											nenhum horário cadastrado para {day}
										</h1>
									</div>
								)}
								{times.flatMap((time) => (
									<div
										key={time.id}
										className="my-4 flex h-full flex-row items-center space-x-2"
									>
										<label className="w-full">
											Horário
											<Input type="time" defaultValue={time.horario} />
										</label>

										<label className="w-full">
											Duração
											<Input type="number" defaultValue={time.duracao} />
										</label>

										<Button
											className="mt-6 h-full"
											variant={'outline'}
											onClick={() => {
												console.log('salvou')
											}}
										>
											<CheckIcon size={15} />
										</Button>
										<Button
											className="mt-6 h-full"
											variant={'outline'}
											onClick={() => {
												return console.log('deletou')
											}}
										>
											<Trash2Icon size={15} />
										</Button>
									</div>
								))}
							</TabsContent>
						))}
					</ScrollArea>
				</Tabs>
			</CardContent>
		</Card>
	)
}
