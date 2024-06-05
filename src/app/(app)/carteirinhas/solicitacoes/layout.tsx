import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
	title: 'Solicitações - Carteirinhas | Colégio Santo Inácio',
	description: 'Solicitações de carteirinhas de estudante',
}

export default function CarteirinhasSolicitacoes({
	children,
}: {
	children: React.ReactNode
}) {
	return <div>{children}</div>
}
