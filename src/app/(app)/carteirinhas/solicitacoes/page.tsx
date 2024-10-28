'use client'

import { FilterIcon, ScanLine } from 'lucide-react'
import 'moment/locale/pt-br'
import Link from 'next/link'

import HeaderPages from '@/components/HeaderPages'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
import { useState } from 'react'
import { SolicitacaoCard } from './components/SolicitacaoCard'
import SolicitacaoPaginacao from './components/SolicitacaoPaginacao'

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
			<HeaderPages
				title="Solicitações"
				description="Mostrando todas as solicitações realizadas"
				button="Solicitação"
				buttonLink="/carteirinhas/solicitacoes/nova"
			/>

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
			<SolicitacaoPaginacao
				items={solicitacoes}
				renderItem={(solicitacao) => (
					<SolicitacaoCard key={solicitacao.id} solicitacao={solicitacao} />
				)}
				itemsPerPage={10}
			/>
		</div>
	)
}
