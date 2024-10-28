import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
	title: 'Você está off-line | Colégio Santo Inácio',
}

export default function OfflineLayout({ children }: { children: ReactNode }) {
	return (
		<div
			style={{
				display: 'flex',
				height: '100vh',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				gap: '3rem',
				backgroundColor: '#F9FAFB',
			}}
		>
			{children}
		</div>
	)
}
