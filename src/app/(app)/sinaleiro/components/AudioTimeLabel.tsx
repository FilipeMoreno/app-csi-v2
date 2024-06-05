import React, { useEffect, useState } from 'react'
import { useGlobalAudioPlayer } from 'react-use-audio-player'

interface AudioTimeLabelProps {
	id: number
}

const formatTime = (seconds: number) => {
	if (seconds === Number.POSITIVE_INFINITY) {
		return '--'
	}
	const floored = Math.floor(seconds)
	let from = 14
	let length = 5
	// Display hours only if necessary.
	if (floored >= 3600) {
		from = 11
		length = 8
	}

	return new Date(floored * 1000).toISOString().substr(from, length)
}

export const TimeLabel = ({ id }: AudioTimeLabelProps) => {
	const [pos, setPos] = useState(0)

	const { duration, getPosition } = useGlobalAudioPlayer()

	useEffect(() => {
		const i = setInterval(() => {
			setPos(getPosition())
			localStorage.setItem('music_pos', JSON.stringify(getPosition()))
		}, 500)

		return () => clearInterval(i)
	}, [getPosition])

	// return <div>{`${formatTime(pos)} / ${formatTime(duration)}`}</div>
	if (id === 1) {
		return (
			<div className="flex flex-row text-xs">
				<p>
					{formatTime(pos)} / {formatTime(duration)}
				</p>
			</div>
		)
	}
	return (
		<div className="-mt-1 flex w-80 flex-row justify-between text-xs lg:w-96">
			<p>{formatTime(pos)}</p>
			<p>{formatTime(duration)}</p>
		</div>
	)
}
