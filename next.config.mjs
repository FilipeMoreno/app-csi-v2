import withPWAInit from '@ducanh2912/next-pwa'

const withPWA = withPWAInit({
	cacheOnFrontEndNav: true,
	aggressiveFrontEndNavCaching: true,
	reloadOnOnline: true,
	fallbacks: {
		image: '/images/offline.png',
		document: '/offline',
	},
	dest: 'public',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'i.imgur.com',
			},
			{
				protocol: 'https',
				hostname: 'colegiosantoinacio.com.br',
			},
		],
	},
	env: {
		FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
		FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
		FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
		FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
		FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
		FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
		FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
	},
}

export default withPWA(nextConfig)
