import HeaderPages from '@/components/HeaderPages'
import { Badge } from '@/components/ui/badge'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function OrdemServicoPage() {
	return (
		<>
			<HeaderPages
				title="Ordem de Serviços"
				description="Mostrando as ordens de serviços"
				button="Nova OS"
				buttonLink="/suporte/ordem-servico/novo"
			/>
			<Tabs defaultValue="aberto" className="w-full">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="aberto">Abertos (0)</TabsTrigger>
					<TabsTrigger value="fechado">Fechados (0)</TabsTrigger>
				</TabsList>
				<TabsContent value="aberto">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[100px]">Código</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Fora de serviço</TableHead>
								<TableHead>Descrição</TableHead>
								<TableHead>Equipamento</TableHead>
								<TableHead>Local</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell className="font-medium">INV001</TableCell>
								<TableCell>
									<Badge variant={'secondary'}>Sim</Badge>
								</TableCell>
								<TableCell>
									<Badge variant={'destructive'}>Sim</Badge>
								</TableCell>
								<TableCell>Projetor Epson S10+</TableCell>
								<TableCell>Projetor</TableCell>
								<TableCell>Sala 11</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="font-medium">INV001</TableCell>
								<TableCell>
									<Badge variant={'secondary'}>Sim</Badge>
								</TableCell>
								<TableCell>
									<Badge>Não</Badge>
								</TableCell>
								<TableCell>Projetor Epson S10+</TableCell>
								<TableCell>Projetor</TableCell>
								<TableCell>Sala 10</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TabsContent>
				<TabsContent value="fechado"></TabsContent>
			</Tabs>
		</>
	)
}
