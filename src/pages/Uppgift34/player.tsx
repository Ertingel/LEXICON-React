import { useState, useEffect, useRef } from "react"
import { songs, favorites } from "./songs"

import "./player.scss"

function timeToStr(time: number) {
	return `${Math.floor((time / 60) % 60)}:${String(
		Math.floor(time % 60)
	).padStart(2, "0")}`
}

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
