'use client'

import { Code2, Ellipsis, Icon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { CollapseMenuButton } from '@/components/admin-panel/collapse-menu-button'
import { Button } from '@/components/ui/button'

import ChangelogComponent from '@/components/Changelog'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { config } from '@/config'
import { getPages } from '@/lib/pages'
import { cn } from '@/lib/utils'
import { HeartFilledIcon } from '@radix-ui/react-icons'
import Image from 'next/image'

interface MenuProps {
	isOpen: boolean | undefined
}

export function Menu({ isOpen }: MenuProps) {
	const pathname = usePathname()
	const pages = getPages(pathname)

	return (
		<ScrollArea className="[&>div>div[style]]:!block z-40">
			<nav className="mt-8 h-full w-full">
				<ul className="flex min-h-[calc(100vh-48px-36px-16px-32px)] flex-col items-start space-y-1 px-2 lg:min-h-[calc(100vh-32px-40px-32px)]">
					{pages.map(({ groupLabel, menus, icon: Icon }, index) => (
						<li className={cn('w-full', groupLabel ? 'pt-5' : '')} key={index}>
							{(isOpen && groupLabel) || isOpen === undefined ? (
								<p className="flex max-w-[248px] items-center truncate px-4 pb-2 font-extrabold text-[10px] text-muted-foreground uppercase">
									<Icon className="mr-2" size={14} />
									{groupLabel}
								</p>
							) : !isOpen && isOpen !== undefined && groupLabel ? (
								<TooltipProvider>
									<Tooltip delayDuration={100}>
										<TooltipTrigger className="w-full">
											<div className="flex w-full items-center justify-center">
												<Icon size={12} className="text-zinc-500" />
											</div>
										</TooltipTrigger>
										<TooltipContent side="right">
											<p>{groupLabel}</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							) : (
								<p className="pb-2" />
							)}
							{menus.map(
								({ href, label, icon: Icon, active, submenus }, index) =>
									submenus.length === 0 ? (
										<div className="w-full" key={index}>
											<TooltipProvider disableHoverableContent>
												<Tooltip delayDuration={100}>
													<TooltipTrigger asChild>
														<Button
															variant={active ? 'secondary' : 'ghost'}
															className="mb-1 h-10 w-full justify-start"
															asChild
														>
															<Link href={href}>
																<span
																	className={cn(isOpen === false ? '' : 'mr-4')}
																>
																	<Icon size={18} />
																</span>
																<p
																	className={cn(
																		'max-w-[200px] truncate',
																		isOpen === false
																			? '-translate-x-96 opacity-0'
																			: 'translate-x-0 opacity-100',
																	)}
																>
																	{label}
																</p>
															</Link>
														</Button>
													</TooltipTrigger>
													{isOpen === false && (
														<TooltipContent side="right">
															{label}
														</TooltipContent>
													)}
												</Tooltip>
											</TooltipProvider>
										</div>
									) : (
										<div className="w-full" key={index}>
											<CollapseMenuButton
												icon={Icon}
												label={label}
												active={active}
												submenus={submenus}
												isOpen={isOpen}
											/>
										</div>
									),
							)}
						</li>
					))}
				</ul>
				{(isOpen && (
					<>
						<div className="right-0 bottom-0 left-0 flex flex-col items-center justify-center">
							<Image
								alt="Logo"
								width={20}
								height={20}
								src={'/icons/icon-512x512.png'}
								className="mb-1"
							/>
							<ChangelogComponent />
							<span className="text-xs text-zinc-500">v{config.version}</span>
						</div>
						<div className="mt-4 flex flex-row items-center justify-center text-xs">
							<Code2 className="mr-1 h-4 w-4 text-zinc-500" />
							<span className="text-zinc-500">Developed with</span>
							<HeartFilledIcon className="mx-1 h-4 w-4 text-tertiary" />
							<span className="text-zinc-500">
								by{' '}
								<Link
									className="hover:text-tertiary"
									href="https://filipemoreno.com.br"
								>
									Filipe Moreno
								</Link>
							</span>
						</div>
					</>
				)) || (
					<div className="flex flex-col items-center justify-center">
						<Image
							alt="Logo"
							width={20}
							height={20}
							src={'/icons/icon-512x512.png'}
							className="mb-1"
						/>
						<span className="text-xs text-zinc-500">v{config.version}</span>
					</div>
				)}
			</nav>
		</ScrollArea>
	)
}
