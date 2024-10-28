'use client'
import HeaderPages from '@/components/HeaderPages'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

interface VouchersContent {
	numDevices: string
	time: string
	period: string
	cod: string
}

const VoucherContent = forwardRef<
	HTMLDivElement,
	{ voucher: VouchersContent; dataAtual: string }
>(({ voucher, dataAtual }, ref) => (
	<div ref={ref} className="w-full p-2">
		<div className="flex flex-col items-center justify-center rounded-lg border border-secondary p-4">
			<div className="flex w-full justify-center">
				<Image
					src="/icons/icon-512x512.png"
					alt="Logo"
					height={40}
					width={40}
					className="mx-auto"
				/>
			</div>
			<p className="mt-2 text-center text-sm">
				Insira o código abaixo para acessar a internet
			</p>
			<p className="mt-1 text-center text-xs">
				Rede: <b>Visitantes - CSI</b>
			</p>
			<p className="my-2 text-center">
				<b className="text-xl">{voucher.cod}</b>
			</p>
			<p className="text-center text-xs">{dataAtual}</p>
		</div>
	</div>
))

export default function Home() {
	const [vouchers, setVouchers] = useState<VouchersContent | undefined>(
		undefined,
	)
	const [loading, setLoading] = useState<boolean>(false)
	const dataAtual = new Date().toLocaleDateString('pt-BR', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	})

	const componentRef = useRef<HTMLDivElement>(null)

	async function reset() {
		setVouchers(undefined)
		setLoading(false)
	}

	async function handleGenerateVoucher() {
		setLoading(true)

		const voucher = {
			numDevices: '1',
			time: '6',
			period: 'hour',
			cod: Math.random().toString(36).substr(2, 7),
		}

		setVouchers(voucher)

		localStorage.setItem('activeVoucher', JSON.stringify(voucher))

		toast.success('Sucesso!', {
			description: 'Voucher gerado com sucesso!',
		})

		setLoading(false)
	}

	useEffect(() => {
		let timer: NodeJS.Timeout
		if (vouchers) {
			timer = setTimeout(() => {
				reset()
			}, 10000)
		}
		return () => {
			if (timer) clearTimeout(timer)
		}
	}, [vouchers])

	const handlePrint = () => {
		const printWindow = window.open('', '_blank')
		if (printWindow) {
			printWindow.document.write(`
			<html>
				<head>
					<title>Voucher</title>
					<style>
						body {
							font-family: Arial, sans-serif;
							margin: 0;
							padding: 0;
							width: 80mm;
							font-size: 12px;
						}
						@page {
							size: 80mm auto;
							margin: 0;
						}
						.container {
							display: flex;
							flex-direction: column;
							align-items: center;
							justify-content: center;
							padding: 10px;
						}
						.logo {
							margin-bottom: 10px;
							text-align: center;
						}
						.text-center {
							text-align: center;
						}
						.bold {
							font-weight: bold;
							font-size: 16px;
						}
					</style>
				</head>
				<body>
					<div class="container">
						<div class="logo">
							<img src="data:image/png;base64,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" alt="Logo" style="height: 40px; width: 40px;" onerror="this.style.display='none'"/>
						</div>
						<p class="text-center">Insira o código abaixo para acessar a internet</p>
						<p class="text-center">Rede: <span class="bold">Visitantes - CSI</span></p>
						<p class="text-center bold">${vouchers?.cod}</p>
						<p class="text-center">${dataAtual}</p>
					</div>
				</body>
			</html>
		`)
			printWindow.document.close()
			printWindow.focus()
			printWindow.print()
			printWindow.close()
		} else {
			console.error('Não foi possível abrir a janela de impressão')
		}
	}

	return (
		<div className="flex flex-col justify-center">
			<HeaderPages
				title="WI-FI Vouchers"
				description="Gere vouchers para acesso de visitantes ao wi-fi"
			/>
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
					{loading ? (
						<Button className="w-full" disabled>
							Aguarde...
						</Button>
					) : vouchers ? (
						<div className="p-4">
							<div ref={componentRef}>
								<VoucherContent voucher={vouchers} dataAtual={dataAtual} />
							</div>
							<div className="-mb-4 mt-3 space-y-2">
								<Button
									variant={'secondary'}
									className="w-full hover:opacity-60"
									onClick={handlePrint}
								>
									Imprimir
								</Button>
								<Button
									variant={'outline'}
									className="w-full hover:opacity-60"
									onClick={handleGenerateVoucher}
								>
									Gerar outro
								</Button>
							</div>
						</div>
					) : (
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
