import MovieData from "./movieData"
import MovieCard from "./movieCard.tsx"
import "./movieList.scss"

function MovieList({
	list,
	onClick,
}: {
	list: MovieData[]
	onClick?: (id: number) => void
}) {
	return (
		<ul className="movie-list">
			{list.map(data => (
				<li key={data.id}>
					<button
						onClick={() => {
							if (typeof onClick !== "undefined") onClick(data.id)
						}}
					>
						<MovieCard data={data} />
						<p className="remove">REMOVE?</p>
					</button>
				</li>
			))}
		</ul>
	)
}

export default MovieList
