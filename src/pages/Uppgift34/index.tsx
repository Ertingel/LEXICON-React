import { songs, playlists } from "./songs"
import { useState, useEffect } from "react"
import Header from "./header.tsx"
import Playlist from "./playlist.tsx"
import Player from "./player.tsx"
import "./index.scss"

function Uppgift34() {
	const [playlistID] = useState(0)
	const [isPlaying, setIsPlaying] = useState(false)
	const [songIndex, setSongIndex] = useState(0)

	const [playlistLength, setPlaylistLength] = useState(0)
	const [songID, setSongID] = useState(0)

	useEffect(() => {
		setPlaylistLength(playlists[playlistID].songs.length)
		setSongID(songs[playlists[playlistID].songs[songIndex]].id)
	}, [playlistID, songIndex])

	const selectSong = (index: number) => {
		if (index == songIndex) setIsPlaying(!isPlaying)
		else {
			setSongIndex(index)
			setIsPlaying(true)
		}
	}

	return (
		<article id="uppgift34">
			<div id="background2"></div>
			<div id="background1"></div>

			<div id="player">
				<Header playlistID={playlistID} />
				<Playlist
					playlistID={playlistID}
					songID={songID}
					isPlaying={isPlaying}
					onSelect={selectSong}
				/>
				<Player
					songID={songID}
					isPlaying={isPlaying}
					onPrevius={shuffle => {
						if (songIndex > 0) setSongIndex(songIndex - 1)
						setIsPlaying(true)
					}}
					onNext={shuffle => {
						if (songIndex < playlistLength - 1)
							setSongIndex(songIndex + 1)
						else setSongIndex(0)

						setIsPlaying(true)
					}}
					onPlayPause={playing => {
						setIsPlaying(playing)
					}}
				/>
			</div>
		</article>
	)
}

export default Uppgift34
