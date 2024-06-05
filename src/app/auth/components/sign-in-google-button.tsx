import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { FaGoogle, FaSpinner } from 'react-icons/fa6'

export function SignInGoogleButton() {
	const [loading, setLoading] = useState(false)

	async function handleSignIn() {
		setLoading(true)

		await signIn('google', {
			callbackUrl: '/',
		})
	}

	return (
		<Button
			variant="outline"
			type="button"
			disabled={loading}
			onClick={handleSignIn}
		>
			{loading ? (
				<FaSpinner className="mr-2 h-4 w-4 animate-spin" />
			) : (
				<FaGoogle className="mr-4 h-4 w-4" />
			)}{' '}
			Continuar com Google
		</Button>
	)
}
