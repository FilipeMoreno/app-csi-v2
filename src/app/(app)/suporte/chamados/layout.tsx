import type { Metadata } from 'next'

import '@/styles/globals.css'

export const metadata: Metadata = {
	title: 'Chamados | Colégio Santo Inácio',
	description: 'Controle de chamados técnicos',
}

export default function SuporteLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <div>{children}</div>
}
