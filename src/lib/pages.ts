import {
	ArrowLeftRight,
	CalendarDays,
	Clock,
	CreditCard,
	FolderOutput,
	Headset,
	Home,
	LayoutDashboard,
	LifeBuoy,
	List,
	Podcast,
	ScanLine,
	Speaker,
	Ticket,
	Wifi,
} from 'lucide-react'

type Submenu = {
	href: string
	label: string
	active: boolean
}

type Menu = {
	href: string
	label: string
	active: boolean
	icon: any
	submenus: Submenu[]
}

type Group = {
	groupLabel: string
	icon: any
	menus: Menu[]
}

export function getPages(pathname: string): Group[] {
	return [
		{
			groupLabel: 'Dashboard',
			icon: LayoutDashboard,
			menus: [
				{
					href: '/',
					label: 'Início',
					active: !!pathname.match('^/$'),
					icon: Home,
					submenus: [],
				},
			],
		},
		{
			groupLabel: 'Suporte',
			icon: LifeBuoy,
			menus: [
				{
					href: '/suporte',
					label: 'Chamados',
					active: pathname.includes('/suporte'),
					icon: Headset,
					submenus: [],
				},
			],
		},
		{
			groupLabel: 'Reservas',
			icon: CalendarDays,
			menus: [
				{
					href: '/agendamentos',
					label: 'Agendamentos',
					active: pathname.includes('/agendamentos'),
					icon: Clock,
					submenus: [],
				},
			],
		},
		{
			groupLabel: 'Empréstimos',
			icon: ArrowLeftRight,
			menus: [
				{
					href: '/emprestimos',
					label: 'Empréstimos',
					active: pathname.includes('/emprestimos'),
					icon: FolderOutput,
					submenus: [],
				},
			],
		},
		{
			groupLabel: 'Carteirinhas',
			icon: CreditCard,
			menus: [
				{
					href: '/carteirinhas/solicitacoes',
					label: 'Solicitações',
					active: pathname.includes('/carteirinhas/solicitacoes'),
					icon: List,
					submenus: [],
				},
				{
					href: '/carteirinhas/scanner/acoes',
					label: 'Scanner',
					active: pathname.includes('/carteirinhas/scanner/acoes'),
					icon: ScanLine,
					submenus: [
						{
							active: pathname.includes('/carteirinhas/scanner/acoes'),
							href: '/carteirinhas/scanner/acoes',
							label: 'Ações Rápidas',
						},
						{
							active: pathname.includes('/carteirinhas/scanner'),
							href: '/carteirinhas/scanner/',
							label: 'QR Code',
						},
					],
				},
			],
		},
		{
			groupLabel: 'Wi-fi',
			icon: Wifi,
			menus: [
				{
					href: '/wifi',
					label: 'Vouchers',
					active: pathname.includes('/wifi'),
					icon: Ticket,
					submenus: [],
				},
			],
		},
		{
			groupLabel: 'Sinaleiro',
			icon: Speaker,
			menus: [
				{
					href: '/sinaleiro',
					label: 'Sinal',
					active: pathname.includes('/sinaleiro'),
					icon: Podcast,
					submenus: [],
				},
			],
		},
	]
}
