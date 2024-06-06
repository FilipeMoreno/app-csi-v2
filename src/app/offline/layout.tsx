import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
	title: 'Você está off-line | Colégio Santo Inácio',
}

export default function OfflineLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex h-screen flex-col items-center justify-center gap-12 bg-background">
			{children}
		</div>
	)
}
