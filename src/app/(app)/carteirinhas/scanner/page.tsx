'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { toast } from 'sonner'
import CustomQrScanner from '../components/CustomQrScanner'

export default function CarteirinhasScanner() {
	const [qrcode, setQrCode] = useState<string | null>(null)

	const router = useRouter()

	useEffect(() => {
		let id = ''

		if (qrcode) {
			toast.success('Carteirinha encontrada!', {
				description: `O código ${qrcode} foi encontrado`,
			})

			if (qrcode.includes('http')) {
				id = qrcode.split('/').pop() as string
			} else {
				id = qrcode
			}

			setTimeout(() => {
				router.push(`/carteirinhas/solicitacoes/${id}`)
			}, 1000)
		}
	}, [qrcode])

	return (
		<>
			<div className="mb-4 flex flex-col">
				<h1 className="font-bold text-3xl">Scanner</h1>
				<p>Aponte a câmera para o QR Code</p>
			</div>
			<div className="flex flex-wrap gap-8">
				<div className="h-96 w-full max-w-sm rounded-xl bg-secondary p-4">
					<CustomQrScanner
						config={{
							fps: 10,
							aspectRatio: 1,
							qrbox: { width: 250, height: 250 },
						}}
						onScan={(scannedCode) => setQrCode(scannedCode)}
					/>
				</div>
			</div>
		</>
	)
}
