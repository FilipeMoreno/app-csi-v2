'use client'

import { useEffect, useState } from 'react'
import { VoucherDisplay } from './VoucherDisplay'

interface VouchersContent {
	numDevices: string
	time: string
	period: string
	cod: string
}

export default function DisplayVoucher() {
	const [voucher, setVoucher] = useState<VouchersContent | null>(null)

	const fetchVoucher = () => {
		const savedVoucher = localStorage.getItem('activeVoucher')
		if (savedVoucher) {
			setVoucher(JSON.parse(savedVoucher))
		} else {
			setVoucher(null)
		}
	}

	useEffect(() => {
		// Carregar o voucher quando o componente monta
		fetchVoucher()

		// Configurar um evento para atualizar o voucher quando houver mudança no localStorage
		const handleStorageChange = (event: StorageEvent) => {
			if (event.key === 'activeVoucher') {
				fetchVoucher()
			}
		}

		window.addEventListener('storage', handleStorageChange)

		// Timer para exibir por um tempo limitado (ex: 5 minutos)
		const timer = setTimeout(
			() => {
				setVoucher(null)
			},
			5 * 60 * 1000,
		)

		return () => {
			window.removeEventListener('storage', handleStorageChange)
			clearTimeout(timer)
		}
	}, [])

	return (
		<div className="flex h-screen items-center justify-center">
			{voucher ? (
				<VoucherDisplay
					voucher={voucher}
					dataAtual={new Date().toLocaleDateString('pt-BR')}
				/>
			) : (
				<p>Voucher expirado ou não encontrado.</p>
			)}
		</div>
	)
}
