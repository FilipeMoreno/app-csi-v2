import { Plus } from 'lucide-react'
import { Button } from './ui/button'

export default function HeaderPages({
	title,
	description,
	button,
	buttonLink,
}: {
	title: string
	description: string
	button?: string
	buttonLink?: string
}) {
	return (
		<div className="mb-4 flex flex-row items-center justify-between">
			<div>
				<h1 className="font-bold text-2xl">{title}</h1>
				<p className="text-sm">{description}</p>
			</div>
			{button && (
				<div>
					<Button variant={'outline'}>
						<Plus className="mr-2 h-4 w-4" /> {button}
					</Button>
				</div>
			)}
		</div>
	)
}
