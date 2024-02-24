import { Dispatch } from "react"
import { songs } from "./songs"
import { PlayerEnum, PlayerState, PlayerAction } from "./playerReducer.ts"
import "./playlist.scss"

function Playlist({
	player,
	playerDispatch,
}: {
	player: PlayerState
	playerDispatch: Dispatch<PlayerAction>
}) {
	return (
		<aside className="playlist">
			<ol id="playlist">
				{player.playlist.songs.map((songID, index) => {
					const song = songs[songID]

					return (
						<li
							key={song.id}
							className={song === player.song ? "playing" : ""}
						>
							<button
								onClick={() => {
									if (player.songIndex === index)
										playerDispatch({
											type: PlayerEnum.TOGGLE_PLAYING,
										})
									else
										playerDispatch({
											type: PlayerEnum.SONG_INDEX,
											index,
										})
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
									{player.playing && song === player.song
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
