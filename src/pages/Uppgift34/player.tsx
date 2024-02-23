import { useState, useEffect, useRef } from "react"
import { songs, favorites } from "./songs"
/*
import { useState, useEffect, useRef, useReducer } from "react"
import { songs, playlists, favorites, IPlaylist, ISong } from "./songs"
*/
import "./player.scss"

function timeToStr(time: number) {
	return `${Math.floor((time / 60) % 60)}:${String(
		Math.floor(time % 60)
	).padStart(2, "0")}`
}
/*
enum IPlayerEnum {
	PREVIOUS = "PREVIOUS",
	NEXT = "NEXT",
	SONG_INDEX = "SONG_INDEX",
	TOGGLE_REPEAT = "TOGGLE_REPEAT",
	TOGGLE_SHUFFLE = "TOGGLE_SHUFFLE",
	REPEAT = "REPEAT",
	SHUFFLE = "SHUFFLE",
	PLAYLIST_ID = "PLAYLIST_ID",
}
interface IPlayerAction {
	type: IPlayerEnum
	id: number | never
	index: number | never
	state: boolean | never
}

interface IPlayerState {
	playlistID: number
	playlist: IPlaylist

	songIndex: number
	song: ISong

	repeat: boolean
	shuffle: boolean
}

function playerReducer(
	state: IPlayerState,
	action: IPlayerAction
): IPlayerState {
	if (action.type === IPlayerEnum.NEXT) {
		action.type = IPlayerEnum.SONG_INDEX
		action.index = action.index++
	} else if (action.type === IPlayerEnum.PREVIOUS) {
		action.type = IPlayerEnum.SONG_INDEX
		action.index = action.index--
	}

	if (action.type === IPlayerEnum.SONG_INDEX) 
		return {
			...state,

			songIndex: action.index,
			song: songs[playlists[state.playlistID].songs[action.index]],
		}
	
	if (action.type === IPlayerEnum.TOGGLE_REPEAT) {
		action.type = IPlayerEnum.REPEAT
		action.state = !state.repeat
	} else if (action.type === IPlayerEnum.TOGGLE_SHUFFLE) {
		action.type = IPlayerEnum.SHUFFLE
		action.state = !state.shuffle
	}

	if (action.type === IPlayerEnum.REPEAT) 
		return { ...state, repeat: action.state }

	if (action.type === IPlayerEnum.SHUFFLE)
		return { ...state, shuffle: action.state }
	
	if (action.type === IPlayerEnum.PLAYLIST_ID)
		return {
			...state,

			playlistID: action.id,
			playlist: playlists[action.id],

			songIndex: 0,
			song: songs[playlists[action.id].songs[0]],
		}
	

	throw Error("Unknown action.")
}

function Player2() {
	const init: IPlayerState = {
		playlistID: 0,
		playlist: playlists[0],

		songIndex: 0,
		song: songs[playlists[0].songs[0]],

		repeat: false,
		shuffle: false,
	}

	const [player, playerDispatch] = useReducer(playerReducer, init)

	return <main className="player"></main>
}
*/
function Player({
	songID,
	isPlaying,
	onPrevius,
	onNext,
	onPlayPause,
}: {
	songID: number
	isPlaying: boolean
	onPrevius: (repeat: boolean, shuffle: boolean) => void
	onNext: (repeat: boolean, shuffle: boolean) => void
	onPlayPause: (isPlaying: boolean) => void
}) {
	const playing = songs[songID]

	const audioRef = useRef<HTMLAudioElement>(null)
	const [songLength, setSongLength] = useState(0)
	const [playProgress, setPlayProgress] = useState(0)

	const playProgressRef = useRef<HTMLInputElement>(null)
	useEffect(() => {
		if (playProgressRef.current)
			playProgressRef.current.style.setProperty(
				"--progress",
				`${(playProgress / songLength) * 100}%`
			)
	}, [songLength, playProgress])

	useEffect(() => {
		if (audioRef.current) {
			if (isPlaying) audioRef.current.play()
			else audioRef.current.pause()
		}
	})

	const [repeat, setRepeat] = useState(false)
	const [shuffle, setShuffle] = useState(false)

	return (
		<main className="player">
			<img
				id="album-cover"
				src={`/LEXICON-React/Uppgift34/${playing.cover_file}`}
			/>

			<button id="add" className="material-icons active">
				add_circle_outline
			</button>
			<p id="title">
				{playing.artist}
				<br />
				<small>{playing.song}</small>
			</p>
			<button
				id="favorite"
				className={`material-icons ${
					favorites.has(songID) ? "active" : ""
				}`}
				onClick={e => {
					if (e.target instanceof HTMLElement)
						if (favorites.has(songID)) {
							e.target.classList.remove("active")
							favorites.delete(songID)
						} else {
							e.target.classList.add("active")
							favorites.add(songID)
						}
				}}
			>
				favorite
			</button>

			<p id="play-time">{timeToStr(playProgress)}</p>
			<input
				ref={playProgressRef}
				id="play-progress"
				type="range"
				value={playProgress}
				min="0"
				max={songLength}
				onChange={e => {
					if (audioRef.current)
						audioRef.current.currentTime = +e.target.value
				}}
			/>
			<p id="length">{timeToStr(songLength)}</p>

			<button
				id="repeat"
				className={`material-icons ${repeat ? "active" : ""}`}
				onClick={() => {
					setRepeat(!repeat)
				}}
			>
				repeat
			</button>

			<button
				id="rewind"
				className="material-icons active fast-rewind"
				onClick={() => {
					if (playProgress < 1) onPrevius(repeat, shuffle)
					else if (audioRef.current) audioRef.current.currentTime = 0
				}}
			>
				fast_rewind
			</button>
			<button
				id="play-pause"
				className="material-icons active play-circle"
				onClick={() => {
					onPlayPause(!isPlaying)
				}}
			>
				{isPlaying ? "pause_circle" : "play_circle"}
			</button>
			<button
				id="forward"
				className="material-icons active fast-forward"
				onClick={() => {
					onNext(repeat, shuffle)
				}}
			>
				fast_forward
			</button>

			<button
				id="shuffle"
				className={`material-icons ${shuffle ? "active" : ""}`}
				onClick={() => {
					setShuffle(!shuffle)
				}}
			>
				shuffle
			</button>

			<audio
				ref={audioRef}
				id="audio"
				src={`/LEXICON-React/Uppgift34/${playing.audio_file}`}
				onLoadedMetadata={() => {
					if (audioRef.current) {
						setSongLength(audioRef.current.duration)
					}
				}}
				onTimeUpdate={() => {
					if (audioRef.current)
						setPlayProgress(audioRef.current.currentTime)
				}}
				onEnded={() => {
					onNext(repeat, shuffle)
				}}
			></audio>
		</main>
	)
}

export default Player
export { Player }
