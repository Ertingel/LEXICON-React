import { useState } from "react"
import MovieData from "./movieData"
import AddMovie from "./addMovie.tsx"
import MovieList from "./movieList.tsx"
import "./index.scss"

function Uppgift36() {
	const [list, setList] = useState<MovieData[]>([
		{
			id: -2,
			title: "WALL-E",
			rating: 4.5,
			genre: "Science Fiction",
			description:
				"After hundreds of lonely years of doing what he was built for, the curious and lovable WALL-E discovers a new purpose in life when he meets a sleek robot named EVE. Join them and a hilarious cast of characters on a journey across the universe. ",
		},
		{
			id: -1,
			title: "Tron: Legacy",
			rating: 4.5,
			genre: "Science Fiction",
			description:
				"When the son of a famous video game engineer receives a virtual signal from his long-lost father, he sets off on a thrilling, high-tech adventure through a cyber universe to rescue his dad. ",
		},
	])

	return (
		<article id="Uppgift36">
			<AddMovie
				onAdd={data => {
					setList([data, ...list])
					console.log(data)
				}}
			/>
			<MovieList
				list={list}
				onClick={id => {
					setList(list.filter(e => e.id !== id))
				}}
			/>
		</article>
	)
}

export default Uppgift36
