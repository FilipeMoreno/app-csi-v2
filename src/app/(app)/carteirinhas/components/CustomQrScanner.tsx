'use client'

import { Html5Qrcode, type Html5QrcodeCameraScanConfig } from 'html5-qrcode'
import React, { type FC, useEffect, useRef, useState } from 'react'

const CustomQrScanner: FC<{
	config: Html5QrcodeCameraScanConfig
	onScan: (e: string) => void
}> = ({ config, onScan }) => {
	const [msg, setMsg] = useState<null | {
		type: 'info' | 'warning' | 'error'
		content: string
	}>(null)
	const html5QrCode = useRef<null | Html5Qrcode>(null)
	const CONTAINER_ID = 'qrscanner-container'

	useEffect(() => {
		html5QrCode.current = new Html5Qrcode(CONTAINER_ID)

		Html5Qrcode.getCameras().then((devices) => {
			if (!devices || devices.length < 1) {
				setMsg({
					type: 'error',
					content: 'Nenhuma câmera foi encontrada!',
				})
			} else {
				html5QrCode.current?.start(
					{ facingMode: 'environment' },
					config,
					onScan,
					undefined,
				)
			}
		})
	}, [config, onScan])

	return (
		<div>
			{msg && (
				<p
					className={
						msg.type === 'error'
							? 'bg-red-900 text-red-200'
							: msg.type === 'warning'
								? 'bg-amber-900 text-amber-200'
								: 'bg-blue-900 text-blue-200'
					}
				>
					{msg.content}
				</p>
			)}
			<div id={CONTAINER_ID} />
		</div>
	)
}

export default CustomQrScanner
