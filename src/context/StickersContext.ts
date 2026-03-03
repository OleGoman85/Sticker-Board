import { createContext } from "react";
import type { Sticker } from "../types/sticker";

export type StickersFilter = 'all' | 'favorites'

export type StickersContextValue = {
	//STATE
	stickers: Sticker[]
	selectedId: number | null
	filter: StickersFilter
	search: string

	//DERIVED
	visibleStickers: Sticker[]
	selectedSticker: Sticker | null

	//ACTIONS
	selectSticker: (id: number | null)=> void
	setFilter: (value: StickersFilter)=> void
	setSearch: (value: string)=>void

	resetStickers: ()=> void
	addStickerFromPool: ()=>void
	deleteSticker: (id: number)=>void
	toggleFavorite: (id: number)=> void
	updateTitle: (id: number, title:string)=> void
}

export const StickersContext = createContext<StickersContextValue | null>(null)

