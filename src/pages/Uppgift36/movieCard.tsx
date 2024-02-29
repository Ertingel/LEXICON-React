import { memo } from "react"
import MovieData from "./movieData"
import "./movieCard.scss"

function BaseMovieCard({ data }: { data: MovieData }) {
	return <li className="movie-card"></li>
}

const MovieCard = memo(BaseMovieCard)
export default MovieCard
