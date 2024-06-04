import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '@/styles/globals.css'
import Providers from './providers'

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
})

export const metadata: Metadata = {
	metadataBase: new URL(
		process.env.APP_URL
			? `${process.env.APP_URL}`
			: process.env.VERCEL_URL
				? `https://${process.env.VERCEL_URL}`
				: `http://localhost:${process.env.PORT || 3000}`,
	),
	title: 'shadcn/ui sidebar',
	description:
		'A stunning and functional retractable sidebar for Next.js built on top of shadcn/ui complete with desktop and mobile responsiveness.',
	alternates: {
		canonical: '/',
	},
	openGraph: {
		url: '/',
		title: 'shadcn/ui sidebar',
		description:
			'A stunning and functional retractable sidebar for Next.js built on top of shadcn/ui complete with desktop and mobile responsiveness.',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'shadcn/ui sidebar',
		description:
			'A stunning and functional retractable sidebar for Next.js built on top of shadcn/ui complete with desktop and mobile responsiveness.',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-BR" className="antialiased" suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
