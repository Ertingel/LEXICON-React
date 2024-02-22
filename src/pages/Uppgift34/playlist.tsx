import { songs, playlists } from "./songs"
import "./playlist.scss"

function Playlist() {
	const curentPlaylist = playlists[0]

	return (
		<aside className="playlist">
			<ol id="playlist">
				{curentPlaylist.songs.map(songID => {
					const song = songs[songID]

					return (
						<li key={songID}>
							<button>
								<img
									src={`./src/pages/Uppgift34/media/${song.cover_file}`}
								/>
								<p>
									{song.artist}
									<br />
									<small>{song.song}</small>`
								</p>
								<div className="material-icons">
									play_circle
								</div>
							</button>
						</li>
					)
				})}
			</ol>
		</aside>
	)
}

export default Playlist
