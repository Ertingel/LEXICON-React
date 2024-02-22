import { useState, useEffect, useRef } from "react"
import { songs } from "./songs"
import "./player.scss"

function timeToStr(time: number) {
	return `${Math.floor((time / 60) % 60)}:${String(
		Math.floor(time % 60)
	).padStart(2, "0")}`
}

function Player({ songID }: { songID: number }) {
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

	const [isPlaying, setIsPlaying] = useState(false)
	useEffect(() => {
		if (audioRef.current) {
			if (isPlaying) audioRef.current.play()
			else audioRef.current.pause()
		}
	}, [isPlaying])

	return (
		<main className="player">
			<img
				id="album-cover"
				src={`./src/pages/Uppgift34/media/${playing.cover_file}`}
			/>

			<button id="add" className="material-icons active">
				add_circle_outline
			</button>
			<p id="title">
				{playing.artist}
				<br />
				<small>{playing.song}</small>
			</p>
			<button id="favorite" className="material-icons">
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

			<button id="repeat" className="material-icons">
				repeat
			</button>

			<button id="rewind" className="material-icons active fast-rewind">
				fast_rewind
			</button>
			<button
				id="play-pause"
				className="material-icons active play-circle"
				onClick={() => {
					setIsPlaying(!isPlaying)
				}}
			>
				{isPlaying ? "pause_circle" : "play_circle"}
			</button>
			<button id="forward" className="material-icons active fast-forward">
				fast_forward
			</button>

			<button id="shuffle" className="material-icons">
				shuffle
			</button>

			<audio
				ref={audioRef}
				id="audio"
				src={`./src/pages/Uppgift34/media/${playing.audio_file}`}
				onLoadedMetadata={() => {
					if (audioRef.current) {
						setSongLength(audioRef.current.duration)
						setIsPlaying(!audioRef.current.paused)
					}
				}}
				onTimeUpdate={() => {
					if (audioRef.current)
						setPlayProgress(audioRef.current.currentTime)
				}}
			></audio>
		</main>
	)
}

export default Player
