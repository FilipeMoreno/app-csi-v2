import type { Metadata } from 'next'
import '@/styles/globals.css'
import { geistMono, geistSans } from './fonts'
import Providers from './providers'

export const metadata: Metadata = {
	metadataBase: new URL(
		process.env.APP_URL
			? `${process.env.APP_URL}`
			: process.env.VERCEL_URL
				? `https://${process.env.VERCEL_URL}`
				: `http://localhost:${process.env.PORT || 3000}`,
	),
	title: 'APP - Colégio Santo Inácio',
	description:
		'Colégio Santo Inácio, construindo história, formando profissionais e cidadãos conscientes.',
	alternates: {
		canonical: '/',
	},
	openGraph: {
		url: '/',
		title: 'APP - Colégio Santo Inácio',
		description:
			'Colégio Santo Inácio, construindo história, formando profissionais e cidadãos conscientes.',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'APP - Colégio Santo Inácio',
		description:
			'Colégio Santo Inácio, construindo história, formando profissionais e cidadãos conscientes.',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-BR" className="antialiased" suppressHydrationWarning>
			<body className={`${geistSans.variable}${geistMono.variable}`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
