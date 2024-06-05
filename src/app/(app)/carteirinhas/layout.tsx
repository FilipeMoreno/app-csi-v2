import type { Metadata } from 'next'

import '@/styles/globals.css'

export const metadata: Metadata = {
	title: 'Carteirinhas | Colégio Santo Inácio',
}

export default function CarteirinhasLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <div>{children}</div>
}
