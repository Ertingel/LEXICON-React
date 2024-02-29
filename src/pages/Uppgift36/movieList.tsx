import MovieData from "./movieData"
import MovieCard from "./movieCard.tsx"
import "./movieList.scss"

function MovieList({ list }: { list: MovieData[] }) {
	return (
		<ul className="movie-list">
			{list.map(data => (
				<MovieCard key={data.title} data={data} />
			))}
		</ul>
	)
}

export default MovieList
