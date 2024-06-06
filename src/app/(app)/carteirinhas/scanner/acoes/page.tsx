'use client'

import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'

import HeaderPages from '@/components/HeaderPages'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerOverlay,
	DrawerPortal,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { useMediaQuery } from 'usehooks-ts'
import CustomQrScanner from '../../components/CustomQrScanner'

export default function CarteirinhasScannerAcoes() {
	const [qrcode, setQrCode] = useState<string | null>(null)
	const [status, setStatus] = useState('')

	const isDesktop = useMediaQuery('(min-width: 768px)')

	function handleChangeStatus() {
		toast.success('Status alterado!', {
			description: `O status foi alterado para ${status} com sucesso!`,
		})

		setQrCode(null)
	}

	// useEffect(() => {
	// 	if (qrcode) {
	// 		toast.success('Carteirinha encontrada!', {
	// 			description: `O código ${qrcode} foi encontrado`,
	// 		})
	// 	}
	// }, [qrcode])

	return (
		<>
			<HeaderPages
				title="Scanner de ações rápidas"
				description="Aponte a câmera para o QR Code para visualizar as ações rápidas"
			/>
			<div className="flex flex-wrap gap-8">
				<div className="h-96 w-full max-w-sm rounded-xl bg-secondary p-4">
					<CustomQrScanner
						config={{
							fps: 10,
							aspectRatio: 1,
							qrbox: { width: 250, height: 250 },
						}}
						onScan={(scannedCode) => setQrCode(scannedCode)}
					/>
					{(isDesktop && qrcode && (
						<AlertDialog open>
							<AlertDialogTrigger asChild>
								<Button variant={'outline'}>
									<Plus className="mr-2 h-4 w-4" /> Status
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>Adicionar status</AlertDialogTitle>
									<AlertDialogDescription>
										<span>Nome: Nome do aluno aqui</span>
										<span>Série/Turma: 1º ANO A - Ensino Médio</span>
										<Separator />
										Selecione o status que deseja adicionar
										<Select onValueChange={setStatus}>
											<SelectTrigger className="mt-2 w-full">
												<SelectValue placeholder="Selecione o status" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="Entregue">Entregue</SelectItem>
												<SelectItem value="Produzida">Produzida</SelectItem>
												<SelectItem value="Pagamento recebido">
													Pagamento recebido
												</SelectItem>
												<SelectItem value="Aprovada">Aprovada</SelectItem>
											</SelectContent>
										</Select>
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel onClick={() => setQrCode(null)}>
										Cancelar
									</AlertDialogCancel>
									<AlertDialogAction onClick={handleChangeStatus}>
										Continuar
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					)) ||
						(qrcode && (
							<Drawer open={true}>
								<DrawerPortal>
									<DrawerOverlay className="fixed inset-0 border-none bg-black/40 ring-0 focus:ring-transparent" />
									<DrawerContent className="fixed right-0 bottom-0 left-0 mt-24 flex h-full max-h-[46%] flex-col rounded-t-[10px] p-4">
										<div className="flex-1 rounded-t-[10px]">
											<div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full" />
											<div className="mx-auto max-w-md">
												<DrawerTitle className="mb-4 font-medium">
													Informações da carteirinha
												</DrawerTitle>
												<p className="mb-2 text-zinc-300">
													Nome: <b>Nome do aluno aqui</b>
												</p>
												<p className="mb-2 text-zinc-300">
													Série/Turma: <b>1º ANO A - Ensino Médio</b>
												</p>
											</div>
											<Select onValueChange={setStatus}>
												<SelectTrigger className="mt-2">
													<SelectValue placeholder="Selecione o status" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="Entregue">Entregue</SelectItem>
													<SelectItem value="Produzida">Produzida</SelectItem>
													<SelectItem value="Pagamento recebido">
														Pagamento recebido
													</SelectItem>
													<SelectItem value="Aprovada">Aprovada</SelectItem>
												</SelectContent>
											</Select>
											<DrawerFooter>
												<Button onClick={handleChangeStatus}>Continuar</Button>
												<DrawerClose>
													<Button
														variant={'outline'}
														onClick={() => setQrCode(null)}
														className="w-full"
													>
														Cancelar
													</Button>
												</DrawerClose>
											</DrawerFooter>
										</div>
									</DrawerContent>
								</DrawerPortal>
							</Drawer>
						))}
				</div>
			</div>
		</>
	)
}
