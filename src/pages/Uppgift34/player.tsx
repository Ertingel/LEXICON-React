import { useState, useRef } from "react"
import { songs } from "./songs"
import "./player.scss"

function timeToStr(time: number) {
	return `${Math.floor((time / 60) % 60)}:${String(
		Math.floor(time % 60)
	).padStart(2, "0")}`
}

function Player({ songID }: { songID: number }) {
	const playing = songs[songID]

	const [songLength, setSongLength] = useState(0)

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

			<p id="play-time">{timeToStr(0)}</p>
			<input
				id="play-progress"
				type="range"
				defaultValue="0"
				min="0"
				max={songLength}
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
			>
				play_circle
			</button>
			<button id="forward" className="material-icons active fast-forward">
				fast_forward
			</button>

			<button id="shuffle" className="material-icons">
				shuffle
			</button>

			<audio
				id="audio"
				src={`./src/pages/Uppgift34/media/${playing.audio_file}`}
				onLoadedMetadata={e => {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					if (e.target.duration) setSongLength(e.target.duration)
				}}
			></audio>
		</main>
	)
}

export default Player
