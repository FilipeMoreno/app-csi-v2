import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Image from 'next/image'

interface VouchersContent {
	numDevices: string
	time: string
	period: string
	cod: string
}

interface VoucherDisplayProps {
	voucher: VouchersContent
	dataAtual: string
}

export const VoucherDisplay: React.FC<VoucherDisplayProps> = ({
	voucher,
	dataAtual,
}) => (
	<Card>
		<CardContent className="flex flex-col items-center justify-center">
			<Image
				src="/icons/icon-512x512.png"
				alt="Logo"
				height={40}
				width={40}
				className="my-4"
			/>
			<p className="text-center text-sm">
				Insira o código abaixo para acessar a internet
			</p>
			<p className="text-center text-xs">
				Rede: <b>Visitantes - CSI</b>
			</p>
			<p className="my-4 text-center text-2xl font-bold">{voucher.cod}</p>
			<p className="text-center text-xs">{dataAtual}</p>
		</CardContent>
	</Card>
)
