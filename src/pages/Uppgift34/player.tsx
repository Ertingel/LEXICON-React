import { useState, useEffect, useRef, Dispatch } from "react"
import { PlayerEnum, PlayerState, PlayerAction } from "./playerReducer.ts"

import "./player.scss"

function timeToStr(time: number) {
	return `${Math.floor((time / 60) % 60)}:${String(
		Math.floor(time % 60)
	).padStart(2, "0")}`
}

function Player({
	player,
	playerDispatch,
}: {
	player: PlayerState
	playerDispatch: Dispatch<PlayerAction>
}) {
	const audioRef = useRef<HTMLAudioElement>(null)
	const playProgressRef = useRef<HTMLInputElement>(null)

	const [songLength, setSongLength] = useState(0)
	const [playProgress, setPlayProgress] = useState(0)

	useEffect(() => {
		if (audioRef.current) {
			if (player.playing) audioRef.current.play()
			else audioRef.current.pause()
		}
	}, [audioRef, player])

	useEffect(() => {
		if (playProgressRef.current)
			playProgressRef.current.style.setProperty(
				"--progress",
				`${(playProgress / songLength) * 100}%`
			)
	}, [playProgressRef, songLength, playProgress])

	return (
		<main className="player">
			<img
				id="album-cover"
				src={`/LEXICON-React/Uppgift34/${player.song.cover_file}`}
			/>

			<button id="add" className="material-icons active">
				add_circle_outline
			</button>
			<p id="title">
				{player.song.artist}
				<br />
				<small>{player.song.song}</small>
			</p>
			<button
				id="favorite"
				className={`material-icons ${player.favourite ? "active" : ""}`}
				onClick={() => {
					playerDispatch({ type: PlayerEnum.TOGGLE_FAVOURITE })
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
				className={`material-icons ${player.repeat ? "active" : ""}`}
				onClick={() => {
					playerDispatch({ type: PlayerEnum.TOGGLE_REPEAT })
				}}
			>
				repeat
			</button>

			<button
				id="rewind"
				className="material-icons active fast-rewind"
				onClick={() => {
					if (playProgress < 1) {
						playerDispatch({ type: PlayerEnum.PREVIOUS })
						playerDispatch({
							type: PlayerEnum.PLAYING,
							state: true,
						})
					} else if (audioRef.current)
						audioRef.current.currentTime = 0
				}}
			>
				fast_rewind
			</button>
			<button
				id="play-pause"
				className="material-icons active play-circle"
				onClick={() => {
					playerDispatch({ type: PlayerEnum.TOGGLE_PLAYING })
				}}
			>
				{player.playing ? "pause_circle" : "play_circle"}
			</button>
			<button
				id="forward"
				className="material-icons active fast-forward"
				onClick={() => {
					const listSize = player.playlist.songs.length
					if (player.songIndex < listSize - 1 || player.repeat) {
						playerDispatch({ type: PlayerEnum.NEXT })
						playerDispatch({
							type: PlayerEnum.PLAYING,
							state: true,
						})
					} else {
						if (audioRef.current)
							audioRef.current.currentTime =
								audioRef.current.duration
						playerDispatch({
							type: PlayerEnum.PLAYING,
							state: false,
						})
					}
				}}
			>
				fast_forward
			</button>

			<button
				id="shuffle"
				className={`material-icons ${player.shuffle ? "active" : ""}`}
				onClick={() => {
					playerDispatch({ type: PlayerEnum.TOGGLE_SHUFFLE })
				}}
			>
				shuffle
			</button>

			<audio
				ref={audioRef}
				id="audio"
				src={`/LEXICON-React/Uppgift34/${player.song.audio_file}`}
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
					const listSize = player.playlist.songs.length
					if (player.songIndex < listSize - 1 || player.repeat)
						playerDispatch({ type: PlayerEnum.NEXT })
					else
						playerDispatch({
							type: PlayerEnum.PLAYING,
							state: false,
						})
				}}
			></audio>
		</main>
	)
}

export default Player
export { Player }
