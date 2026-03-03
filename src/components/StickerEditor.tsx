import { useState } from 'react'
import useStickers from '../context/useStickers'

function StickerEditor() {
	const { selectedSticker, updateTitle } = useStickers()

	const [draft, setDraft] = useState<string | null>(null)

	if (!selectedSticker) {
		return (
			<div className="bg-white 
					border 
					rounded-xl 
					p-4 
					text-slate-500">
				Select a sticker to edit its title.
			</div>
		)
	}

	const currentTitle = draft ?? selectedSticker.title

	return (
		<div className="
				bg-white 
				border 
				rounded-xl 
				p-4 s
				pace-y-3">
			<div className="font-semibold">Editor</div>

			<input value={currentTitle}
				onChange={(e) => setDraft(e.target.value)}
				onBlur={() => {
					updateTitle(selectedSticker.id, currentTitle)
					setDraft(null)
				}}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						updateTitle(selectedSticker.id, currentTitle)
						setDraft(null)
					}
					if (e.key === 'Escape') {
						setDraft(null)
					}
				}}
				className="w-full 
					border 
					rounded-md 
					px-3 py-2"/>
		</div>
	)
}

export default StickerEditor