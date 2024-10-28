'use client'

import { Navbar } from '@/components/admin-panel/navbar'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default function DemoLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			{/* <Sidebar /> */}
			<SidebarProvider>
				<AppSidebar />
				<main className="w-full">
					<Navbar />
					<div className="container px-4 pt-8 pb-8 sm:px-8">{children}</div>
				</main>
			</SidebarProvider>
		</>
	)
}
