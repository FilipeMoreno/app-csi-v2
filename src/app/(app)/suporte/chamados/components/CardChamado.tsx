'use client'

import moment from 'moment'
import 'moment/locale/pt-br'
import Link from 'next/link'

import { DotsVerticalIcon } from '@radix-ui/react-icons'
import {
	ChevronDown,
	ChevronUp,
	ChevronsLeftRight,
	ChevronsUp,
	MessageCircle,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface TicketCardProps {
	item: {
		id: number
		solicitante: string
		assunto: string
		setor: string
		usuario: string | null
		prioridade: string
		status: string
		resumo: string
		createdAt: string
	}
}

export const TicketCard: React.FC<TicketCardProps> = ({ item }) => {
	return (
		<Card key={item.id}>
			<CardHeader>
				<CardTitle>
					<div className="flex items-center justify-between text-xl">
						<Link
							href={`/suporte/chamados/${item.id}`}
							className="hover:text-zinc-400"
						>
							{item.assunto}
						</Link>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size={'icon'}>
									<DotsVerticalIcon className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-56">
								<DropdownMenuSub>
									<DropdownMenuSubTrigger>
										Alterar status
									</DropdownMenuSubTrigger>
									<DropdownMenuPortal>
										<DropdownMenuSubContent>
											<DropdownMenuItem>Aberto</DropdownMenuItem>
											<DropdownMenuItem>Fechado</DropdownMenuItem>
										</DropdownMenuSubContent>
									</DropdownMenuPortal>
								</DropdownMenuSub>
								<DropdownMenuSub>
									<DropdownMenuSubTrigger>
										Alterar prioridade
									</DropdownMenuSubTrigger>
									<DropdownMenuPortal>
										<DropdownMenuSubContent>
											<DropdownMenuItem>Crítica</DropdownMenuItem>
											<DropdownMenuItem>Alta</DropdownMenuItem>
											<DropdownMenuItem>Moderada</DropdownMenuItem>
											<DropdownMenuItem>Baixa</DropdownMenuItem>
										</DropdownMenuSubContent>
									</DropdownMenuPortal>
								</DropdownMenuSub>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Deletar</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription>{item.resumo}</CardDescription>
				<CardDescription>Setor: {item.setor}</CardDescription>
			</CardContent>
			<CardFooter className="flex flex-row justify-between">
				<div className="flex flex-row items-center space-x-2">
					<Badge variant={'outline'}>#{item.id}</Badge>
					{item.prioridade === 'Crítica' && (
						<div className="flex flex-row items-center">
							<ChevronsUp className="mr-1 h-4 w-4 text-red-600" />
							<span className="text-red-600">{item.prioridade}</span>
						</div>
					)}
					{item.prioridade === 'Alta' && (
						<div className="flex flex-row items-center">
							<ChevronUp className="mr-1 h-4 w-4 text-orange-600" />
							<span className="text-orange-600">{item.prioridade}</span>
						</div>
					)}
					{item.prioridade === 'Moderada' && (
						<div className="flex flex-row items-center">
							<ChevronsLeftRight className="mr-1 h-4 w-4 text-yellow-600" />
							<span className="text-yellow-600">{item.prioridade}</span>
						</div>
					)}
					{item.prioridade === 'Baixa' && (
						<div className="flex flex-row items-center">
							<ChevronDown className="mr-1 h-4 w-4 text-green-600" />
							<span className="text-green-600">{item.prioridade}</span>
						</div>
					)}
					<Badge>{item.status}</Badge>
					<span className="flex flex-row items-center text-zinc-400">
						<MessageCircle className="mr-1 h-4 w-4" />0
					</span>
				</div>
				<span className="text-sm text-zinc-500">
					{moment(item.createdAt).fromNow()}
				</span>
			</CardFooter>
		</Card>
	)
}
