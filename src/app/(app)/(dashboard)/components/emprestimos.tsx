import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import DevolverEmprestimo from './devolver-emprestimo'

export default function DashboardEmprestimos() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="font-bold text-xl uppercase">
					Meus empréstimos (1)
				</CardTitle>
				<CardDescription>Mostrando todos os empréstimos ativos</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col flex-wrap gap-4 lg:flex-row">
					<Card className="w-full bg-primary-foreground lg:max-w-[300px]">
						<CardHeader>
							<div className="flex flex-col justify-center gap-3">
								<div className="flex flex-col">
									<span className="text-[10px] uppercase">Equipamentos</span>
									<span>
										Caixa de som + Cabo P2 + Projetor + Notebook Lenovo
									</span>
								</div>
								<div className="flex flex-col">
									<span className="text-[10px] uppercase">Setor</span>
									<span>Informática</span>
								</div>
								<div className="flex flex-col">
									<span className="text-[10px] uppercase">Data</span>
									<span>01/01/2024 às 00:00</span>
								</div>
								<div>
									<DevolverEmprestimo />
								</div>
							</div>
						</CardHeader>
					</Card>
				</div>
			</CardContent>
		</Card>
	)
}
