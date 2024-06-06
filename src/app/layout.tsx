import type { Metadata } from 'next'
import '@/styles/globals.css'
import Script from 'next/script'
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
	manifest: '/manifest.json',
	alternates: {
		canonical: '/',
	},
	appleWebApp: {
		capable: true,
		statusBarStyle: 'default',
		title: 'APP - Colégio Santo Inácio',
		// startUpImage: [],
	},
	formatDetection: {
		telephone: false,
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
			<head>
				<meta charSet="urf-8" />
				<Script src="/register-sw.js" />
			</head>
			<body className={`${geistSans.variable}${geistMono.variable}`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
