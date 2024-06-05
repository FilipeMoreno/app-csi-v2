'use client'

import { Check, Computer, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function ConfiguracoesHome() {
	const { setTheme, theme } = useTheme()
	const [getAtualTheme, setAtualTheme] = useState('')

	useEffect(() => {
		if (theme === 'system') {
			setAtualTheme('system')
		}
		if (theme === 'light') {
			setAtualTheme('light')
		}
		if (theme === 'dark') {
			setAtualTheme('dark')
		}
	}, [theme])

	return (
		<div className="space-y-6">
			<div>
				<h3 className="font-medium text-lg">Configurações</h3>
				<p className="text-muted-foreground text-sm">
					Customize suas configurações de usuário.
				</p>
			</div>
			<Separator />
			<div className="space-y-6">
				<div>
					<h3 className="font-medium text-lg">Aparência</h3>
					<p className="text-muted-foreground text-sm">
						Alterne entre os temas claro e escuro.
					</p>

					<div>
						<div className="my-4 flex flex-col space-x-0 space-y-4 sm:flex-row sm:items-center lg:justify-start sm:justify-center sm:space-x-4 sm:space-y-0">
							<div className="items-center rounded-md border-2 border-secondary bg-transparent p-1 hover:border-accent">
								<div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
									<div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
										<div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
										<div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
									</div>
									<div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
										<div className="h-4 w-4 rounded-full bg-[#ecedef]" />
										<div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
									</div>
									<div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
										<div className="h-4 w-4 rounded-full bg-[#ecedef]" />
										<div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
									</div>
								</div>
								{(getAtualTheme === 'light' && (
									<Button
										onClick={() => setTheme('light')}
										className="mt-2 w-full p-4"
										variant={'secondary'}
										disabled
									>
										<Check className="mr-2 h-4 w-4" />
										Claro
									</Button>
								)) || (
									<Button
										onClick={() => setTheme('light')}
										className="mt-2 w-full p-4"
										variant={'outline'}
									>
										<Sun className="mr-2 h-4 w-4" />
										Claro
									</Button>
								)}
							</div>
							<div className="items-center rounded-md border-2 border-secondary bg-transparent p-1 hover:bg-accent hover:text-accent-foreground">
								<div className="space-y-2 rounded-sm bg-zinc-900 p-2">
									<div className="space-y-2 rounded-md bg-zinc-800 p-2 shadow-sm">
										<div className="h-2 w-[80px] rounded-lg bg-zinc-400" />
										<div className="h-2 w-[100px] rounded-lg bg-zinc-400" />
									</div>
									<div className="flex items-center space-x-2 rounded-md bg-zinc-800 p-2 shadow-sm">
										<div className="h-4 w-4 rounded-full bg-zinc-400" />
										<div className="h-2 w-[100px] rounded-lg bg-zinc-400" />
									</div>
									<div className="flex items-center space-x-2 rounded-md bg-zinc-800 p-2 shadow-sm">
										<div className="h-4 w-4 rounded-full bg-zinc-400" />
										<div className="h-2 w-[100px] rounded-lg bg-zinc-400" />
									</div>
								</div>
								{(getAtualTheme === 'dark' && (
									<Button
										onClick={() => setTheme('dark')}
										className="mt-2 w-full p-4"
										variant={'secondary'}
										disabled
									>
										<Check className="mr-2 h-4 w-4" />
										Escuro
									</Button>
								)) || (
									<Button
										onClick={() => setTheme('dark')}
										className="mt-2 w-full p-4"
										variant={'outline'}
									>
										<Moon className="mr-2 h-4 w-4" />
										Escuro
									</Button>
								)}
							</div>
							<div className="items-center rounded-md border-2 border-secondary bg-transparent p-1 hover:bg-accent hover:text-accent-foreground">
								<div className="space-y-2 rounded-sm bg-zinc-900 p-2">
									<div className="space-y-2 rounded-md bg-[#ecedef] p-2 shadow-sm">
										<div className="h-2 w-[80px] rounded-lg bg-zinc-400" />
										<div className="h-2 w-[100px] rounded-lg bg-zinc-400" />
									</div>
									<div className="flex items-center space-x-2 rounded-md bg-zinc-800 p-2 shadow-sm">
										<div className="h-4 w-4 rounded-full bg-[#ecedef]" />
										<div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
									</div>
									<div className="flex items-center space-x-2 rounded-md bg-[#ecedef] p-2 shadow-sm">
										<div className="h-4 w-4 rounded-full bg-zinc-400" />
										<div className="h-2 w-[100px] rounded-lg bg-zinc-400" />
									</div>
								</div>
								{(getAtualTheme === 'system' && (
									<Button
										onClick={() => setTheme('system')}
										className="mt-2 w-full p-4"
										variant={'secondary'}
										disabled
									>
										<Check className="mr-2 h-4 w-4" />
										Sistema
									</Button>
								)) || (
									<Button
										onClick={() => setTheme('system')}
										className="mt-2 w-full p-4"
										variant={'outline'}
									>
										<Computer className="mr-2 h-4 w-4" />
										Sistema
									</Button>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
