import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import { FaCalendarCheck, FaTriangleExclamation } from 'react-icons/fa6'
import DashboardAgendamentos from './components/agendamentos'
import DashboardCards from './components/cards'
import DashboardEmprestimos from './components/emprestimos'
import DashboardHeader from './components/header'

export default function DashboardPage() {
	return (
		<div className="flex flex-col gap-4">
			<DashboardHeader />
			<Alert className="bg-destructive">
				<FaTriangleExclamation className="h-8 w-8" color="white" />
				<AlertTitle className="ml-4 font-bold text-white">ATENÇÃO!</AlertTitle>
				<AlertDescription className="ml-4 text-white">
					Este aplicativo está em <u>desenvolvimento</u> e pode conter bugs.
				</AlertDescription>
			</Alert>
			<Alert className="bg-info">
				<FaCalendarCheck className="h-8 w-8" color="white" />
				<AlertTitle className="ml-4 font-bold text-white">
					AGENDAMENTO!
				</AlertTitle>
				<AlertDescription className="ml-4 text-white">
					Você possui um agendamento para hoje, não se esqueça!
				</AlertDescription>
			</Alert>
			<DashboardCards />
			<DashboardAgendamentos />
			<DashboardEmprestimos />
		</div>
	)
}
