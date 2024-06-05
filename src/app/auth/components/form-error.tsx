import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

interface FormErrorProps {
	message?: string
}

export const FormError = ({ message }: FormErrorProps) => {
	if (!message) return null

	return (
		<div className="flex items-center gap-x-2 rounded-md bg-error p-3 text-error-foreground text-sm">
			<ExclamationTriangleIcon className="h-4 w-4" />
			<p>{message}</p>
		</div>
	)
}
