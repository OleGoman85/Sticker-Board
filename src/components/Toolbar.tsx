import useStickers from "../context/useStickers"

function Toolbar() {
	const { filter, setFilter, search, setSearch, addStickerFromPool, resetStickers } =
		useStickers()

	return (
		<div className="
				bg-white
				border
				rounded-xl
				p-4
				flex
				flex-col
				gap-3
				md:flex-row
				md:items-center
				md:justify-between">
			<div className="
					flex
					gap-2
					items-center">
				<button
					type="button"
					onClick={addStickerFromPool}
					className="
						px-4
						py-2
						rounded-md
						bg-slate-900
						text-white
						hover:bg-green-600">
					Add sticker
				</button>

				<div className="flex gap-2">
					<button type="button"
						onClick={() => setFilter('all')}
						className={`
							px-3
							py-2
							rounded-md
							border
							transition
							${filter === 'all'
								? 'bg-slate-900 text-white border-slate-900'
								: 'bg-white hover:bg-slate-100'}`
						}>
						All
					</button>

					<button type="button"
						onClick={() => setFilter('favorites')}
						className={`
							px-3
							py-2
							rounded-md
							border
							transition
							${filter === 'favorites'
								? 'bg-yellow-400 border-yellow-400'
								: 'bg-white hover:bg-slate-100'}
						`}>
						Favorites
					</button>
				</div>
			</div>
			<div className="flex
							gap-2">
			<button type="button"
			onClick={resetStickers}
					className=" px-4 py-2
					rounded-md
					bg-slate-900
					text-white
					hover:bg-red-600">
				Reset
			</button>
			<input value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder="Search by title..."
				className=" w-full
					md:w-72
					border
					rounded-md
					px-3
					py-2"/>
			</div>
		</div>
	)
}

export default Toolbar
