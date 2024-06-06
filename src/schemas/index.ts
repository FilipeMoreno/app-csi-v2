import * as z from 'zod'

export const LoginSchema = z
	.object({
		email: z.string().email({
			message: 'E-mail é obrigatório',
		}),
		password: z.string({
			message: 'Senha é obrigatória',
		}),

		code: z.optional(z.string()),
	})
	.superRefine(({ password }, checkPassComplexity) => {
		const containsUppercase = (ch) => /[A-Z]/.test(ch)
		const containsLowercase = (ch) => /[a-z]/.test(ch)
		const containsSpecialChar = (ch) =>
			/[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch)
		let countOfUpperCase = 0,
			countOfLowerCase = 0,
			countOfNumbers = 0,
			countOfSpecialChar = 0

		for (let i = 0; i < password.length; i++) {
			const ch = password.charAt(i)
			if (!isNaN(+ch)) countOfNumbers++
			else if (containsUppercase(ch)) countOfUpperCase++
			else if (containsLowercase(ch)) countOfLowerCase++
			else if (containsSpecialChar(ch)) countOfSpecialChar++
		}

		let errObj = {
			upperCase: { pass: true, message: '1 letra maiúscula' },
			lowerCase: { pass: true, message: '1 letra minuscula' },
			specialCh: { pass: true, message: '1 caractere especial' },
			totalNumber: { pass: true, message: '1 número' },
			lengthTotal: { pass: true, message: '8 caracteres' },
		}

		if (countOfLowerCase < 1) {
			errObj = { ...errObj, lowerCase: { ...errObj.lowerCase, pass: false } }
		}
		if (countOfNumbers < 1) {
			errObj = {
				...errObj,
				totalNumber: { ...errObj.totalNumber, pass: false },
			}
		}
		if (countOfUpperCase < 1) {
			errObj = { ...errObj, upperCase: { ...errObj.upperCase, pass: false } }
		}
		if (countOfSpecialChar < 1) {
			errObj = { ...errObj, specialCh: { ...errObj.specialCh, pass: false } }
		}

		if (password.length < 8) {
			errObj = {
				...errObj,
				lengthTotal: { ...errObj.lengthTotal, pass: false },
			}
		}

		if (
			countOfLowerCase < 1 ||
			countOfUpperCase < 1 ||
			countOfSpecialChar < 1 ||
			countOfNumbers < 1 ||
			password.length <= 8
		) {
			checkPassComplexity.addIssue({
				code: 'custom',
				path: ['password'],
				message: errObj,
			})
		}
	})
