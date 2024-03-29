import { useState } from "react"
import MovieData from "./movieData"
import "./addMovie.scss"

function AddMovie({ onAdd }: { onAdd?: (data: MovieData) => void }) {
	const genreOptions = [
		"Action",
		"Comedy",
		"Drama",
		"Fantasy",
		"Horror",
		"Mystery",
		"Romance",
		"Science Fiction",
		"Thriller",
		"Western",
	]

	const [nextID, setNextID] = useState(0)
	const [title, setTitle] = useState("")
	const [rating, setRating] = useState(3)
	const [genre, setGenre] = useState("")
	const [description, setDescription] = useState("")

	return (
		<form
			className="add-movie"
			onSubmit={e => {
				e.preventDefault()
				if (typeof onAdd !== "undefined") {
					onAdd({
						id: nextID,
						title,
						rating,
						genre,
						description,
					})
					setNextID(nextID + 1)
				}

				setTitle("")
				setRating(3)
				setGenre("")
				setDescription("")
			}}
		>
			<h1 id="Head">Add Movie</h1>

			<label htmlFor="Title">Title:</label>
			<input
				type="text"
				name="Title"
				id="Title"
				placeholder="Add Title"
				value={title}
				onChange={e => setTitle(e.target.value)}
				required
			/>

			<p id="Min">1</p>
			<label htmlFor="Rating">Rating:</label>
			<input
				type="range"
				name="Rating"
				id="Rating"
				min="1"
				max="5"
				step=".5"
				value={rating}
				onChange={e => setRating(Number(e.target.value))}
				required
			/>
			<p id="Max">5</p>

			<label htmlFor="Genre">Genre:</label>
			<select
				name="Genre"
				id="Genre"
				className={genre === "" ? "placeholder" : ""}
				value={genre}
				onChange={e => setGenre(e.target.value)}
				required
			>
				<option value="" disabled hidden>
					Add Genre
				</option>
				{genreOptions.map(genre => (
					<option key={genre} value={genre}>
						{genre}
					</option>
				))}
			</select>

			<label htmlFor="Description">Description:</label>
			<textarea
				name="Description"
				id="Description"
				rows={4}
				value={description}
				onChange={e => setDescription(e.target.value)}
			></textarea>

			<input
				id="Clear"
				type="button"
				value="Clear"
				onClick={() => {
					setTitle("")
					setRating(3)
					setGenre("")
					setDescription("")
				}}
			/>
			<input id="Add" type="submit" value="Add" />
		</form>
	)
}

export default AddMovie
