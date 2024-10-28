'use client'

import schedule from 'node-schedule'
import { useEffect, useState } from 'react'
import { useGlobalAudioPlayer } from 'react-use-audio-player'

import {
	PauseIcon,
	PlayIcon,
	TrackNextIcon,
	TrackPreviousIcon,
} from '@radix-ui/react-icons'
import { Volume1Icon, Volume2Icon, VolumeIcon, VolumeXIcon } from 'lucide-react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AudioSeekBar } from './components/AudioSeekBar'
import { TimeLabel } from './components/AudioTimeLabel'

import HeaderPages from '@/components/HeaderPages'
import { Button } from '@/components/ui/button'
import { database } from '@/lib/firebaseService'
import { get, ref, set } from 'firebase/database'
import ConfiguracoesSinal from './components/Configuracoes'
import HorariosSinaleiro from './components/Horarios'
import MusicasSinal from './components/Musicas'
import songsJson from './musicas.json'

export default function SinaleiroHome() {
	const [volumeValue, setVolumeValue] = useState(0.5)
	const [tocandoAgora, setTocandoAgora] = useState(0)
	const [loadMusic, setLoadMusic] = useState(true)
	const [search, setSearch] = useState('')
	const [musicResults, setMusicResults] = useState(songsJson)
	const [autoPlay, setAutoPlay] = useState(false)
	const [currentSongId, setCurrentSongId] = useState(() => {
		if (typeof window !== 'undefined') {
			const storedSongId = localStorage.getItem('currentSongId')
			return storedSongId ? Number(storedSongId) : 1
		}
		return 1
	})

	const [currentSeekPosition, setCurrentSeekPosition] = useState(() => {
		if (typeof window !== 'undefined') {
			const seekPosition = localStorage.getItem('music_pos')
			return seekPosition ? Number.parseFloat(seekPosition) : 0
		}
		return 1
	})

	const [modoAleatorio, setModoAleatorio] = useState()
	const [mostrarControles, setMostrarControles] = useState()

	useEffect(() => {
		const fetchConfig = async () => {
			try {
				const configRef = ref(database, 'sinal/configuracoes')
				const snapshot = await get(configRef)
				if (snapshot.exists()) {
					const config = snapshot.val()
					setMostrarControles(config.mostrarControles)
					setModoAleatorio(config.modoAleatorio)
				}
			} catch (error) {
				console.error('Erro ao buscar configurações:', error)
			}
		}

		fetchConfig()
	}, [])

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

	const { load, play, pause, setVolume, playing, seek } = useGlobalAudioPlayer()

	useEffect(() => {
		const getVolume = localStorage.getItem('volume')

		setVolumeValue(getVolume ? Number.parseFloat(getVolume) : 0.5)
		setVolume(getVolume ? Number.parseFloat(getVolume) : 0.5)
	}, [])

	useEffect(() => {
		localStorage.setItem('currentSongId', currentSongId.toString())
	})

	useEffect(() => {
		const currentSong = musicResults.find((song) => song.id === currentSongId)

		if (!currentSong) return

		load(currentSong.url, {
			html5: true,
			format: 'mp3',
			autoplay: verifyAutoPlay(),
			initialVolume: volumeValue,
			onend: () => {
				nextMusic()
			},
			onpause() {
				console.log('Música pausada.')
			},
			onplay() {
				console.log(`Tocando agora: ${currentSong.title}`)
			},
			onstop: () => console.log('Música parada.'),
			onload() {
				console.log('Músicas carregadas.')
				setTocandoAgora(currentSong.id)
				setLoadMusic(false)
				seek(currentSeekPosition)
			},
		})
	}, [currentSongId])

	useEffect(() => {
		const job = schedule.scheduleJob('* * * * *', verifySchedulers)

		return () => {
			job.cancel()
		}
	}, [])

	async function verifySchedulers() {
		const today = new Date()
		const dayOfWeek = today
			.toLocaleDateString('pt-BR', { weekday: 'long' })
			.toLowerCase()
		const timeString = today.toLocaleTimeString('pt-BR', {
			hour: '2-digit',
			minute: '2-digit',
		})

		try {
			// Refere-se ao caminho dos horários no Firebase
			const scheduleRef = ref(database, `sinal/horarios/${dayOfWeek}`)
			const snapshot = await get(scheduleRef)

			if (!snapshot.exists()) {
				console.log(`Não há horários para ${dayOfWeek}.`)
				return
			}

			const horariosDia = snapshot.val()
			const horarioAtual = Object.values(horariosDia).find(
				(horario: any) => horario.horario === timeString,
			)

			if (!horarioAtual) {
				console.log(
					`Não há horário para este momento. (${dayOfWeek} - ${timeString})`,
				)
				return
			}

			const duracao = horarioAtual.duracao

			if (!playing) {
				playMusic()
				setAutoPlay(true)
			}

			setTimeout(() => {
				pause()
				setAutoPlay(false)
			}, duracao * 1000)
		} catch (error) {
			console.error('Erro ao buscar horários do Firebase:', error)
		}
	}

	async function playMusic() {
		if (!playing) {
			play()
		}
	}

	function pauseMusic() {
		if (playing) {
			pause()
		}
	}

	function nextMusic() {
		setLoadMusic(true)

		setCurrentSeekPosition(0)

		if (modoAleatorio) {
			const randomIndex = Math.floor(Math.random() * musicResults.length)
			if (currentSongId === musicResults[randomIndex].id) {
				return nextMusic()
			}
			setCurrentSongId(musicResults[randomIndex].id)
			return
		}

		const currentIndex = musicResults.findIndex(
			(song) => song.id === currentSongId,
		)
		const nextIndex = (currentIndex + 1) % musicResults.length
		setCurrentSongId(musicResults[nextIndex].id)
	}

	function previousMusic() {
		setLoadMusic(true)

		const currentIndex = musicResults.findIndex(
			(song) => song.id === currentSongId,
		)
		let nextIndex = currentIndex - 1
		if (nextIndex < 0) {
			nextIndex = musicResults.length - 1
		}
		setCurrentSongId(musicResults[nextIndex].id)
	}

	const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const volume = Number.parseFloat(event.target.value)
		setVolume(volume)
		setVolumeValue(volume)
		localStorage.setItem('volume', event.target.value)
	}

	function verifyAutoPlay() {
		if (autoPlay) {
			return true
		}

		if (playing) {
			return true
		}

		return false
	}

	function muteMusica() {
		const getVolume = localStorage.getItem('volume')

		setVolumeValue(getVolume ? Number.parseFloat(getVolume) : 0.5)
		setVolume(getVolume ? Number.parseFloat(getVolume) : 0.5)

		if (getVolume && Number.parseFloat(getVolume) === 0) {
			setVolumeValue(0.5)
			setVolume(0.5)
			localStorage.setItem('volume', (0.5).toString())
			return
		}

		if (volumeValue > 0) {
			setVolumeValue(0)
			setVolume(0)
		}
	}

	async function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		if (event.target.value === '') {
			setMusicResults(songsJson)
			return
		}

		setSearch(event.target.value.toLowerCase())
		const results = songsJson.filter((musica) =>
			musica.title.toLowerCase().includes(search.toLowerCase()),
		)

		if (results.length === 0) {
			return setMusicResults([])
		}

		setMusicResults(results)
	}

	function selectMusic(id: number) {
		if (id === currentSongId) {
			return
		}

		setCurrentSeekPosition(0)

		setLoadMusic(true)
		const currentIndex = musicResults.findIndex((song) => song.id === id)

		setCurrentSongId(musicResults[currentIndex].id)
	}

	return (
		<>
			<HeaderPages
				title="Sinal"
				description="Gerencie os horários e músicas do sinal"
			/>
			<div className="flex flex-col items-center justify-center">
				<div className="flex w-full flex-col items-center justify-center">
					{mostrarControles && (
						<>
							<div className="flex flex-row space-x-2">
								<Button
									onClick={previousMusic}
									variant={'outline'}
									size={'icon'}
								>
									<TrackPreviousIcon />
								</Button>
								{(playing && (
									<Button
										variant={'outline'}
										size={'icon'}
										onClick={pauseMusic}
									>
										<PauseIcon />
									</Button>
								)) || (
									<Button variant={'outline'} size={'icon'} onClick={playMusic}>
										<PlayIcon />
									</Button>
								)}

								<Button variant={'outline'} size={'icon'} onClick={nextMusic}>
									<TrackNextIcon />
								</Button>
							</div>
							<div className="mt-2 flex w-80 flex-row items-center bg-text-400 lg:w-96">
								{volumeValue === 0 && (
									<VolumeXIcon
										onClick={muteMusica}
										className="mr-2 cursor-pointer text-red-500"
									/>
								)}
								{volumeValue < 0.2 && volumeValue > 0 && (
									<VolumeIcon
										onClick={muteMusica}
										className="mr-2 cursor-pointer"
									/>
								)}
								{volumeValue < 0.7 && volumeValue > 0.2 && (
									<Volume1Icon
										onClick={muteMusica}
										className="mr-2 cursor-pointer"
									/>
								)}
								{volumeValue >= 0.7 && (
									<Volume2Icon
										size={25}
										onClick={muteMusica}
										className="mr-2 cursor-pointer"
									/>
								)}
								<input
									type="range"
									min="0"
									max="1"
									step="0.01"
									value={volumeValue}
									onChange={handleVolumeChange}
									className="w-full cursor-pointer accent-zinc-800"
								/>
							</div>
							<div className="">
								<div className="playBar__timeStuff">
									<AudioSeekBar className="w-full" />
								</div>
								<div className="flex items-center justify-center">
									<TimeLabel id={0} />
								</div>
							</div>
						</>
					)}
				</div>

				<Tabs defaultValue="musicas" className="my-4 w-full">
					<TabsList className="grid w-full grid-cols-3">
						<TabsTrigger value="musicas">Músicas</TabsTrigger>
						<TabsTrigger value="horarios">Horários</TabsTrigger>
						<TabsTrigger value="config">Configurações</TabsTrigger>
					</TabsList>
					<TabsContent value="musicas">
						<MusicasSinal
							musicResults={musicResults}
							setMusicResults={setMusicResults}
							handleInputChange={handleInputChange}
							selectMusic={selectMusic}
							tocandoAgora={tocandoAgora}
							loadMusic={loadMusic}
							playing={playing}
							mostrarControles={mostrarControles}
						/>
					</TabsContent>
					<TabsContent value="horarios">
						<HorariosSinaleiro />
					</TabsContent>
					<TabsContent value="config">
						<ConfiguracoesSinal
							mostrarControles={mostrarControles}
							setMostrarControles={setMostrarControles}
							modoAleatorio={modoAleatorio}
							setModoAleatorio={setModoAleatorio}
						/>
					</TabsContent>
				</Tabs>
			</div>
		</>
	)
}
