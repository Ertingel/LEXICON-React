import { useState } from "react"
import Header from "./header.tsx"
import Playlist from "./playlist.tsx"
import Player from "./player.tsx"
import "./index.scss"

function Uppgift34() {
	const [playlistID] = useState(0)
	const [songID, setSongID] = useState(0)

	const selectSong = (id: number) => setSongID(id)

	return (
		<article id="uppgift34">
			<div id="background2"></div>
			<div id="background1"></div>

			<div id="player">
				<Header playlistID={playlistID} />
				<Playlist
					playlistID={playlistID}
					songID={songID}
					onSelect={selectSong}
				/>
				<Player songID={songID} />
			</div>
		</article>
	)
}

export default Uppgift34
