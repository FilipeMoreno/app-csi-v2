import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ExitIcon } from '@radix-ui/react-icons'
import { Settings } from 'lucide-react'
import Link from 'next/link'

export function UserNav() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-8 w-8 rounded-full">
					<Avatar className="h-8 w-8 border border-secondary">
						<AvatarImage
							src={'https://github.com/filipemoreno.png'}
							alt={'@filipemoreno'}
						/>
						<AvatarFallback>CSI</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-row space-x-4 space-y-1">
						<Avatar className="h-8 w-8 border border-secondary">
							<AvatarImage
								src={'https://github.com/filipemoreno.png'}
								alt={'@filipemoreno'}
							/>
							<AvatarFallback>CSI</AvatarFallback>
						</Avatar>

						<div className="flex flex-col">
							<p className="font-medium text-sm leading-none">Filipe Moreno</p>
							<p className="text-muted-foreground text-xs leading-none">
								eu@filipemoreno.com.br
							</p>
						</div>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<Link href={'/configuracoes'}>
					<DropdownMenuItem className="hover:cursor-pointer">
						<Settings className="mr-2 h-4 w-4" /> Configurações
					</DropdownMenuItem>
				</Link>
				<DropdownMenuSeparator />
				<Link href={'/auth'}>
					<DropdownMenuItem className="text-red-400 hover:cursor-pointer hover:text-red-400">
						<ExitIcon className="mr-2 h-4 w-4" /> Sair
					</DropdownMenuItem>
				</Link>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
