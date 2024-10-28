import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { database } from '@/lib/firebaseService'
import { get, ref, set } from 'firebase/database'
import { useEffect } from 'react'

interface ConfiguracoesSinalProps {
	mostrarControles: boolean
	setMostrarControles: (value: boolean) => void
	modoAleatorio: boolean
	setModoAleatorio: (value: boolean) => void
}

export default function ConfiguracoesSinal({
	mostrarControles,
	setMostrarControles,
	modoAleatorio,
	setModoAleatorio,
}: ConfiguracoesSinalProps) {
	useEffect(() => {
		const fetchConfig = async () => {
			try {
				const configRef = ref(database, 'sinal/configuracoes')
				const snapshot = await get(configRef)
				if (snapshot.exists()) {
					const config = snapshot.val()
					if (typeof config.mostrarControles !== 'undefined') {
						setMostrarControles(config.mostrarControles)
					}
					if (typeof config.modoAleatorio !== 'undefined') {
						setModoAleatorio(config.modoAleatorio)
					}
				}
			} catch (error) {
				console.error('Erro ao buscar configurações:', error)
			}
		}

		fetchConfig()
	}, [setMostrarControles, setModoAleatorio])

	useEffect(() => {
		const saveConfig = async () => {
			try {
				const configRef = ref(database, 'sinal/configuracoes')
				await set(configRef, {
					mostrarControles,
					modoAleatorio,
				})
				console.log('Configurações salvas com sucesso!')
			} catch (error) {
				console.error('Erro ao salvar configurações:', error)
			}
		}

		saveConfig()
	}, [mostrarControles, modoAleatorio])

	return (
		<Card>
			<CardHeader>
				<CardTitle>Configurações</CardTitle>
				<CardDescription>
					Mostrando as configurações do sistema.
				</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-6">
				<Separator />
				<div className="flex items-center justify-between space-x-2">
					<Label htmlFor="controles" className="flex flex-col space-y-1">
						<span>Controle manual</span>
						<span className="font-normal text-muted-foreground leading-snug">
							Exibe os controles de música na tela
						</span>
					</Label>
					<Switch
						id="controles"
						checked={mostrarControles}
						onClick={() => setMostrarControles(!mostrarControles)}
					/>
				</div>
				<div className="flex items-center justify-between space-x-2">
					<Label htmlFor="aleatorio" className="flex flex-col space-y-1">
						<span>Modo aleatório</span>
						<span className="font-normal text-muted-foreground leading-snug">
							Toque as músicas em ordem aleatória
						</span>
					</Label>
					<Switch
						id="aleatorio"
						checked={modoAleatorio}
						onClick={() => setModoAleatorio(!modoAleatorio)}
					/>
				</div>
			</CardContent>
		</Card>
	)
}
