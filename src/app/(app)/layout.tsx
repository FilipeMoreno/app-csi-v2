'use client'

import { Navbar } from '@/components/admin-panel/navbar'
import { Sidebar } from '@/components/admin-panel/sidebar'
import { useSidebarToggle } from '@/hooks/use-sidebar-toggle'
import { useStore } from '@/hooks/use-store'
import { cn } from '@/lib/utils'

export default function DemoLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const sidebar = useStore(useSidebarToggle, (state) => state)

	return (
		<>
			<Sidebar />
			<main
				className={cn(
					'min-h-[100vh] bg-zinc-50 transition-[margin-left] duration-300 ease-in-out dark:bg-zinc-900',
					sidebar?.isOpen === false ? 'lg:ml-[90px]' : 'lg:ml-72',
				)}
			>
				<Navbar />
				<div className="container px-4 pt-8 pb-8 sm:px-8">{children}</div>
			</main>
		</>
	)
}
