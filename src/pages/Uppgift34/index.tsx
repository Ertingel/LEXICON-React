import { useState, useEffect, useRef } from "react"
import { songs, playlists } from "./songs"

import Header from "./header.tsx"
import Playlist from "./playlist.tsx"
import Player from "./player.tsx"
import "./index.scss"

function shuffleArray<T>(array: Array<T>): Array<T> {
	const array2 = [...array]

	let currentIndex = array2.length,
		randomIndex

	while (currentIndex > 0) {
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex--
		;[array2[currentIndex], array2[randomIndex]] = [
			array2[randomIndex],
			array2[currentIndex],
		]
	}

	return array2
}

function Uppgift34() {
	const [playlistID] = useState(0)
	const [songIndex, setSongIndex] = useState(0)
	const [isPlaying, setIsPlaying] = useState(false)

	const [shuffledList, setShuffledList] = useState<number[] | null>(null)

	const [playlistLength, setPlaylistLength] = useState(0)
	const [songID, setSongID] = useState(0)

	const background2Ref = useRef<HTMLDivElement>(null)
	const background1Ref = useRef<HTMLDivElement>(null)

	const shuffleList = () => {
		setShuffledList(shuffleArray([...Array(playlistLength).keys()]))
		setSongIndex(0)
	}

	useEffect(() => {
		setPlaylistLength(playlists[playlistID].songs.length)
		setSongID(songs[playlists[playlistID].songs[songIndex]].id)
	}, [playlistID, songIndex, songID])

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
				`url("./src/pages/Uppgift34/media/${songs[songID].cover_file}")`
			)

			background1Ref.current.animate(
				[{ opacity: "0" }, { opacity: "1" }],
				{ duration: 1000 }
			)
		}
	}, [songID])

	const selectSong = (index: number) => {
		if (index == songIndex) setIsPlaying(!isPlaying)
		else {
			setSongIndex(index)
			setIsPlaying(true)
		}
	}

	return (
		<article id="uppgift34">
			<div id="background2" ref={background2Ref}></div>
			<div id="background1" ref={background1Ref}></div>

			<div id="player">
				<Header playlistID={playlistID} />
				<Playlist
					playlistID={playlistID}
					songID={songID}
					isPlaying={isPlaying}
					onSelect={selectSong}
				/>
				<Player
					songID={songID}
					isPlaying={isPlaying}
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					onPrevius={(_repeat, _shuffle) => {
						if (songIndex > 0) {
							setSongIndex(songIndex - 1)
							setIsPlaying(true)
						}
					}}
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					onNext={(repeat, _shuffle) => {
						if (songIndex < playlistLength - 1) {
							setSongIndex(songIndex + 1)
							setIsPlaying(true)
						} else {
							setSongIndex(0)
							setIsPlaying(repeat)
						}
					}}
					onPlayPause={playing => {
						setIsPlaying(playing)
					}}
				/>
			</div>
		</article>
	)
}

export default Uppgift34
