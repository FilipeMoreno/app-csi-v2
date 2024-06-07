import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { FaCheck, FaCircleCheck } from 'react-icons/fa6'

export default function DashboardAgendamentos() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="font-bold text-xl uppercase">
					Meus agendamentos
				</CardTitle>
				<CardDescription>Mostrando todos os agendamentos</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col flex-wrap gap-4 lg:flex-row">
					<Card className="w-full bg-primary-foreground lg:max-w-[300px]">
						<CardHeader className="flex flex-col gap-2">
							<div className="flex flex-row items-center justify-around gap-4">
								<div className="flex flex-col items-center justify-center font-bold text-3xl">
									<span>01</span>
									<span>JAN</span>
								</div>
								<div className="flex flex-col gap-3">
									<div className="flex flex-col">
										<span className="text-[10px] uppercase">Setor</span>
										<span className="font-bold text-lg">Informática</span>
									</div>
									<div className="flex flex-col">
										<span className="text-[10px] uppercase">Horário</span>
										<span className="font-bold text-lg">07:15 - 08:00</span>
									</div>
									<div className="flex flex-col">
										<span className="text-[10px] uppercase">Série/Turma</span>
										<span className="font-bold text-lg">Nenhuma</span>
									</div>
								</div>
							</div>
							<div className="flex flex-row gap-2">
								<Button variant={'success'} className="w-full" disabled>
									<FaCircleCheck className="mr-2" /> Confirmado
								</Button>
							</div>
						</CardHeader>
					</Card>
					<Card className="w-full bg-primary-foreground lg:max-w-[300px]">
						<CardHeader className="flex flex-col gap-2">
							<div className="flex flex-row items-center justify-around gap-4">
								<div className="flex flex-col items-center justify-center font-bold text-3xl">
									<span>01</span>
									<span>JAN</span>
								</div>
								<div className="flex flex-col gap-3">
									<div className="flex flex-col">
										<span className="text-[10px] uppercase">Setor</span>
										<span className="font-bold text-lg">Informática</span>
									</div>
									<div className="flex flex-col">
										<span className="text-[10px] uppercase">Horário</span>
										<span className="font-bold text-lg">07:15 - 08:00</span>
									</div>
									<div className="flex flex-col">
										<span className="text-[10px] uppercase">Série/Turma</span>
										<span className="font-bold text-lg">1º ANO A</span>
									</div>
								</div>
							</div>
							<div className="flex flex-row gap-2">
								<Button className="w-full ">Confirmar</Button>
								<Button variant={'destructive'} className="w-full">
									Cancelar
								</Button>
							</div>
						</CardHeader>
					</Card>
				</div>
			</CardContent>
		</Card>
	)
}
