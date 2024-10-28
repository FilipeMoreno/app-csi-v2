'use client'

import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar'
import Image from 'next/image'

export function NavHeader() {
	const { state } = useSidebar()
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton
					size="lg"
					className="flex items-center justify-center"
				>
					{state !== 'expanded' && (
						<Image
							src="/icons/icon-512x512.png"
							alt="Logo"
							layout="fill"
							className="object-contain"
						/>
					)}
					{state !== 'collapsed' && (
						<Image
							src="/logo.png"
							alt="Logo"
							width={200}
							height={100}
							className="object-contain"
						/>
					)}
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
