import { PageTitle } from '@/components/admin-panel/page-title'
import { SheetMenu } from '@/components/admin-panel/sheet-menu'
import { UserNav } from '@/components/admin-panel/user-nav'
import { ModeToggle } from '@/components/mode-toggle'
import { Notifications } from '../Notifications'

export function Navbar() {
	return (
		<header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-backdrop-blur:bg-background/60 dark:shadow-secondary">
			<div className="mx-4 flex h-14 items-center sm:mx-8">
				<div className="flex items-center space-x-4 lg:space-x-0">
					<SheetMenu />
					<PageTitle />
				</div>
				<div className="flex flex-1 items-center justify-end space-x-2">
					{/* <ModeToggle /> */}
					<Notifications />
					<UserNav />
				</div>
			</div>
		</header>
	)
}
