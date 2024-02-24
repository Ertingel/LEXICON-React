import { songs, playlists, favorites, Playlist, Song } from "./songs"

enum PlayerEnum {
	TOGGLE_PLAYING = "TOGGLE_PLAYING",
	PLAYING = "PLAYING",
	PREVIOUS = "PREVIOUS",
	NEXT = "NEXT",
	SONG_INDEX = "SONG_INDEX",
	TOGGLE_REPEAT = "TOGGLE_REPEAT",
	TOGGLE_SHUFFLE = "TOGGLE_SHUFFLE",
	TOGGLE_FAVOURITE = "TOGGLE_FAVOURITE",
	REPEAT = "REPEAT",
	SHUFFLE = "SHUFFLE",
	FAVOURITE = "FAVOURITE",
	PLAYLIST_ID = "PLAYLIST_ID",
}
interface PlayerAction {
	type: PlayerEnum
	id?: number
	index?: number
	state?: boolean
}

interface PlayerState {
	playlistID: number
	playlist: Playlist

	songIndex: number
	song: Song

	playing: boolean
	repeat: boolean
	shuffle: boolean
	favourite: boolean

	shuffleList?: number[]
}

function clamp(a: number, min: number, max: number) {
	return Math.max(min, Math.min(max, a))
}

function mod2(a: number, b: number) {
	return ((a % b) + b) % b
}

function shuffleArray<T>(array: Array<T>): Array<T> {
	const array2 = [...array]

	let currentIndex = array2.length,
		randomIndex

	while (currentIndex > 0) {
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex--
		;[array2[currentIndex], array2[randomIndex]] = [
			array2[randomIndex],
			array2[currentIndex],
		]
	}

	return array2
}

function makeShuffledList(state: PlayerState) {
	return shuffleArray([...Array(state.playlist.songs.length).keys()])
}

function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
	console.log(action)

	if (action.type === PlayerEnum.TOGGLE_PLAYING) {
		action.type = PlayerEnum.PLAYING
		action.state = !state.playing
	}

	if (
		action.type === PlayerEnum.PLAYING &&
		typeof action.state !== "undefined"
	)
		return { ...state, playing: action.state }

	if (action.type === PlayerEnum.NEXT) {
		action.type = PlayerEnum.SONG_INDEX
		action.index = state.songIndex + 1
	} else if (action.type === PlayerEnum.PREVIOUS) {
		action.type = PlayerEnum.SONG_INDEX
		action.index = state.songIndex - 1
	}

	if (
		action.type === PlayerEnum.SONG_INDEX &&
		typeof action.index !== "undefined"
	) {
		const listSize = state.playlist.songs.length
		const songIndex = state.repeat
			? mod2(action.index, listSize)
			: clamp(action.index, 0, listSize - 1)

		const shuffleList =
			action.index < 0 ||
			action.index >= listSize ||
			typeof state.shuffleList === "undefined"
				? makeShuffledList(state)
				: state.shuffleList

		const song = state.shuffle
			? songs[state.playlist.songs[shuffleList[songIndex]]]
			: songs[state.playlist.songs[songIndex]]

		return {
			...state,
			songIndex,
			song,

			favourite: favorites.has(song.id),
			shuffleList,
		}
	}

	if (action.type === PlayerEnum.TOGGLE_REPEAT) {
		action.type = PlayerEnum.REPEAT
		action.state = !state.repeat
	} else if (action.type === PlayerEnum.TOGGLE_SHUFFLE) {
		action.type = PlayerEnum.SHUFFLE
		action.state = !state.shuffle
	} else if (action.type === PlayerEnum.TOGGLE_FAVOURITE) {
		action.type = PlayerEnum.FAVOURITE
		action.state = !state.favourite
	}

	if (
		action.type === PlayerEnum.REPEAT &&
		typeof action.state !== "undefined"
	)
		return { ...state, repeat: action.state }

	if (
		action.type === PlayerEnum.SHUFFLE &&
		typeof action.state !== "undefined"
	)
		return {
			...state,
			shuffle: action.state,
			shuffleList: action.state
				? makeShuffledList(state)
				: state.shuffleList,
		}

	if (
		action.type === PlayerEnum.FAVOURITE &&
		typeof action.state !== "undefined"
	) {
		if (action.state) favorites.add(state.song.id)
		else favorites.delete(state.song.id)

		return { ...state, favourite: action.state }
	}

	if (
		action.type === PlayerEnum.PLAYLIST_ID &&
		typeof action.id !== "undefined"
	) {
		const playlist = playlists[action.id]
		const song = songs[playlist.songs[0]]

		return {
			...state,

			playlistID: action.id,
			playlist,

			songIndex: 0,
			song,

			favourite: favorites.has(song.id),
		}
	}

	throw Error(`Unknown action. \n${JSON.stringify(action, null, 2)}`)
}

export type { PlayerAction, PlayerState }
export default playerReducer
export { playerReducer, PlayerEnum }
