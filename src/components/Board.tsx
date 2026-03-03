import useStickers from '../context/useStickers'
import StickerCard from './StickerCard'

function Board() {
	const { visibleStickers } = useStickers()

	if (visibleStickers.length === 0) {
		return (
			<div className="
					bg-white
					border
					rounded-xl
					p-10
					text-center
					text-slate-500">
				Nothing here. Add a sticker or change filters.
			</div>
		)
	}

	return (
		<div className="
				grid
				gap-4
				sm:grid-cols-2
				lg:grid-cols-3
				xl:grid-cols-4">
			{visibleStickers.map((s) => (
				<StickerCard key={s.id} sticker={s} />
			))}
		</div>
	)
}

export default Board
