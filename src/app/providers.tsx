'use client'
import CookiesConsent from '@/components/CookiesConsent'
import NextTopLoader from 'nextjs-toploader'

import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from 'next-themes'

import { SpeedInsights } from '@vercel/speed-insights/next'

import { Analytics } from '@vercel/analytics/react'

import type { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			{children}
			<CookiesConsent />
			<NextTopLoader color="#af3c41" />
			<Toaster richColors closeButton />
			<SpeedInsights />
			<Analytics />
		</ThemeProvider>
	)
}
