'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'

import React from 'react'
import QRCode from 'react-qr-code'

import { useMediaQuery } from 'usehooks-ts'

function showQRCode() {
	return (
		<div className="flex flex-col items-center justify-center gap-2 rounded-lg p-4">
			<QRCode
				value="ca00870b-b4cb-4f19-b662-4e3a0ce40955"
				className="flex items-center justify-center rounded-lg"
			/>
			<span className="text-xs">Gerado em: 00/00/0000 às 00:00:00</span>
		</div>
	)
}

export default function DevolverEmprestimo() {
	const [open, setOpen] = React.useState(false)
	const isDesktop = useMediaQuery('(min-width: 768px)')
	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button className="w-full">Devolver</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Devolução</DialogTitle>
					</DialogHeader>
					{showQRCode()}
				</DialogContent>
			</Dialog>
		)
	}
	return (
		<>
			<Drawer open={open} onOpenChange={setOpen}>
				<DrawerTrigger asChild>
					<Button className="w-full">Devolver</Button>
				</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader className="text-left">
						<DrawerTitle>Devolução</DrawerTitle>
						{showQRCode()}
					</DrawerHeader>
				</DrawerContent>
			</Drawer>
		</>
	)
}
