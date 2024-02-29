import { memo } from "react"
import MovieData from "./movieData"
import "./movieCard.scss"
function BaseMovieCard({ data }: { data: MovieData }) {
	return (
		<article className="movie-card">
			<h1 id="Title">{data.title}</h1>
			<p id="Rating">{data.rating}/5</p>
			<p id="Genre">{data.genre}</p>
			<p id="Description">{data.description}</p>
		</article>
	)
}

const MovieCard = memo(BaseMovieCard)
export default MovieCard
