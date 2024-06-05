import type { Metadata } from 'next'

import '@/styles/globals.css'

export const metadata: Metadata = {
	title: 'Scanner QRCode - Carteirinhas | Colégio Santo Inácio',
	description: 'Scanner QRCode para carteirinhas de estudantes',
}

export default function CarteirinhasScanner({
	children,
}: {
	children: React.ReactNode
}) {
	return <div>{children}</div>
}
