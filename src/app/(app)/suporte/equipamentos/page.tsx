import HeaderPages from '@/components/HeaderPages'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

export default function EquipamentosSuporte() {
	return (
		<>
			<HeaderPages
				title="Equipamentos"
				description="Mostrando todos os equipamentos cadastrados"
				button="Novo equipamento"
				buttonLink="/suporte/equipamentos/novo"
			/>
			<div className="my-2">
				<Input placeholder="Pesquisar..." />
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Código</TableHead>
						<TableHead>Habilitado</TableHead>
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
		</>
	)
}
