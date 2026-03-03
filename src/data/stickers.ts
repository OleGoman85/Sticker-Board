import type { Sticker } from '../types/sticker'

import animal1 from '../assets/animal1.png'
import animal2 from '../assets/animal2.png'
import animal3 from '../assets/animal3.png'
import animal4 from '../assets/animal4.png'
import animal5 from '../assets/animal5.png'
import animal6 from '../assets/animal6.png'
import animal7 from '../assets/animal7.png'
import animal8 from '../assets/animal8.png'
import animal9 from '../assets/animal9.png'
import animal10 from '../assets/animal10.png'

const now = Date.now()

export const initialStickers: Sticker[] = [
	{
		id: now + 1,
		title: 'Animal 1',
		imageSrc: animal1,
		x: 40,
		y: 40,
		favorite: false,
		updatedAt: now,
	},
	{
		id: now + 2,
		title: 'Animal 2',
		imageSrc: animal2,
		x: 240,
		y: 60,
		favorite: true,
		updatedAt: now,
	},
	{
		id: now + 3,
		title: 'Animal 3',
		imageSrc: animal3,
		x: 120,
		y: 220,
		favorite: false,
		updatedAt: now,
	},
	{
		id: now + 4,
		title: 'Animal 4',
		imageSrc: animal4,
		x: 360,
		y: 160,
		favorite: false,
		updatedAt: now,
	},
	{
		id: now + 5,
		title: 'Animal 5',
		imageSrc: animal5,
		x: 520,
		y: 80,
		favorite: false,
		updatedAt: now,
	},
	{
		id: now + 6,
		title: 'Animal 6',
		imageSrc: animal6,
		x: 520,
		y: 260,
		favorite: true,
		updatedAt: now,
	},
	{
		id: now + 7,
		title: 'Animal 7',
		imageSrc: animal7,
		x: 700,
		y: 40,
		favorite: false,
		updatedAt: now,
	},
	{
		id: now + 8,
		title: 'Animal 8',
		imageSrc: animal8,
		x: 700,
		y: 220,
		favorite: false,
		updatedAt: now,
	},
	{
		id: now + 9,
		title: 'Animal 9',
		imageSrc: animal9,
		x: 880,
		y: 60,
		favorite: false,
		updatedAt: now,
	},
	{
		id: now + 10,
		title: 'Animal 10',
		imageSrc: animal10,
		x: 880,
		y: 240,
		favorite: false,
		updatedAt: now,
	},
]
