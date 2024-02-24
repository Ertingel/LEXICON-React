import { Playlist } from "./songs"
import "./header.scss"

function Header({ playlist }: { playlist: Playlist }) {
	return (
		<header className="header">
			<button className="material-icons active">arrow_back_ios</button>
			<p id="playlist-title">Playlist - {playlist.title}</p>
			<button className="material-icons active">more_vert</button>
		</header>
	)
}

export default Header
