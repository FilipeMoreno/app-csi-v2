import CookiesConsent from '@/components/CookiesConsent'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from 'next-themes'
import NextTopLoader from 'nextjs-toploader'
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
		</ThemeProvider>
	)
}
