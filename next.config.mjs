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
}

export default withPWA(nextConfig)
