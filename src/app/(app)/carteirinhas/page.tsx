'use client'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { toast } from 'sonner'

export default function CarteirinhaHome() {
	return (
		<div className="flex flex-col items-center justify-center">
			<Card className="h-full w-full">
				<CardHeader>
					<CardTitle>Carteirinhas</CardTitle>
					<CardDescription>Gerencie as carteirinhas</CardDescription>
				</CardHeader>
			</Card>
		</div>
	)
}
