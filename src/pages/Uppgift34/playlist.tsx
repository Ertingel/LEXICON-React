import { songs, playlists } from "./songs"
import "./playlist.scss"

function Playlist({
	playlistID,
	songID,
	isPlaying,
	onSelect,
}: {
	playlistID: number
	songID: number
	isPlaying: boolean
	onSelect: (index: number) => void
}) {
	const curentPlaylist = playlists[playlistID]

	return (
		<aside className="playlist">
			<ol id="playlist">
				{curentPlaylist.songs.map((id, index) => {
					const song = songs[id]

					return (
						<li key={id} className={songID === id ? "playing" : ""}>
							<button
								onClick={() => {
									onSelect(index)
								}}
							>
								<img
									src={`/LEXICON-React/Uppgift34/${song.cover_file}`}
								/>
								<p>
									{song.artist}
									<br />
									<small>{song.song}</small>
								</p>
								<div className="material-icons">
									{isPlaying && songID === id
										? "pause_circle"
										: "play_circle"}
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
