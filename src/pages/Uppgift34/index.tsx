import { useEffect, useRef, useReducer } from "react"
import { songs, playlists } from "./songs"

import Header from "./header.tsx"
import Playlist from "./playlist.tsx"
import Player from "./player.tsx"
import "./index.scss"

import { playerReducer, PlayerState } from "./playerReducer.ts"

function Uppgift34() {
	const init: PlayerState = {
		playlistID: 0,
		playlist: playlists[0],

		songIndex: 0,
		song: songs[playlists[0].songs[0]],

		playing: false,
		repeat: false,
		shuffle: false,
		favourite: false,
	}

	const [player, playerDispatch] = useReducer(playerReducer, init)

	const background2Ref = useRef<HTMLDivElement>(null)
	const background1Ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (background1Ref.current) {
			if (background2Ref.current)
				background2Ref.current.style.setProperty(
					"background-image",
					background1Ref.current.style.getPropertyValue(
						"background-image"
					)
				)

			background1Ref.current.style.setProperty(
				"background-image",
				`url("/LEXICON-React/Uppgift34/${player.song.cover_file}")`
			)

			background1Ref.current.animate(
				[{ opacity: "0" }, { opacity: "1" }],
				{ duration: 1000 }
			)
		}
	}, [player.song.cover_file])

	return (
		<article id="uppgift34">
			<div id="background2" ref={background2Ref}></div>
			<div id="background1" ref={background1Ref}></div>

			<div id="player">
				<Header playlist={player.playlist} />
				<Playlist player={player} playerDispatch={playerDispatch} />
				<Player player={player} playerDispatch={playerDispatch} />
			</div>
		</article>
	)
}

export default Uppgift34
