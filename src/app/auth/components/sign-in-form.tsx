'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { PasswordInput } from '@/components/ui/password-input'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaSpinner } from 'react-icons/fa6'
import type { z } from 'zod'
import { FormError } from './form-error'
import { FormSuccess } from './form-success'

import { FloatingLabelInput } from '@/components/ui/floating-label-input'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/components/ui/input-otp'
import { LoginSchema } from '@/schemas'
import { SignInGoogleButton } from './sign-in-google-button'

type SignInFormSchema = z.infer<typeof LoginSchema>

export function SignInForm() {
	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbackUrl')
	const urlError = [
		searchParams.get('error') === 'OAuthAccountNotLinked'
			? 'Email already in use with different provider!'
			: '',
		searchParams.get('error') === 'AdapterError'
			? 'Error connecting to adapter!'
			: '',
	]

	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm<SignInFormSchema>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const [showTwoFactor, setShowTwoFactor] = useState(false)
	const [error, setError] = useState<string | undefined>('')
	const [success, setSuccess] = useState<string | undefined>('')

	async function handleSignIn(data: SignInFormSchema) {
		const { email, password } = data

		setError('')
		setSuccess('')

		await signIn('credentials', {
			email,
			password,
			callbackUrl: '/',
			redirect: false,
		})
	}

	return (
		<div className="grid gap-6">
			<form onSubmit={handleSubmit(handleSignIn)}>
				{!showTwoFactor && (
					<div className="grid gap-3">
						<FormError message={error || urlError.map((e) => e).join('')} />
						<FormSuccess message={success} />
						<div className="grid gap-1">
							<Label className="sr-only" htmlFor="email">
								Email
							</Label>
							<FloatingLabelInput
								id="email"
								label="Email"
								type="email"
								autoCapitalize="none"
								autoComplete="email"
								autoCorrect="off"
								disabled={isSubmitting}
								{...register('email')}
								className={errors.email ? 'border-red-500' : ''}
							/>
							<span className="text-red-500 text-xs">
								{errors.email?.message}
							</span>
						</div>
						<div className="grid gap-1">
							<Label className="sr-only" htmlFor="email">
								Senha
							</Label>
							<FloatingLabelInput
								id="password"
								label="Senha"
								type="password"
								autoCapitalize="none"
								autoComplete="password"
								autoCorrect="off"
								disabled={isSubmitting}
								{...register('password', { minLength: 4 })}
								className={errors.password ? 'border-red-500' : ''}
							/>
							<span className="text-red-500 text-xs">
								{errors.password?.message && (
									<ul className="mt-2 text-red-500 text-xs">
										<span>Sua senha deve conter pelo menos:</span>
										{Object.keys(errors.password.message).map((m, i) => {
											const { pass, message } = errors.password.message[m]
											return (
												<li key={i}>
													<span>{pass ? '✅' : '❌'}</span>
													<span>{message}</span>
												</li>
											)
										})}
									</ul>
								)}
							</span>
						</div>

						<Button variant="link" asChild className="justify-end px-0 text-xs">
							<Link href="/auth/reset">Esqueceu a senha?</Link>
						</Button>
					</div>
				)}
				{showTwoFactor && (
					<div className="my-4 grid items-center justify-center gap-2">
						<FormError message={error || urlError.map((e) => e).join('')} />
						<FormSuccess message={success} />
						<div className="grid gap-1">
							<Label className="sr-only" htmlFor="email">
								Código de verificação
							</Label>

							<InputOTP maxLength={6}>
								<InputOTPGroup>
									<InputOTPSlot index={0} />
									<InputOTPSlot index={1} />
									<InputOTPSlot index={2} />
									<InputOTPSlot index={3} />
									<InputOTPSlot index={4} />
									<InputOTPSlot index={5} />
								</InputOTPGroup>
							</InputOTP>

							{/* <FloatingLabelInput
								id="code"
								label="Código de verificação"
								disabled={isSubmitting}
								{...register('code')}
							/> */}
						</div>
					</div>
				)}
				<Button variant={'outline'} disabled={isSubmitting} className="w-full">
					{isSubmitting && <FaSpinner className="mr-2 h-4 w-4 animate-spin" />}
					{showTwoFactor ? 'Continuar' : 'Entrar'}
				</Button>
			</form>
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">ou</span>
				</div>
			</div>
			<div className="flex flex-col space-y-3">
				<SignInGoogleButton />
			</div>
		</div>
	)
}
