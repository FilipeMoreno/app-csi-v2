import { Calendar, FilePlus2, LifeBuoy, Reply } from 'lucide-react'
import Link from 'next/link'

import { BellIcon, GearIcon } from '@radix-ui/react-icons'

import { Suspense } from 'react'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Separator } from './ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

interface Notification {
	id: string
	title: string
	url?: string
	user_id: string
	read: boolean
	type: string
}

export function Notifications() {
	return (
		<Suspense fallback={<div>Carregando...</div>}>
			<Popover>
				{/* <Popover onOpenChange={() => marcarTodasComoLidas()}> */}
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className="relative h-6 gap-1 rounded-full px-2 text-secondary-foreground"
						size="sm"
					>
						<BellIcon className="h-3 w-3" />
						<span>0</span>
						{/* <span>{notifications.count}</span> */}

						{/* {notifications.count > 0 && (
							<span className="absolute -right-0.5 -top-0.5 flex h-2 w-2">
								<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
								<span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
							</span>
						)} */}
					</Button>
				</PopoverTrigger>

				<PopoverContent align="end" alignOffset={-16} className="w-80 p-4">
					<div className="flex items-center justify-between">
						<span className="font-medium text-sm">Notificações</span>
						<Link
							className="text-muted-foreground hover:text-primary"
							href="/settings"
						>
							<GearIcon className="h-4 w-4" />
						</Link>
					</div>

					<Tabs defaultValue="new" className="mt-2">
						<TabsList className="space-x-1">
							<TabsTrigger value="new">
								Novas (0)
								{/* Novas ({notifications.count}) */}
							</TabsTrigger>
							<TabsTrigger value="archived">Arquivadas</TabsTrigger>
						</TabsList>
						<TabsContent value="new">
							<Separator className="my-4" />
							<div className="space-y-4">
								{/* {notifications.count === 0 && (
									<div className="flex items-center justify-center">
										<LifeBuoy className="size-4 mx-2 text-muted-foreground" />
										<p className="text-muted-foreground text-sm">
											Nenhuma notificação
										</p>
									</div>
								)} */}
								{/* {notifications.notifications.map(
									(notification: Notification) => {
										const icons = [
											{
												type: 'APPOINTMENT',
												icon: <Calendar className="h-4 w-4 text-violet-400" />,
												color: 'violet',
											},
											{
												type: 'MUSIC',
												icon: <Reply className="h-4 w-4 text-violet-400" />,
												color: 'violet',
											},
										]

										return (
											<div
												key={notification.id}
												className="flex items-start gap-4"
											>
												<div className="rounded-full border border-primary/10 bg-primary/5 p-2">
													{
														icons.find(
															(icon) => icon.type === notification.type,
														)?.icon
													}
												</div>
												<div className="space-y-1">
													<p className="text-xs leading-relaxed">
														{notification.url ? (
															<Link
																href={notification.url}
																className="text-xs leading-relaxed"
															>
																{notification.title}
															</Link>
														) : (
															<p className="text-xs leading-relaxed">
																{notification.title}
															</p>
														)}
													</p>
													<time className="text-xs text-muted-foreground">
														15 minutos atrás
													</time>
												</div>
											</div>
										)
									},
								)} */}

								<Button variant="outline" className="w-full">
									Arquivar todas
								</Button>
							</div>
						</TabsContent>
						<TabsContent value="archived">
							<Separator className="my-4" />
							<div className="space-y-4">
								{/* {notifications.arquivadas.map((notification: Notification) => {
									const icons = [
										{
											type: 'APPOINTMENT',
											icon: <Calendar className="h-4 w-4 text-violet-400" />,
											color: 'violet',
										},
										{
											type: 'MUSIC',
											icon: <Reply className="h-4 w-4 text-violet-400" />,
											color: 'violet',
										},
									]
									return (
										<div
											key={notification.id}
											className="flex items-start gap-4"
										>
											<div className="rounded-full border border-primary/10 bg-primary/5 p-2">
												{
													icons.find((icon) => icon.type === notification.type)
														?.icon
												}
											</div>
											<div className="space-y-1">
												<p className="text-xs leading-relaxed">
													{notification.url ? (
														<Link
															href={notification.url}
															className="text-xs leading-relaxed"
														>
															{notification.title}
														</Link>
													) : (
														<p className="text-xs leading-relaxed">
															{notification.title}
														</p>
													)}
												</p>
												<time className="text-xs text-muted-foreground">
													15 minutos atrás
												</time>
											</div>
										</div>
									)
								})} */}
							</div>
						</TabsContent>
					</Tabs>
				</PopoverContent>
			</Popover>
		</Suspense>
	)
}
