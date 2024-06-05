import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import { FaTriangleExclamation } from 'react-icons/fa6'
import DashboardAgendamentos from './components/agendamentos'
import DashboardHeader from './components/header'

export default function DashboardPage() {
	return (
		<>
			<Alert className="bg-destructive">
				<FaTriangleExclamation className="h-4 w-4" color="white" />
				<AlertTitle className="font-bold text-white">Atenção!</AlertTitle>
				<AlertDescription className="text-white">
					Este aplicativo está em desenvolvimento e pode conter bugs.
				</AlertDescription>
			</Alert>
			<DashboardHeader />
			<DashboardAgendamentos />
		</>
	)
}
