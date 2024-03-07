import { useState, useRef, useEffect } from "react"
import "./Audio.scss"

function timeToStr(time: number) {
	return `${Math.floor((time / 60) % 60)}:${String(
		Math.floor(time % 60)
	).padStart(2, "0")}`
}

function Audio({ src }: { src: string }) {
	const audioRef = useRef<HTMLAudioElement>(null)

	const [playing, setPlaying] = useState(false)
	const [length, setLength] = useState(0)
	const [at, setAt] = useState(0)

	const [mute, setMute] = useState(false)
	const [volume, setVolume] = useState(1)

	useEffect(() => {
		if (audioRef.current) {
			if (playing) audioRef.current.play()
			else audioRef.current.pause()
		}
	}, [audioRef, playing])

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = mute ? 0 : volume
		}
	}, [mute, volume])

	return (
		<section className="audio">
			<button
				className="play-button material-symbols-rounded"
				onClick={() => {
					if (audioRef.current) {
						if (audioRef.current.paused) audioRef.current.play()
						else audioRef.current.pause()
					}
				}}
			>
				{!audioRef.current?.paused ? "play_circle" : "pause_circle"}
			</button>

			<input
				type="range"
				className="progress"
				min={0}
				max={length}
				value={at}
				onChange={e => {
					if (audioRef.current)
						audioRef.current.currentTime = Number(e.target.value)
				}}
			/>
			<p className="timestamp">
				{timeToStr(at) + " / " + timeToStr(length)}
			</p>

			<button
				className="mute-button material-symbols-rounded"
				onClick={() => {
					setMute(!mute)
				}}
			>
				{mute ? "volume_off" : "volume_up"}
			</button>

			<input
				type="range"
				className="volume"
				min={0}
				max={1}
				step={0.05}
				value={mute ? 0 : volume}
				onChange={e => {
					setVolume(Number(e.target.value))
				}}
			/>

			<audio
				controls
				ref={audioRef}
				onLoadedMetadata={() => {
					if (audioRef.current) setLength(audioRef.current.duration)
				}}
				onTimeUpdate={() => {
					if (audioRef.current) {
						setAt(audioRef.current.currentTime)
						setLength(audioRef.current.duration)
					}
				}}
			>
				<source src={src} type="audio/mp3" />
			</audio>
		</section>
	)
}

export default Audio
