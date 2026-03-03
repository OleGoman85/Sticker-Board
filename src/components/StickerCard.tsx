import { Star, Trash2 } from 'lucide-react'
import type { Sticker } from '../types/sticker'
import useStickers from '../context/useStickers'


type Props = {
	sticker: Sticker
}

function StickerCard({ sticker }: Props) {
	const { selectedId, selectSticker, toggleFavorite, deleteSticker } =
		useStickers()

	const isSelected = selectedId === sticker.id

	return (
    <button
      type="button"
      onClick={() => selectSticker(sticker.id)}
      className={`relative
				w-full
				border
				rounded-xl
				bg-white
				p-3
				transition-all
				duration-300
				ease-in-out
				hover:bg-green-100
				hover:shadow-lg
				hover:-translate-y-3
				${isSelected 
					? 'ring-2 ring-slate-900' 
					: ''}
			`}>
      <img src={sticker.imageSrc}
        alt={sticker.title}
        className="w-full
				h-40
				object-contain
				bg-slate-100
				rounded-lg"/>
      <div className="mt-3
					font-semibold
					whitespace-nowrap
					overflow-hidden
					text-ellipsis"
        title={sticker.title}>
        {sticker.title.trim() 
			? sticker.title 
			: 'Untitled'}
      </div>

      <div className="absolute
					top-2
					right-2
					flex
					gap-2">
        <span role="button"
          tabIndex={0}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            toggleFavorite(sticker.id)
          }}
          onKeyDown={(e) => {
            if (e.key !== 'Enter') return
            e.preventDefault()
            e.stopPropagation()
            toggleFavorite(sticker.id)
          }}
          className="p-2
						rounded-md
						bg-white/80
						hover:bg-white
						border"
          aria-label="toggle favorite">
          <Star
            size={18}
            className={
              sticker.favorite 
			  	? 'fill-yellow-400 text-yellow-400' 
				: ''
            }/>
        </span>

        <span role="button"
          tabIndex={0}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            deleteSticker(sticker.id)
          }}
          onKeyDown={(e) => {
            if (e.key !== 'Enter') return
            e.preventDefault()
            e.stopPropagation()
            deleteSticker(sticker.id)
          }}
          className="p-2
						rounded-md
						bg-white/80
						hover:bg-white
						border"
          aria-label="delete sticker">
          <Trash2 size={18} className="text-slate-700" />
        </span>
      </div>
    </button>
  )
}

export default StickerCard
