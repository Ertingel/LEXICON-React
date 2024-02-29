import { useState } from "react"
import MovieData from "./movieData"
import AddMovie from "./addMovie.tsx"
import MovieList from "./movieList.tsx"
import "./index.scss"

function Uppgift36() {
	const [list, setList] = useState<MovieData[]>([])

	return (
		<article id="Uppgift36">
			<AddMovie
				onAdd={data => {
					setList([data, ...list])
					console.log(data)
				}}
			/>
			<MovieList list={list} />
		</article>
	)
}

export default Uppgift36
