import type React from 'react'
import {
	type FunctionComponent,
	type MouseEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react'
import { useGlobalAudioPlayer } from 'react-use-audio-player'

interface AudioSeekBarProps {
	className?: string
}

export const AudioSeekBar: FunctionComponent<AudioSeekBarProps> = (props) => {
	const { className = '' } = props
	const { playing, getPosition, duration, seek } = useGlobalAudioPlayer()
	const [pos, setPos] = useState(0)
	const frameRef = useRef<number>()

	const seekBarElem = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const animate = () => {
			setPos(getPosition())
			frameRef.current = requestAnimationFrame(animate)
		}

		frameRef.current = window.requestAnimationFrame(animate)

		return () => {
			if (frameRef.current) {
				cancelAnimationFrame(frameRef.current)
			}
		}
	}, [])

	const goTo = useCallback(
		(event: MouseEvent) => {
			const { pageX: eventOffsetX } = event

			if (seekBarElem.current) {
				const elementOffsetX = seekBarElem.current.offsetLeft
				const elementWidth = seekBarElem.current.clientWidth
				const percent = (eventOffsetX - elementOffsetX) / elementWidth
				seek(percent * duration)
			}
		},
		[duration, playing, seek],
	)

	if (duration === Number.POSITIVE_INFINITY) return null

	return (
		<div>
			<input
				type="range"
				min="0"
				max={duration}
				value={pos}
				className="mt-2 w-80 cursor-pointer overflow-hidden rounded-full accent-zinc-800 lg:w-96"
				ref={seekBarElem as React.RefObject<HTMLInputElement>}
				onChange={(e) => seek(Number(e.target.value))}
				onClick={goTo}
			/>
		</div>
	)
}
