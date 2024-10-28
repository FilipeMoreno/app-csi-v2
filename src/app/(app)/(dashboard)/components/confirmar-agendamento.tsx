'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	Drawer,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'

import React from 'react'

import { useMediaQuery } from 'usehooks-ts'

function content() {
	return (
		<div>
			<p>Você tem certeza que deseja confirmar o agendamento?</p>
			<div className="my-4 rounded-lg bg-primary-foreground p-4 text-sm">
				<p>Data: 01/01/2023</p>
				<p>Horário: 07:15 - 08:00</p>
				<p>Setor: Informática</p>
			</div>
		</div>
	)
}

export default function ConfirarAgendamento() {
	const [open, setOpen] = React.useState(false)
	const isDesktop = useMediaQuery('(min-width: 768px)')
	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button className="w-full">Confirmar</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Confirmar o agendamento?</DialogTitle>
					</DialogHeader>
					{content()}
					<DialogFooter>
						<Button className="w-full">Sim, quero confirmar</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		)
	}
	return (
		<>
			<Drawer open={open} onOpenChange={setOpen}>
				<DrawerTrigger asChild>
					<Button className="w-full">Confirmar</Button>
				</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader className="text-left">
						<DrawerTitle>Confirmar o agendamento?</DrawerTitle>
					</DrawerHeader>
					<div className="p-4">{content()}</div>
					<DrawerFooter>
						<Button className="w-full">Sim, quero confirmar</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	)
}
