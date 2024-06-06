'use client'

import moment from 'moment'
import 'moment/locale/pt-br'
import Link from 'next/link'
import React from 'react'

import { DotsHorizontalIcon, DotsVerticalIcon } from '@radix-ui/react-icons'
import {
	ChevronDown,
	ChevronUp,
	ChevronsLeftRight,
	ChevronsUp,
	MessageCircle,
	PlusCircle,
} from 'lucide-react'

import HeaderPages from '@/components/HeaderPages'
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
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

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
			resumo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			createdAt: '2023-12-11T00:00:00.000Z',
		},
		{
			id: 4,
			solicitante: 'Roberto',
			assunto: 'Computador pegou fogo',
			setor: 'Sala 23',
			usuario: null,
			prioridade: 'Crítica',
			status: 'Aberto',
			resumo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			createdAt: '2021-08-01T00:00:00.000Z',
		},
	]

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
							<TabsTrigger value="abertos">Abertos</TabsTrigger>
							<TabsTrigger value="fechados">Fechados</TabsTrigger>
							<TabsTrigger value="meus-chamados">Meus chamados</TabsTrigger>
						</TabsList>
						<TabsContent value="abertos" className="space-y-2">
							{dadosTabela.length > 0 &&
								dadosTabela.flatMap((item) => (
									<Card
										key={item.id}
										// className={`border ${
										//   item.status === 'Aberto' && 'border-l-green-500'
										// }  ${item.status === 'Fechado' && 'border-l-red-500'}  ${
										//   item.status === 'Respondido' && 'border-l-blue-600'
										// }`}
									>
										<CardHeader>
											<CardTitle>
												<div className="flex items-center justify-between text-xl">
													<Link
														href="/suporte/1"
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
																	Mudar status
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
																	Mudar prioridade
																</DropdownMenuSubTrigger>
																<DropdownMenuPortal>
																	<DropdownMenuSubContent>
																		<DropdownMenuItem>Crítica</DropdownMenuItem>
																		<DropdownMenuItem>Alta</DropdownMenuItem>
																		<DropdownMenuItem>
																			Moderada
																		</DropdownMenuItem>
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
														{/* <span className="mr-2 flex h-3 w-3 rounded-full bg-red-600" /> */}
														<ChevronsUp className="mr-1 h-4 w-4 text-red-600" />
														<span className="text-red-600">
															{item.prioridade}
														</span>
													</div>
												)}
												{item.prioridade === 'Alta' && (
													<div className="flex flex-row items-center">
														{/* <span className="mr-2 flex h-3 w-3 rounded-full bg-orange-600" /> */}
														<ChevronUp className="mr-1 h-4 w-4 text-orange-600" />
														<span className="text-orange-600">
															{item.prioridade}
														</span>
													</div>
												)}
												{item.prioridade === 'Moderada' && (
													<div className="flex flex-row items-center">
														{/* <span className="mr-2 flex h-3 w-3 rounded-full bg-yellow-600" /> */}
														<ChevronsLeftRight className="mr-1 h-4 w-4 text-yellow-600" />
														<span className="text-yellow-600">
															{item.prioridade}
														</span>
													</div>
												)}
												{item.prioridade === 'Baixa' && (
													<div className="flex flex-row items-center">
														{/* <span className="mr-2 flex h-3 w-3 rounded-full bg-green-600" /> */}
														<ChevronDown className="mr-1 h-4 w-4 text-green-600" />
														<span className="text-green-600">
															{item.prioridade}
														</span>
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
								))}
							<div className="flex items-center justify-end space-x-2 py-4">
								<div className="flex-1 text-muted-foreground text-sm">
									Mostrando 1 a 10 de 4 resultados
								</div>
								<div className="space-x-2">
									<Button variant="outline" size="sm">
										Anterior
									</Button>
									<Button variant="outline" size="sm">
										Próximo
									</Button>
								</div>
							</div>
						</TabsContent>
						<TabsContent value="fechados">
							<div className="flex items-center justify-center text-zinc-400">
								<p>Nenhum chamado encontrado.</p>
							</div>
							<div className="flex items-center justify-end space-x-2 py-4">
								<div className="flex-1 text-muted-foreground text-sm">
									Mostrando 1 a 10 de 0 resultados
								</div>
								<div className="space-x-2">
									<Button variant="outline" size="sm">
										Anterior
									</Button>
									<Button variant="outline" size="sm">
										Próximo
									</Button>
								</div>
							</div>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	)
}
