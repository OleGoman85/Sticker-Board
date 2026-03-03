import { useState, useEffect, useMemo, type ReactNode } from 'react'
import type { Sticker } from '../types/sticker'
import { initialStickers } from '../data/stickers'
import {
	StickersContext,
	type StickersContextValue,
	type StickersFilter,
} from './StickersContext'

type Props = {
	children: ReactNode
}

const STORAGE_KEY = 'sticker-board'

type StorageShape = {
	stickers: Sticker[]
	selectedId: number | null
	filter: StickersFilter
	search: string
}

const defaultState: StorageShape = {
	stickers: initialStickers,
	// Pick a reasonable default selection for the first render.
	// If there are no stickers, nothing can be selected.
	selectedId: initialStickers.length > 0 
		? initialStickers[0].id 
		: null,
	filter: 'all',
	search: '',
}

function StickersProvider({ children }: Props) {
	// Lazy init: read localStorage once on mount.
	// We defensively validate the loaded data because localStorage can contain "garbage".
	// Invariant we enforce here: selectedId must be null OR must exist in stickers.
	const [state, setState] = useState(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY)
			if (!raw) return defaultState

			const parsed = JSON.parse(raw) as Partial<StorageShape>

			const stickers = Array.isArray(parsed.stickers)
				? (parsed.stickers as Sticker[])
				: defaultState.stickers

			const filter: StickersFilter =
				parsed.filter === 'favorites' ? 'favorites' : 'all'

			const search = typeof parsed.search === 'string' ? parsed.search : ''

			const candidateSelectedId =
				typeof parsed.selectedId === 'number' ? parsed.selectedId : null

			const hasCandidate =
				candidateSelectedId !== null
					? stickers.some((s) => s.id === candidateSelectedId)
					: false

			const selectedId =
				stickers.length === 0
					? null
					: hasCandidate
						? candidateSelectedId
						: stickers[0].id

			return { stickers, selectedId, filter, search }
		} catch {
			return defaultState
		}
	})

	// Helper: update exactly one sticker by id (immutable update).
	// Keeps actions like toggleFavorite / updateTitle short and consistent.
	const updateStickerById = (
		id: number,
		updater: (current: Sticker) => Sticker,
	) => {
		setState((prev) => ({
			...prev,
			stickers: prev.stickers.map((s) => (s.id === id ? updater(s) : s)),
		}))
	}

	// Persist state to localStorage whenever it changes (external system sync).
	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
	}, [state])

	// Derived value: the currently selected sticker object (or null).
	const selectedSticker = useMemo(() => {
		if (state.selectedId === null) return null
		return state.stickers.find((s) => s.id === state.selectedId) ?? null
	}, [state.stickers, state.selectedId])

	// Derived value: stickers actually visible in UI (filter + search + ordering).
	const visibleStickers = useMemo(() => {
		const q = state.search.trim().toLowerCase()

		return state.stickers
			.filter((s) => (state.filter === 'favorites' ? s.favorite : true))
			.filter((s) => (q ? s.title.toLowerCase().includes(q) : true))
			.sort((a, b) => b.updatedAt - a.updatedAt)
	}, [state.stickers, state.filter, state.search])

	// Actions: the only place where we change state.
	const selectSticker = (id: number | null) => {
		setState((prev) => {
			// Safety: allow unselect
			if (id === null) return { ...prev, selectedId: null }

			// Safety: do not select an id that doesn't exist
			const exists = prev.stickers.some((s) => s.id === id)
			return exists ? { ...prev, selectedId: id } : prev
		})
	}

	const setFilter = (value: StickersFilter) => {
		setState((prev) => ({ ...prev, filter: value }))
	}

	const setSearch = (value: string) => {
		setState((prev) => ({ ...prev, search: value }))
	}

	// Adds a new sticker using a random image from the initial pool.
	// Also selects the newly created sticker so the user can edit it immediately.
	const addStickerFromPool = () => {
		const pool = initialStickers
		if (pool.length === 0) return

		setState((prev) => {
			const random = pool[Math.floor(Math.random() * pool.length)]
			const now = Date.now()

			const newSticker: Sticker = {
				id: now,
				title: `Sticker ${prev.stickers.length + 1}`,
				imageSrc: random.imageSrc,
				x: 40,
				y: 40,
				favorite: false,
				updatedAt: now,
			}

			return {
				...prev,
				stickers: [newSticker, ...prev.stickers],
				selectedId: newSticker.id,
			}
		})
	}

	// Deletes a sticker and keeps selection valid:
	// - if the deleted sticker was selected, select the first remaining one (or null).
	const deleteSticker = (id: number) => {
		setState((prev) => {
			const nextStickers = prev.stickers.filter((s) => s.id !== id)

			const nextSelectedId = (() => {
				if (nextStickers.length === 0) return null
				if (prev.selectedId !== id) return prev.selectedId
				return nextStickers[0].id
			})()

			return {
				...prev,
				stickers: nextStickers,
				selectedId: nextSelectedId,
			}
		})
	}

	// Toggles the "favorite" flag for a sticker and updates updatedAt for sorting.
	const toggleFavorite = (id: number) => {
		updateStickerById(id, (s) => ({
			...s,
			favorite: !s.favorite,
			updatedAt: Date.now(),
		}))
	}

	// Updates a sticker title and updatedAt (so it becomes "recent" in the UI).
	const updateTitle = (id: number, title: string) => {
		updateStickerById(id, (s) => ({
			...s,
			title,
			updatedAt: Date.now(),
		}))
	}

	const resetStickers=()=>{
		setState(()=>defaultState)
	}

	// The single object exposed to the app via context.
	const value: StickersContextValue = {
		stickers: state.stickers,
		selectedId: state.selectedId,
		filter: state.filter,
		search: state.search,

		visibleStickers,
		selectedSticker,

		selectSticker,
		setFilter,
		setSearch,

		addStickerFromPool,
		deleteSticker,
		toggleFavorite,
		updateTitle,
		resetStickers,
	}

	return (
		<StickersContext.Provider value={value}>
			{children}
		</StickersContext.Provider>
	)
}

export default StickersProvider
