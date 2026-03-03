import Toolbar from './components/Toolbar'
import Board from './components/Board'
import StickerEditor from './components/StickerEditor'

function App() {
	return (
		<main className="
				min-h-screen
				bg-slate-100
				p-6">
			<div className="
					max-w-6xl
					mx-auto
					space-y-4">
				<h1 className="
						text-3xl
						font-bold
						text-center">
					Sticker Board
				</h1>

				<Toolbar />

				<div className="
						grid
						gap-4
						lg:grid-cols-4">
					<div className="lg:col-span-3">
						<Board />
					</div>

					<div className="lg:col-span-1">
						<StickerEditor />
					</div>
				</div>
			</div>
		</main>
	)
}

export default App