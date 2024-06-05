'use client'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import { type LegacyRef, useEffect, useRef, useState } from 'react'
import ReactToPrint from 'react-to-print'
import { toast } from 'sonner'

interface VouchersContent {
	numDevices: string
	time: string
	period: string
	cod: string
}

export default function Home() {
	const [vouchers, setVouchers] = useState<VouchersContent>()
	const [loading, setLoading] = useState<boolean>(false)
	const dataAtual = new Date().toLocaleDateString('pt-BR', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	})

	const componentRef = useRef()

	async function reset() {
		setVouchers(undefined)
	}

	async function handleGenerateVoucher() {
		reset()
		setLoading(true)

		const voucher = {
			numDevices: '1',
			time: '6',
			period: 'hour',
			cod: Math.random().toString(36).substr(2, 7),
		}

		if (voucher) {
			setVouchers(voucher)
			toast.success('Sucesso!', {
				description: 'Voucher gerado com sucesso!',
			})
		}

		setLoading(false)
	}

	useEffect(() => {
		setTimeout(() => {
			setVouchers(undefined)
		}, 10000)
	}, [vouchers])

	return (
		<div className="mt-2 flex flex-col items-center justify-center">
			<Card className="h-full w-full border-transparent shadow-none">
				{!vouchers && (
					<CardHeader>
						<CardTitle>Vouchers WI-FI</CardTitle>
						<CardDescription>
							Clique no botão abaixo para gerar um novo voucher para acesso à
							internet.
						</CardDescription>
					</CardHeader>
				)}
				<CardContent>
					{(!vouchers && loading && (
						<Button className="w-full" onClick={handleGenerateVoucher} disabled>
							Aguarde...
						</Button>
					)) ||
						(vouchers && !loading && (
							<div className="p-4">
								<div
									ref={componentRef as unknown as LegacyRef<HTMLDivElement>}
									className="p-2"
								>
									<Card className="flex w-full flex-col items-center justify-center">
										<CardHeader className="flex flex-col items-center justify-center">
											<Image
												src="/icons/icon-512x512.png"
												alt="Logo"
												height={60}
												width={60}
											/>
											<p className="text-center">
												Insira o código abaixo para acessar a internet
											</p>
										</CardHeader>
										<CardContent>
											<p className="text-center text-sm">
												Rede: <b>Visitantes - CSI</b>
											</p>
											<p className="my-1 text-center text-sm">
												Voucher: <b className="text-2xl">{vouchers.cod}</b>
											</p>
										</CardContent>
										<CardFooter>
											<p className="text-center text-xs">{dataAtual}</p>
										</CardFooter>
									</Card>
								</div>

								<div className="-mb-4 mt-3 space-y-2">
									<ReactToPrint
										trigger={() => (
											<Button
												variant={'secondary'}
												className="w-full hover:opacity-60"
											>
												Imprimir
											</Button>
										)}
										content={() => componentRef.current || null}
									/>
									<Button
										variant={'outline'}
										className="w-full hover:opacity-60"
										onClick={handleGenerateVoucher}
									>
										Gerar outro
									</Button>
								</div>
							</div>
						)) || (
							<Button
								className="w-full hover:opacity-60"
								onClick={handleGenerateVoucher}
								variant={'outline'}
							>
								Gerar
							</Button>
						)}
				</CardContent>
			</Card>
		</div>
	)
}
