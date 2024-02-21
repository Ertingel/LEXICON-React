import "./header.scss"

function Header({ playlistName }: { playlistName: string }) {
	return (
		<header className="header">
			<button className="material-icons active">arrow_back_ios</button>
			<p id="playlist-title">Playlist - {playlistName}</p>
			<button className="material-icons active">more_vert</button>
		</header>
	)
}

export default Header
