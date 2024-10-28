import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function AgendamentosInformatica() {
	const now = new Date()

	// Horários da manhã e da tarde
	const timeSlotsMorning = [
		'07:15 - 08:00',
		'08:00 - 08:45',
		'08:45 - 09:30',
		'09:50 - 10:35',
		'10:35 - 11:20',
		'11:20 - 12:05',
	]

	const timeSlotsAfternoon = [
		'13:15 - 14:00',
		'14:00 - 14:45',
		'14:45 - 15:30',
		'15:50 - 16:35',
		'16:35 - 17:20',
		'17:20 - 18:05',
	]

	const agendamentos = ['09:50 - 10:35', '14:00 - 14:45']

	return (
		<div>
			<div className="flex items-center justify-between">
				<ChevronLeft />
				{Intl.DateTimeFormat('pt-BR', {
					dateStyle: 'full',
				}).format(now)}
				<ChevronRight />
			</div>
			<div className="mt-4 grid grid-cols-2 gap-4 border">
				{/* Coluna da manhã */}
				<div className="space-y-0 border-r pr-4">
					{timeSlotsMorning.map((time) => (
						<div key={time} className="flex items-center h-16 border-b">
							{/* Exibição do horário */}
							<div className="w-24 text-gray-500 text-sm text-center">
								{time}
							</div>
							{/* Exibição do agendamento, caso exista */}
							<div className="flex-grow flex items-center justify-center">
								{agendamentos.includes(time) ? (
									<div className="w-full h-10 bg-blue-100 rounded shadow-md flex items-center justify-center">
										Agendamento
									</div>
								) : null}
							</div>
						</div>
					))}
				</div>

				{/* Coluna da tarde */}
				<div className="space-y-0 pl-4">
					{timeSlotsAfternoon.map((time) => (
						<div key={time} className="flex h-16 items-center border-b">
							{/* Exibição do horário */}
							<div className="w-24 text-center text-gray-500 text-sm">
								{time}
							</div>
							{/* Exibição do agendamento, caso exista */}
							<div className="flex flex-grow items-center justify-center">
								{agendamentos.includes(time) ? (
									<div className="flex h-10 w-full rounded bg-green-300 p-2">
										<div className="flex flex-col">
											<p className="font-bold text-xs">1º ANO A</p>
											<p className="font-light text-xs">10:35 {'>'} 11:20</p>
										</div>
									</div>
								) : null}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
