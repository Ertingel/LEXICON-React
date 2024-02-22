import { playlists } from "./songs"
import "./header.scss"

function Header({ playlistID }: { playlistID: number }) {
	return (
		<header className="header">
			<button className="material-icons active">arrow_back_ios</button>
			<p id="playlist-title">Playlist - {playlists[playlistID].title}</p>
			<button className="material-icons active">more_vert</button>
		</header>
	)
}

export default Header
