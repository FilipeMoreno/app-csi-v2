import Link from 'next/link'

import { Menu } from '@/components/admin-panel/menu'
import { SidebarToggle } from '@/components/admin-panel/sidebar-toggle'
import { Button } from '@/components/ui/button'
import { useSidebarToggle } from '@/hooks/use-sidebar-toggle'
import { useStore } from '@/hooks/use-store'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export function Sidebar() {
	const sidebar = useStore(useSidebarToggle, (state) => state)

	return (
		<aside
			className={cn(
				'-translate-x-full fixed top-0 left-0 z-20 h-screen transition-[width] duration-300 ease-in-out lg:translate-x-0',
				sidebar?.isOpen === false ? 'w-[90px]' : 'w-72',
			)}
		>
			<SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
			<div className="relative z-40 flex h-full flex-col overflow-y-auto px-3 py-4 shadow-md dark:shadow-zinc-800">
				<Button
					className={cn(
						'mb-1 transition-transform duration-300 ease-in-out',
						sidebar?.isOpen === false ? 'translate-x-1' : 'translate-x-0',
					)}
					variant="link"
					asChild
				>
					<Link href="/#" className="flex items-center gap-2">
						<Image
							src="/icons/icon-512x512.png"
							alt="Logo do Colégio Santo Inácio"
							width={50}
							height={50}
							className={cn(
								'whitespace-nowrap font-bold text-lg transition-[transform,opacity,display] duration-300 ease-in-out',
								sidebar?.isOpen === true
									? '-translate-x-96 hidden opacity-0'
									: 'translate-x-0 opacity-100',
							)}
						/>
						<Image
							src="/logo.png"
							alt="Logo do Colégio Santo Inácio"
							width={200}
							height={100}
							className={cn(
								'whitespace-nowrap font-bold text-lg transition-[transform,opacity,display] duration-300 ease-in-out',
								sidebar?.isOpen === false
									? '-translate-x-96 hidden opacity-0'
									: 'translate-x-0 opacity-100',
							)}
						/>
					</Link>
				</Button>

				<Menu isOpen={sidebar?.isOpen} />
			</div>
		</aside>
	)
}
