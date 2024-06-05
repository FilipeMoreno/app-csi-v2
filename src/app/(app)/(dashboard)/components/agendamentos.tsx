import { Suspense } from 'react'

export default async function DashboardAgendamentos() {
	type Agendamento = {
		id: string
		date: string
		activities: string
		equipment: string
		sector_id: string
		sector: {
			id: string
			name: string
		}
		time_id: string
		appointment_by: string
		time: {
			start: string
			end: string
		}
	}

	return (
		<>
			<h1>Meus agendamentos</h1>
			<Suspense fallback={<p>Carregando...</p>}>
				<div className="flex flex-row flex-wrap gap-4 gap-y-8 rounded-lg p-4">
					<div className="flex flex-row space-x-4">
						<div className="h-full w-24 rounded-lg bg-zinc-500 p-2">
							<div className="flex flex-col items-center justify-center font-bold text-xl">
								<span>12</span>
								<span>JUN</span>
							</div>
						</div>
						<div className="flex flex-col justify-center">
							<span className="font-bold text-2xl">Informática</span>
							<span className="text-lg">08:45 - 09:30</span>
						</div>
					</div>
				</div>
			</Suspense>
		</>
	)
}
