interface Song {
	id: number
	artist: string
	song: string
	audio_file: string
	cover_file: string
}

const songs: Record<number, Song> = {
	0: {
		id: 0,
		artist: "Modern Pitch",
		song: "Boys, Girls, Toys & Words",
		audio_file: "Boys,_Girls,_Toys_&_Words_-_Modern_Pitch.mp3",
		cover_file: "Boys,_Girls,_Toys_&_Words_-_Modern_Pitch.jpg",
	},
	1: {
		id: 1,
		artist: "Scream Inc",
		song: "Higher And Higher",
		audio_file: "Higher_And_Higher_-_Scream_Inc.mp3",
		cover_file: "Higher_And_Higher_-_Scream_Inc.jpg",
	},
	2: {
		id: 2,
		artist: "All My Friends Hate Me",
		song: "Not My Problem",
		audio_file: "Not_My_Problem_-_All_My_Friends_Hate_Me.mp3",
		cover_file: "Not_My_Problem_-_All_My_Friends_Hate_Me.jpg",
	},
	3: {
		id: 3,
		artist: "Hot Fiction",
		song: "Old News",
		audio_file: "Old_News_-_Hot_Fiction.mp3",
		cover_file: "Old_News_-_Hot_Fiction.jpg",
	},
	4: {
		id: 4,
		artist: "Kinematic",
		song: "Peyote",
		audio_file: "Peyote_-_Kinematic.mp3",
		cover_file: "Peyote_-_Kinematic.jpg",
	},
	5: {
		id: 5,
		artist: "VITNE",
		song: "Say Goodbye",
		audio_file: "Say_Goodbye_-_VITNE.mp3",
		cover_file: "Say_Goodbye_-_VITNE.jpg",
	},
}

interface Playlist {
	id: number
	title: string
	songs: number[]
}

const playlists: Record<number, Playlist> = {
	0: {
		id: 0,
		title: "Rock",
		songs: [0, 1, 2, 3, 4, 5],
	},
}

const favorites = new Set<number>([1, 2])

export type { Song, Playlist }
export { songs, playlists, favorites }
