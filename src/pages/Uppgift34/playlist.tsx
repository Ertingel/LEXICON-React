import { songs, playlists } from "./songs"
import "./playlist.scss"

function Playlist({
	playlistID,
	songID,
	onSelect,
}: {
	playlistID: number
	songID: number
	onSelect: (id: number) => void
}) {
	const curentPlaylist = playlists[playlistID]

	return (
		<aside className="playlist">
			<ol id="playlist">
				{curentPlaylist.songs.map(id => {
					const song = songs[id]

					return (
						<li key={id} className={songID === id ? "playing" : ""}>
							<button
								onClick={() => {
									onSelect(id)
								}}
							>
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
