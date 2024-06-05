import * as z from 'zod'

export const LoginSchema = z.object({
	email: z.string().email({
		message: 'E-mail é obrigatório',
	}),
	password: z.string().min(1, {
		message: 'Senha é obrigatória',
	}),
	code: z.optional(z.string()),
})
