import Header from "./header.tsx"
import Playlist from "./playlist.tsx"
import Player from "./player.tsx"
import "./index.scss"

function Uppgift34() {
	return (
		<article id="uppgift34">
			<div id="background2"></div>
			<div id="background1"></div>

			<div id="player">
				<Header playlistName="???" />
				<Playlist />
				<Player />
			</div>
		</article>
	)
}

export default Uppgift34
