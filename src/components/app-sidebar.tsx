'use client'

import { config } from '@/config'
import {
	Calendar,
	Code2,
	CreditCard,
	Headset,
	Speaker,
	Wifi,
} from 'lucide-react'
import type * as React from 'react'

import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
	SidebarSeparator,
	useSidebar,
} from '@/components/ui/sidebar'
import { HeartFilledIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import Link from 'next/link'
import ChangelogComponent from './Changelog'
import { NavHeader } from './nav-header'

// This is sample data.
const data = {
	user: {
		name: 'Filipe Moreno',
		email: 'filipe@colegiosantoinacio.com.br',
		avatar: 'https://github.com/filipemoreno.png',
	},

	navMain: [
		{
			title: 'Suporte',
			url: '#',
			icon: Headset,
			isActive: true,
			items: [
				{
					title: 'Chamados',
					url: '/suporte/chamados',
				},
				{
					title: 'Ordem de Serviço',
					url: '/suporte/ordem-servico',
				},
				{
					title: 'Equipamentos',
					url: '/suporte/equipamentos',
				},
			],
		},
		{
			title: 'Agendamentos',
			url: '#',
			icon: Calendar,
			items: [
				{
					title: 'Informática',
					url: '/agendamentos/informatica',
				},
			],
		},
		{
			title: 'Carteirinhas',
			url: '#',
			icon: CreditCard,
			items: [
				{
					title: 'Solicitações',
					url: '/carteirinhas/solicitacoes',
				},
				{
					title: 'Scanner',
					url: '/carteirinhas/scanner',
				},
			],
		},
		{
			title: 'Wifi',
			url: '/wifi',
			icon: Wifi,
			items: [
				{
					title: 'Vouchers',
					url: '/wifi',
				},
			],
		},
		{
			title: 'Sinaleiro',
			url: '/sinaleiro',
			icon: Speaker,
			items: [
				{
					title: 'Sinal',
					url: '/sinaleiro',
				},
			],
		},
	],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { state } = useSidebar()
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader className="mt-2 flex items-center justify-center">
				<NavHeader />
				<SidebarSeparator />
				<NavUser user={data.user} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>

			<SidebarFooter>
				{(state !== 'collapsed' && (
					<>
						<div className="right-0 bottom-0 left-0 flex flex-col items-center justify-center">
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
						<span className="text-xs text-zinc-500">v{config.version}</span>
					</div>
				)}
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
