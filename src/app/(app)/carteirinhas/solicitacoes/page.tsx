'use client'

import {
	EyeIcon,
	FilterIcon,
	MoreHorizontal,
	Plus,
	ScanLine,
	Trash2,
} from 'lucide-react'
import 'moment/locale/pt-br'
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
import { Input } from '@/components/ui/input'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'

export default function CarteirinhasSolicitacoes() {
	const solicitacoes = [
		{
			id: 1,
			nome: 'João da Silva',
			serie: '6º ANO',
			turma: 'B',
			status: 'Entregue',
			curso: 'Ensino Fundamental II',
			createdAt: '2021-08-01',
		},
		{
			id: 2,
			nome: 'Larissa Amorim',
			serie: '3º SÉRIE',
			turma: 'A',
			status: 'Aguardando foto',
			curso: 'Ensino Médio',
			createdAt: '2021-08-01',
		},
		{
			id: 3,
			nome: 'Gabriel Rodrigues',
			serie: '8º ANO',
			turma: 'C',
			status: 'Aguardando pagamento',
			curso: 'Ensino Fundamental II',
			createdAt: '2021-08-01',
		},
		{
			id: 4,
			nome: 'Maria Eduarda',
			serie: '2º SÉRIE',
			turma: 'B',
			status: 'Em análise',
			curso: 'Ensino Médio',
			createdAt: '2021-08-01',
		},
	]
	return (
		<div className="flex flex-col justify-center">
			<div className="flex flex-row items-center justify-between">
				<div>
					<h1 className="font-bold text-2xl">Solicitações</h1>
					<p className="text-sm">Mostrando todas as solicitações realizadas</p>
				</div>
				<div>
					<Button variant={'outline'}>
						<Plus className="mr-2 h-4 w-4" /> Solicitação
					</Button>
				</div>
			</div>

			<div className="flex flex-row items-center justify-between space-x-2">
				<Input className="my-4 w-full" placeholder="Pesquisar" />
				<Link href={'/carteirinhas/scanner'}>
					<Button variant={'outline'} size={'icon'}>
						<ScanLine className="h-4 w-4" />
					</Button>
				</Link>

				<Sheet>
					<SheetTrigger asChild>
						<Button variant={'outline'} size={'icon'}>
							<FilterIcon className="h-4 w-4" />
						</Button>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>Filtros</SheetTitle>
							<SheetDescription>
								Filtre as solicitações de acordo com suas necessidades
							</SheetDescription>
						</SheetHeader>
						<div className="grid gap-4 py-4">
							<Select>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Ano" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="2024">2024</SelectItem>
									<SelectItem value="2023">2023</SelectItem>
									<SelectItem value="2022">2022</SelectItem>
								</SelectContent>
							</Select>
							<Select>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Curso" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="EI">Educação Infantil</SelectItem>
									<SelectItem value="EFI">Ensino Fundamental I</SelectItem>
									<SelectItem value="EFII">Ensino Fundamental II</SelectItem>
									<SelectItem value="EM">Ensino Médio</SelectItem>
								</SelectContent>
							</Select>
							<Select>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Série" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="light">6º ANO</SelectItem>
									<SelectItem value="dark">7º ANO</SelectItem>
									<SelectItem value="system">8º ANO</SelectItem>
								</SelectContent>
							</Select>
							<Select>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Turma" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="light">A</SelectItem>
									<SelectItem value="dark">B</SelectItem>
									<SelectItem value="system">C</SelectItem>
								</SelectContent>
							</Select>
							<Select>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="light">Entregue</SelectItem>
									<SelectItem value="dark">Aguardando foto</SelectItem>
									<SelectItem value="system">Aguardando pagamento</SelectItem>
									<SelectItem value="analise">Em análise</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<SheetFooter>
							<SheetClose asChild>
								<Button variant="outline" className="w-full" type="submit">
									Salvar
								</Button>
							</SheetClose>
						</SheetFooter>
					</SheetContent>
				</Sheet>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>
						<div className="flex items-center space-x-2 text-lg uppercase">
							<span className="font-bold">Nome do aluno</span>
							<Badge variant={'outline'} className="bg-orange-600 text-white">
								Novo
							</Badge>
						</div>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-row flex-wrap items-center justify-between gap-y-4 lg:gap-4 md:gap-2">
						<div className="flex flex-col">
							<p className="text-sm">Série/Turma</p>
							<p className="font-bold text-base">6º ANO A</p>
						</div>
						<div className="flex flex-col">
							<p className="text-sm">Curso</p>
							<p className="font-bold text-base">Ensino Fundamental II</p>
						</div>
						<div className="flex flex-col">
							<p className="text-sm">Data</p>
							<p className="font-bold text-base">01/08/2021</p>
						</div>
						<div className="flex flex-col">
							<p className="text-sm">Status</p>
							<Badge variant={'outline'} className="bg-green-800 font-bold">
								Entregue
							</Badge>
						</div>
						<div className="flex flex-col">
							<div className="flex flex-row space-x-2">
								<Link href={'/carteirinhas/solicitacoes/1'}>
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
			<Pagination className="mt-2">
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious href="#" />
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href="#" isActive>
							1
						</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href="#">2</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href="#">3</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
					<PaginationItem>
						<PaginationNext href="#" />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	)
}
