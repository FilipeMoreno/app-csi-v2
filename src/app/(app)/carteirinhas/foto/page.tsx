'use client'

import { RefreshCcw } from 'lucide-react'
import Image from 'next/image'
import React, { useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam'

import { Button } from '@/components/ui/button'

export default function CarteirinhasFoto() {
	const webcamRef = useRef<Webcam>(null)
	const [url, setUrl] = useState<string | null>(null)
	const [facingMode, setFacingMode] = useState<'user' | 'environment'>(
		'environment',
	)
	const [flash, setFlash] = useState(false)

	const videoConstraints = {
		width: 1920,
		height: 1080,
		facingMode,
	}

	function handleFacingMode() {
		setFacingMode(facingMode === 'environment' ? 'user' : 'environment')
	}

	function handleFlash() {
		setFlash(!flash)
	}

	const capture = useCallback(() => {
		const imageSrc = webcamRef.current?.getScreenshot()
		if (imageSrc) {
			setUrl(imageSrc)
		}
	}, [webcamRef])

	return (
		<div className="h-full w-full rounded-lg bg-secondary p-4">
			{!url && (
				<div>
					<div className="flex flex-row justify-between">
						<Button
							variant={'default'}
							type="button"
							className="my-2"
							onClick={handleFacingMode}
						>
							<RefreshCcw className="h-4 w-4" />
						</Button>
					</div>
					<Webcam
						audio={false}
						height={720}
						ref={webcamRef}
						screenshotFormat="image/jpeg"
						width={1280}
						videoConstraints={videoConstraints}
						screenshotQuality={1}
						forceScreenshotSourceSize={true}
					/>
					<Button variant={'default'} className="my-2 w-full" onClick={capture}>
						Tirar foto
					</Button>
				</div>
			)}
			{url && (
				<div>
					<div>
						<Image src={url} alt="Screenshot" />
					</div>
					<div className="my-2 flex flex-row space-x-2">
						<Button
							onClick={() => {
								setUrl(null)
							}}
							className="w-full"
							variant={'outline'}
						>
							Tirar novamente
						</Button>
						<Button variant={'outline'} className="w-full">
							Confirmar
						</Button>
					</div>
				</div>
			)}
		</div>
	)
}
