'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import BulletList from '@tiptap/extension-bullet-list'
import CharacterCount from '@tiptap/extension-character-count'
import CodeBlock from '@tiptap/extension-code-block'
import { Color } from '@tiptap/extension-color'
import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import ImageExtension from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from '@tiptap/extension-placeholder'
import Text from '@tiptap/extension-text'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Typography from '@tiptap/extension-typography'
import Underline from '@tiptap/extension-underline'
import {
	BubbleMenu,
	EditorContent,
	FloatingMenu,
	useEditor,
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from 'next/image'
import { useCallback } from 'react'
import {
	RxFontBold,
	RxFontItalic,
	RxLink1,
	RxLinkBreak1,
	RxStrikethrough,
	RxTextAlignCenter,
	RxTextAlignJustify,
	RxTextAlignLeft,
	RxTextAlignRight,
	RxUnderline,
} from 'react-icons/rx'
import { BubbleButton } from './editor/BubbleButton'

const Tiptap = () => {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				bulletList: true,
				orderedList: true,
				heading: true,
			}),
			Document,
			Paragraph,
			Text,
			CodeBlock,
			CharacterCount,
			TextStyle,
			Color,
			Dropcursor,
			ImageExtension,
			Typography,
			BulletList,
			ListItem,
			OrderedList,
			Link.configure({
				openOnClick: false,
				autolink: true,
				defaultProtocol: 'https',
				HTMLAttributes: {
					class: 'text-blue-500 color:blue',
				},
			}),
			Underline,
			TextAlign.configure({
				types: ['heading', 'paragraph'],
			}),
			Placeholder.configure({
				placeholder: 'Escreva algo ou digite "/" para comandos...',
			}),
		],
		content: '',
		editorProps: {
			attributes: {
				class: 'outline-none',
			},
		},
	})

	const setLink = useCallback(() => {
		const previousUrl = editor.getAttributes('link').href

		if (editor.isActive('link')) {
			editor.chain().focus().extendMarkRange('link').unsetLink().run()
			return
		}

		const url = window.prompt('URL', previousUrl)

		if (url === null) {
			return
		}

		if (url === '') {
			editor.chain().focus().extendMarkRange('link').unsetLink().run()
			return
		}

		editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
	}, [editor])

	const addImage = useCallback(() => {
		const url = window.prompt('URL')

		if (url) {
			editor.chain().focus().setImage({ src: url }).run()
		}
	}, [editor])

	if (!editor) {
		return null
	}

	return (
		<>
			<EditorContent
				editor={editor}
				className="mx- w-full max-w-[850px] rounded-lg border border-input bg-transparent p-4"
			/>

			{editor && (
				<FloatingMenu
					editor={editor}
					shouldShow={({ state }) => {
						const { $from } = state.selection
						const currentLineText = $from.nodeBefore?.textContent

						return currentLineText === '/'
					}}
					className="flex flex-col gap-1 overflow-hidden rounded-lg border-zinc-600 bg-zinc-800 px-1 py-2 shadow-black/20 shadow-xl"
				>
					<ScrollArea className="h-64 rounded-md border">
						<button
							className="flex min-w-[280px] items-center gap-2 rounded p-1 hover:bg-zinc-700"
							onClick={() => editor.chain().focus().toggleParagraph().run()}
						>
							<Image
								src="/img/text-icon.png"
								alt="Text Icon"
								width={48}
								height={48}
								className=" w-12 rounded border border-zinc-700"
							/>
							<div className="flex flex-col text-left">
								<span className="text-sm">Texto</span>
								<span className="text-xs text-zinc-400">
									Comece a escrever com texto sem formatação.
								</span>
							</div>
						</button>
						<button
							className="flex min-w-[280px] items-center gap-2 rounded p-1 hover:bg-zinc-700"
							onClick={() =>
								editor.chain().focus().toggleHeading({ level: 1 }).run()
							}
						>
							<Image
								src="/img/heading1.png"
								alt="Heading 1"
								width={48}
								height={48}
								className=" w-12 rounded border border-zinc-700"
							/>
							<div className="flex flex-col text-left">
								<span className="text-sm">Título 1</span>
								<span className="text-xs text-zinc-400">
									Título de seção grande.
								</span>
							</div>
						</button>
						<button
							className="flex min-w-[280px] items-center gap-2 rounded p-1 hover:bg-zinc-700"
							onClick={() =>
								editor.chain().focus().toggleHeading({ level: 2 }).run()
							}
						>
							<Image
								src="/img/heading1.png"
								alt="Heading 2"
								width={48}
								height={48}
								className=" w-12 rounded border border-zinc-700"
							/>
							<div className="flex flex-col text-left">
								<span className="text-sm">Título 2</span>
								<span className="text-xs text-zinc-400">
									Título de seção médio.
								</span>
							</div>
						</button>
						<button
							className="flex min-w-[280px] items-center gap-2 rounded p-1 hover:bg-zinc-700"
							onClick={() =>
								editor.chain().focus().toggleHeading({ level: 3 }).run()
							}
						>
							<Image
								src="/img/heading1.png"
								alt="Heading 3"
								width={48}
								height={48}
								className=" w-12 rounded border border-zinc-700"
							/>
							<div className="flex flex-col text-left">
								<span className="text-sm">Título 3</span>
								<span className="text-xs text-zinc-400">
									Título de seção pequeno.
								</span>
							</div>
						</button>
						<button
							className="flex min-w-[280px] items-center gap-2 rounded p-1 hover:bg-zinc-700"
							onClick={() => editor.chain().focus().toggleBulletList().run()}
						>
							<Image
								src="/img/bulleted-list.png"
								alt="Heading 2"
								width={48}
								height={48}
								className=" w-12 rounded border border-zinc-700"
							/>
							<div className="flex flex-col text-left">
								<span className="text-sm">Lista com marcadores</span>
								<span className="text-xs text-zinc-400">
									Crie uma lista com marcadores simples.
								</span>
							</div>
						</button>
						<button
							className="flex min-w-[280px] items-center gap-2 rounded p-1 hover:bg-zinc-700"
							onClick={() => editor.chain().focus().toggleOrderedList().run()}
						>
							<Image
								src="/img/numbered-list.png"
								alt="Heading 2"
								width={48}
								height={48}
								className=" w-12 rounded border border-zinc-700"
							/>
							<div className="flex flex-col text-left">
								<span className="text-sm">Lista numerada</span>
								<span className="text-xs text-zinc-400">
									Crie uma lista com numeração.
								</span>
							</div>
						</button>
						<button
							className="flex min-w-[280px] items-center gap-2 rounded p-1 hover:bg-zinc-700"
							onClick={addImage}
						>
							<Image
								src="/img/image.png"
								alt="Heading 2"
								width={48}
								height={48}
								className=" w-12 rounded border border-zinc-700"
							/>
							<div className="flex flex-col text-left">
								<span className="text-sm">Imagem</span>
								<span className="text-xs text-zinc-400">
									Carregar ou integrar com um link.
								</span>
							</div>
						</button>
					</ScrollArea>
				</FloatingMenu>
			)}
			{editor && (
				<BubbleMenu
					className="flex divide-x divide-zinc-700 overflow-hidden rounded-lg border-zinc-600 bg-zinc-800 shadow-black/20 shadow-xl"
					editor={editor}
				>
					<div className="flex items-center">
						<BubbleButton
							onClick={() => editor.chain().focus().setTextAlign('left').run()}
							data-active={editor.isActive({ textAlign: 'left' })}
						>
							<RxTextAlignLeft className="h-4 w-4" />
						</BubbleButton>
						<BubbleButton
							onClick={() =>
								editor.chain().focus().setTextAlign('center').run()
							}
							data-active={editor.isActive({ textAlign: 'center' })}
						>
							<RxTextAlignCenter className="h-4 w-4" />
						</BubbleButton>
						<BubbleButton
							onClick={() => editor.chain().focus().setTextAlign('right').run()}
							data-active={editor.isActive({ textAlign: 'right' })}
						>
							<RxTextAlignRight className="h-4 w-4" />
						</BubbleButton>
						<BubbleButton
							onClick={() =>
								editor.chain().focus().setTextAlign('justify').run()
							}
							data-active={editor.isActive({ textAlign: 'justify' })}
						>
							<RxTextAlignJustify className="h-4 w-4" />
						</BubbleButton>
					</div>
					<div className="flex items-center">
						<BubbleButton
							onClick={() => editor.chain().focus().toggleBold().run()}
							data-active={editor.isActive('bold')}
						>
							<RxFontBold className="h-4 w-4" />
						</BubbleButton>
						<BubbleButton
							onClick={() => editor.chain().focus().toggleItalic().run()}
							data-active={editor.isActive('italic')}
						>
							<RxFontItalic className="h-4 w-4" />
						</BubbleButton>
						<BubbleButton
							onClick={() => editor.chain().focus().toggleUnderline().run()}
							data-active={editor.isActive('underline')}
						>
							<RxUnderline className="h-4 w-4" />
						</BubbleButton>
						<BubbleButton
							onClick={() => editor.chain().focus().toggleStrike().run()}
							data-active={editor.isActive('strike')}
						>
							<RxStrikethrough className="h-4 w-4" />
						</BubbleButton>
						<BubbleButton
							onClick={setLink}
							data-active={editor.isActive('link')}
						>
							{editor.isActive('link') ? (
								<RxLinkBreak1 className="h-4 w-4" />
							) : (
								<RxLink1 className="h-4 w-4" />
							)}
						</BubbleButton>
					</div>
				</BubbleMenu>
			)}
		</>
	)
}

export default Tiptap
