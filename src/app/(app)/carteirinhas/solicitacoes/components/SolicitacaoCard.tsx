import { EyeIcon, MoreHorizontal, Trash2 } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type CardSolicitacaoProps = {
	solicitacao: {
		id: number
		nome: string
		serie: string
		turma: string
		status: string
		curso: string
		createdAt: string
	}
}

export function SolicitacaoCard({ solicitacao }: CardSolicitacaoProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>
					<div className="flex items-center space-x-2 text-lg uppercase">
						<span className="font-bold">{solicitacao.nome}</span>
						<Badge variant={'outline'} className="bg-orange-600 text-white">
							Novo
						</Badge>
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex flex-row flex-wrap items-center justify-between gap-y-4 md:gap-2 lg:gap-4">
					<div className="flex flex-col">
						<p className="text-sm">Série/Turma</p>
						<p className="font-bold text-base">{`${solicitacao.serie} ${solicitacao.turma}`}</p>
					</div>
					<div className="flex flex-col">
						<p className="text-sm">Curso</p>
						<p className="font-bold text-base">{solicitacao.curso}</p>
					</div>
					<div className="flex flex-col">
						<p className="text-sm">Data</p>
						<p className="font-bold text-base">{solicitacao.createdAt}</p>
					</div>
					<div className="flex flex-col">
						<p className="text-sm">Status</p>
						<Badge variant={'outline'} className="bg-green-800 font-bold">
							{solicitacao.status}
						</Badge>
					</div>
					<div className="flex flex-col">
						<div className="flex flex-row space-x-2">
							<Link href={`/carteirinhas/solicitacoes/${solicitacao.id}`}>
								<Button variant={'outline'} size={'icon'}>
									<EyeIcon className="h-4 w-4" />
								</Button>
							</Link>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant={'outline'} size={'icon'}>
										<MoreHorizontal className="h-4 w-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem>
										<Trash2 className="mr-2 h-4 w-4" /> Excluir
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
