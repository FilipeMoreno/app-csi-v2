import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Player } from '@lottiefiles/react-lottie-player'
import { Plus } from 'lucide-react'
import { FaSpinner } from 'react-icons/fa6'
import { TimeLabel } from './AudioTimeLabel'

interface MusicasSinalProps {
	musicResults: any[]
	setMusicResults: React.Dispatch<React.SetStateAction<any[]>>
	handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	selectMusic: (id: number) => void
	tocandoAgora: number
	loadMusic: boolean
	playing: boolean
	mostrarControles: boolean
}

export default function MusicasSinal({
	musicResults,
	handleInputChange,
	selectMusic,
	tocandoAgora,
	loadMusic,
	playing,
	mostrarControles,
}: MusicasSinalProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Lista de músicas</CardTitle>
				<div className="flex flex-row items-center justify-between">
					<CardDescription>Mostrando músicas disponíveis</CardDescription>
					<Button variant="outline">
						<Plus className="mr-2 h-4 w-4" /> Música
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				<Input
					placeholder="Pesquisar uma música..."
					onChange={handleInputChange}
				/>
				<ScrollArea className="my-4 h-96 w-full">
					{musicResults.length === 0 && (
						<div>
							<h1 className="text-center text-sm ">
								nenhum resultado encontrado.
							</h1>
						</div>
					)}
					{loadMusic && (
						<div className="absolute h-full w-full rounded-lg bg-secondary opacity-60">
							<FaSpinner
								style={{
									position: 'absolute',
									top: '0',
									left: '0',
									right: '0',
									bottom: '0',
									margin: 'auto',
								}}
								className="h-16 w-16 animate-spin text-primary"
							/>
						</div>
					)}

					<ul className="space-y-2">
						{musicResults.flatMap((song) =>
							song.id === tocandoAgora ? (
								<li
									key={song.id}
									className="flex flex-row items-center space-x-2 rounded-lg bg-secondary p-4 hover:cursor-pointer hover:bg-opacity-40"
									onClick={() => {
										selectMusic(song.id)
									}}
								>
									{(playing && (
										<Player
											autoplay
											loop
											src="/lottie/audio-wave.json"
											style={{
												height: '20px',
												width: '20px',
												color: 'green',
											}}
										/>
									)) || <p>{song.id}.</p>}
									{(playing && (
										<span className="text-green-500">
											<b>
												{song.title} - {song.artist}
											</b>
										</span>
									)) || (
										<b>
											{song.title} - {song.artist}
										</b>
									)}

									{!mostrarControles && <TimeLabel id={1} />}
								</li>
							) : (
								<li
									key={song.id}
									className="flex flex-row space-x-2 rounded-lg border border-secondary p-4 hover:cursor-pointer hover:bg-secondary hover:bg-opacity-40"
									onClick={() => {
										selectMusic(song.id)
									}}
								>
									<p>{song.id}.</p>
									<p>
										{song.title} - {song.artist}
									</p>
								</li>
							),
						)}
					</ul>
				</ScrollArea>
			</CardContent>
		</Card>
	)
}
