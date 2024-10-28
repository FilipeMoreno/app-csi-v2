import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

export default function OrdemServicoDetalhes() {
	return (
		<>
			<div>
				<Label>Equipamento</Label>
				<Select>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Selecione o equipamento" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value="projetos">Projetor</SelectItem>
							<SelectItem value="computador">Computador</SelectItem>
							<SelectItem value="caixa-som">Caixa de som</SelectItem>
							<SelectItem value="camera">Câmera</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
				<Label>Data do Incidente</Label>
				<Input type="date" />
				<Label>Requerido por</Label>
				<Input type="text" />
				<div>
					<Checkbox id="falha" />
					<Label>Equipamento falhou?</Label>
				</div>
				<div>
					<Label>Tipo de falha</Label>
					<Input type="text" />
					<Label>Severidade da falha</Label>
					<Select>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Selecione" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="muito-alto">Muito alto</SelectItem>
								<SelectItem value="alto">Alto</SelectItem>
								<SelectItem value="medio">Médio</SelectItem>
								<SelectItem value="baixo">Baixo</SelectItem>
								<SelectItem value="muito-baixo">Muito baixo</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<div>
					<Checkbox id="fora-servico" />
					<Label>Fora de serviço?</Label>
				</div>
				<div>
					<Label>Desde quando</Label>
					<Input type="date" />
				</div>
				<div>
					<Label>Descrição</Label>
					<Input type="text" />
					<Label>Observação</Label>
					<Input type="text" />
					<Label>Descrição</Label>
					<Input type="text" />
				</div>
			</div>
		</>
	)
}
