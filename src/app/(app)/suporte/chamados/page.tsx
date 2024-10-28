'use client'

import 'moment/locale/pt-br'

import HeaderPages from '@/components/HeaderPages'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import { TicketCard } from './components/CardChamado'
import { Pagination } from './components/PaginacaoChamado'

export default function ChamadosHome() {
	const dadosTabela = [
		{
			id: 1,
			solicitante: 'Douglas',
			assunto: 'Projetor não funciona',
			setor: 'Sala 12',
			usuario: 'Rafael',
			prioridade: 'Alta',
			status: 'Respondido',
			aberto: true,
			resumo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			createdAt: '2023-12-10T00:00:00.000Z',
		},
		{
			id: 2,
			solicitante: 'João',
			assunto: 'Impressora quebrada',
			setor: 'Coordenação EI',
			usuario: 'Bruno',
			prioridade: 'Moderada',
			status: 'Aberto',
			aberto: true,
			resumo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			createdAt: '2023-12-11T00:00:00.000Z',
		},
		{
			id: 3,
			solicitante: 'João',
			assunto: 'Problema com o computador',
			setor: 'Sala 23',
			usuario: 'Diego',
			prioridade: 'Baixa',
			status: 'Respondido',
			aberto: false,
			resumo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			createdAt: '2023-12-11T00:00:00.000Z',
		},
		{
			id: 4,
			solicitante: 'Roberto',
			assunto: 'Computador pegou fogo',
			setor: 'Sala 23',
			usuario: 'Miguel',
			prioridade: 'Crítica',
			status: 'Aberto',
			aberto: true,
			resumo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			createdAt: '2021-08-01T00:00:00.000Z',
		},
		{
			id: 4,
			solicitante: 'Roberto',
			assunto: 'Correndo pelado no corredor',
			setor: 'Pátio',
			usuario: 'Miguel',
			prioridade: 'Crítica',
			status: 'Fechado',
			aberto: false,
			resumo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			createdAt: '2021-08-01T00:00:00.000Z',
		},
	]

	const itemsPerPage = 10

	const [currentPageAbertos, setCurrentPageAbertos] = useState(1)
	const [currentPageFechados, setCurrentPageFechados] = useState(1)
	const [currentPageMeusChamados, setCurrentPageMeusChamados] = useState(1)

	const meusChamados = dadosTabela.filter(
		(ticket) => ticket.usuario === 'Filipe',
	)
	const chamadosAbertos = dadosTabela.filter((ticket) => ticket.aberto)
	const chamadosFechados = dadosTabela.filter((ticket) => !ticket.aberto)

	const paginatedData = (data, currentPage) =>
		data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="w-full">
				<HeaderPages
					title="Suporte"
					description="Mostrando todos os chamados"
					button="Novo chamado"
					buttonLink="/suporte/novo"
				/>

				<div className="my-4 flex flex-row items-center space-x-3">
					<Select>
						<SelectTrigger className="w-[200px]">
							<SelectValue placeholder="Status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="aberto">Aberto</SelectItem>
							<SelectItem value="andamento">Em andamento</SelectItem>
							<SelectItem value="fechado">Fechado</SelectItem>
						</SelectContent>
					</Select>

					<Input className="w-full" placeholder="Pesquisar" />
				</div>
				<div className="space-y-2">
					<Tabs defaultValue="abertos">
						<TabsList className="grid w-full grid-cols-3">
							<TabsTrigger value="abertos">Abertos (0)</TabsTrigger>
							<TabsTrigger value="fechados">Fechados (0)</TabsTrigger>
							<TabsTrigger value="meus-chamados">Meus chamados (0)</TabsTrigger>
						</TabsList>
						<TabsContent value="abertos" className="space-y-2">
							{chamadosAbertos.length > 0 ? (
								paginatedData(chamadosAbertos, currentPageAbertos).map(
									(item) => <TicketCard key={item.id} item={item} />,
								)
							) : (
								<p className="text-center text-zinc-500">
									Nenhum chamado aberto encontrado.
								</p>
							)}
							{chamadosAbertos.length > 0 && (
								<Pagination
									totalItems={chamadosAbertos.length}
									currentPage={currentPageAbertos}
									itemsPerPage={itemsPerPage}
									onPageChange={setCurrentPageAbertos}
								/>
							)}
						</TabsContent>
						<TabsContent value="fechados" className="space-y-2">
							{chamadosFechados.length > 0 ? (
								paginatedData(chamadosFechados, currentPageFechados).map(
									(item) => <TicketCard key={item.id} item={item} />,
								)
							) : (
								<p className="text-center text-zinc-500">
									Nenhum chamado fechado encontrado.
								</p>
							)}
							{chamadosFechados.length > 0 && (
								<Pagination
									totalItems={chamadosFechados.length}
									currentPage={currentPageFechados}
									itemsPerPage={itemsPerPage}
									onPageChange={setCurrentPageFechados}
								/>
							)}
						</TabsContent>
						<TabsContent value="meus-chamados" className="space-y-2">
							{meusChamados.length > 0 ? (
								paginatedData(meusChamados, currentPageMeusChamados).map(
									(item) => <TicketCard key={item.id} item={item} />,
								)
							) : (
								<p className="text-center text-zinc-500">
									Você não possui chamados.
								</p>
							)}
							{meusChamados.length > 0 && (
								<Pagination
									totalItems={meusChamados.length}
									currentPage={currentPageMeusChamados}
									itemsPerPage={itemsPerPage}
									onPageChange={setCurrentPageMeusChamados}
								/>
							)}
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	)
}
