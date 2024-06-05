import type { Metadata } from 'next'

import '@/styles/globals.css'

export const metadata: Metadata = {
	title: 'Chamado #I | Colégio Santo Inácio',
	description: 'Controle de chamados técnicos',
}

export default function ChamadosDetalheLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <div>{children}</div>
}
