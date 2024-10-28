const OFFLINE_VERSION = 1
const CACHE_NAME = 'CSI_APP'
const OFFLINE_URL = 'offline'

self.addEventListener('install', (event) => {
	event.waitUntil(
		(async () => {
			const cache = await caches.open(CACHE_NAME)
			await cache.add(new Request(OFFLINE_URL, { cache: 'reload' }))
		})(),
	)
	self.skipWaiting()
})

self.addEventListener('activate', (event) => {
	event.waitUntil(
		(async () => {
			if ('navigationPreload' in self.registration) {
				await self.registration.navigationPreload.enable()
			}

			const cacheNames = await caches.keys()
			await Promise.all(
				cacheNames.map((cacheName) => {
					if (cacheName !== CACHE_NAME) {
						return caches.delete(cacheName)
					}
				}),
			)
		})(),
	)
	self.clients.claim()
})

self.addEventListener('fetch', (event) => {
	if (event.request.mode === 'navigate') {
		event.respondWith(
			(async () => {
				try {
					const preloadResponse = await event.preloadResponse
					if (preloadResponse) {
						return preloadResponse
					}

					const networkResponse = await fetch(event.request)
					return networkResponse
				} catch (error) {
					console.log('Fetch failed; returning offline page instead.', error)

					const cache = await caches.open(CACHE_NAME)
					const cachedResponse = await cache.match(OFFLINE_URL)
					return cachedResponse
				}
			})(),
		)
	}
})

// Push Notifications
self.addEventListener('push', (event) => {
	const data = event.data.json()
	const title = data.title || 'Nova Notificação'
	const options = {
		body: data.body,
		icon: '/icons/icon-192x192.png',
		badge: '/icons/badge.png',
	}
	event.waitUntil(self.registration.showNotification(title, options))
})

// Background Sync
self.addEventListener('sync', (event) => {
	if (event.tag === 'syncData') {
		event.waitUntil(syncData())
	}
})

async function syncData() {
	// Lógica para sincronizar dados quando online
	console.log('Sincronizando dados em background...')
}

// Atualizações Automáticas
self.addEventListener('message', (event) => {
	if (event.data.action === 'skipWaiting') {
		self.skipWaiting()
	}
})

// IndexedDB para armazenamento offline
function openIndexedDB() {
	const request = indexedDB.open('myDatabase', 1)

	request.onupgradeneeded = (event) => {
		const db = event.target.result
		const store = db.createObjectStore('data', { keyPath: 'id' })
	}

	request.onsuccess = (event) => {
		console.log('IndexedDB aberta com sucesso')
	}

	request.onerror = (event) => {
		console.error('Erro ao abrir IndexedDB', event)
	}
}

// Add to Home Screen
let deferredPrompt
self.addEventListener('beforeinstallprompt', (e) => {
	e.preventDefault()
	deferredPrompt = e
	// Lógica para exibir botão de instalação
})

function showInstallPrompt() {
	if (deferredPrompt) {
		deferredPrompt.prompt()
		deferredPrompt.userChoice.then((choiceResult) => {
			if (choiceResult.outcome === 'accepted') {
				console.log('Usuário aceitou a instalação')
			} else {
				console.log('Usuário recusou a instalação')
			}
			deferredPrompt = null
		})
	}
}
