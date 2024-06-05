import type { Metadata } from 'next'

import '@/styles/globals.css'

export const metadata: Metadata = {
	title: 'Solicitação #ID - Carteirinhas | Colégio Santo Inácio',
	description: 'Detalhes da solicitação de carteirinha de estudante',
}

export default function CarteirinhasDetalhes({
	children,
}: {
	children: React.ReactNode
}) {
	return <div>{children}</div>
}
