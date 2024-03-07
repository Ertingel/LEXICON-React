import { useState, useRef } from "react"
import "./Audio.scss"

function timeToStr(time: number) {
	if (time === Infinity) return "???"

	return `${Math.floor((time / 60) % 60)}:${String(
		Math.floor(time % 60)
	).padStart(2, "0")}`
}

function Audio({ live, download }: { live: string; download?: string }) {
	const audioRef = useRef<HTMLAudioElement>(null)

	const [length, setLength] = useState(0)
	const [at, setAt] = useState(0)

	const [muted, setMuted] = useState(false)
	const [volume, setVolume] = useState(0)

	if (!live) return <></>

	return (
		<section className="audio">
			<audio
				//controls
				ref={audioRef}
				onLoadedMetadata={() => {
					if (audioRef.current) {
						setAt(audioRef.current.currentTime)
						setLength(audioRef.current.duration)
						setMuted(audioRef.current.muted)
						setVolume(audioRef.current.volume)
					}
				}}
				onTimeUpdate={() => {
					if (audioRef.current) {
						setAt(audioRef.current.currentTime)
						setLength(audioRef.current.duration)
					}
				}}
				onVolumeChange={() => {
					if (audioRef.current) {
						setMuted(audioRef.current.muted)
						setVolume(audioRef.current.volume)
					}
				}}
			>
				<source src={live} type="audio/mp3" />
			</audio>

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
					if (audioRef.current) {
						audioRef.current.muted = !audioRef.current.muted

						if (!muted && audioRef.current.volume <= 0.001)
							audioRef.current.volume = 0.5
					}
				}}
			>
				{muted || volume <= 0 ? "volume_off" : "volume_up"}
			</button>

			<input
				type="range"
				className="volume"
				min={0}
				max={1}
				step={0.05}
				value={muted ? 0 : volume}
				onChange={e => {
					if (audioRef.current) {
						audioRef.current.volume = Number(e.target.value)

						if (muted && audioRef.current.volume > 0)
							audioRef.current.muted = false
					}
				}}
			/>

			{download ? (
				<a
					className="download material-symbols-rounded"
					href={download}
				>
					download_for_offline
				</a>
			) : undefined}
		</section>
	)
}

export default Audio
