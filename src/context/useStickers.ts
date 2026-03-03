import { useContext } from "react";
import { StickersContext, type StickersContextValue } from './StickersContext'

function useStickers():StickersContextValue {
	const ctx = useContext(StickersContext)
	if(!ctx)
		throw new Error('useStickers must be used inside <StickersProvider />')
	return ctx
}

export default useStickers

