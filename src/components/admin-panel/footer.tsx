import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
	return (
		<div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-backdrop-blur:bg-background/60">
			<div className="mx-4 flex h-14 items-center md:mx-8">
				<p className="flex flex-row items-center gap-1 text-left text-muted-foreground text-xs leading-loose md:text-sm">
					<Image
						src="/icons/icon-512x512.png"
						alt="Logo"
						width={24}
						height={16}
						className="flex flex-row"
					/>
					Colégio Santo Inácio. Developed with by{' '}
					<Link
						href="https://github.com/filipemoreno"
						target="_blank"
						rel="noopener noreferrer"
						className="font-medium underline underline-offset-4"
					>
						Filipe Moreno
					</Link>
					.
				</p>
			</div>
		</div>
	)
}
