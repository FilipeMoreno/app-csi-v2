import type { ComponentProps } from 'react'

export interface BubbleButtonProps extends ComponentProps<'button'> {}

export function BubbleButton(props: BubbleButtonProps) {
	return (
		<button
			className="m-1 flex items-center gap-1.5 p-2 font-medium text-sm text-zinc-200 leading-none hover:rounded-lg hover:bg-zinc-700 hover:text-zinc-50 data-[active=true]:m-1 data-[active=true]:rounded-lg data-[active=true]:bg-zinc-600 data-[active=true]:hover:bg-zinc-700"
			{...props}
		/>
	)
}
