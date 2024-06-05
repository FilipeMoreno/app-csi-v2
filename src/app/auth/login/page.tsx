'use client'

import Image from 'next/image'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { SignInForm } from '../components/sign-in-form'

export default function AuthPage() {
	return (
		<div className="container flex flex-col items-center justify-center py-16 md:grid">
			<Card>
				<CardHeader>
					<div className="flex items-center justify-center">
						<Image src="/favicon.ico" alt="Logo" width={64} height={64} />
					</div>
				</CardHeader>
				<CardContent>
					<div className="">
						<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
							<div className="flex flex-col space-y-2 text-center">
								<h1 className="font-semibold text-2xl tracking-tight">
									Entre com sua conta
								</h1>
								<p className="text-muted-foreground text-sm">
									Digite suas credencias abaixo para continuar
								</p>
							</div>
							<SignInForm />
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
