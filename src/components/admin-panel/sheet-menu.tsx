import { MenuIcon, PanelsTopLeft } from 'lucide-react'
import Link from 'next/link'

import { Menu } from '@/components/admin-panel/menu'
import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTrigger,
} from '@/components/ui/sheet'
import Image from 'next/image'

export function SheetMenu() {
	return (
		<Sheet>
			<SheetTrigger className="lg:hidden" asChild>
				<Button className="h-8" variant="outline" size="icon">
					<MenuIcon size={20} />
				</Button>
			</SheetTrigger>
			<SheetContent className="flex h-full flex-col px-3 sm:w-72" side="left">
				<SheetHeader>
					<Button
						className="flex items-center justify-center pt-1 pb-2"
						variant="link"
						asChild
					>
						<Link href="/dashboard" className="flex items-center gap-2">
							<Image
								src={'/logo.png'}
								width={200}
								height={100}
								alt="Logo do Colégio Santo Inácio"
							/>
						</Link>
					</Button>
				</SheetHeader>
				<Menu isOpen />
			</SheetContent>
		</Sheet>
	)
}
