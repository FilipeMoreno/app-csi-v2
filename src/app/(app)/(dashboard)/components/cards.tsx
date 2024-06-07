import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { FaCalendarDay, FaDesktop, FaTicket } from 'react-icons/fa6'

export default function DashboardCards() {
	return (
		<div className="grid gap-4 md:grid-cols-3">
			<Card>
				<CardHeader>
					<CardTitle>Chamados Abertos</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<div className="flex items-center justify-between">
						<div className="flex flex-row gap-2">
							<div className="font-bold text-4xl">68</div>
							<div className="flex items-end font-medium text-green-500 text-sm">
								+6%
							</div>
						</div>

						<FaTicket className="h-8 w-8 text-secondary" />
					</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Empréstimos de Equipamentos</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<div className="flex items-center justify-between">
						<div className="flex flex-row gap-2">
							<div className="font-bold text-4xl">12</div>
							<div className="flex items-end font-medium text-sm text-zinc-500">
								0%
							</div>
						</div>
						<FaDesktop className="h-8 w-8 text-secondary" />
					</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Agendamentos</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<div className="flex items-center justify-between">
						<div className="flex flex-row gap-2">
							<div className="font-bold text-4xl">8</div>
							<div className="flex items-end font-medium text-red-500 text-sm">
								-5%
							</div>
						</div>
						<FaCalendarDay className="h-8 w-8 text-secondary" />
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
