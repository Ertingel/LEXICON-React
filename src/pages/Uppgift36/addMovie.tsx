import { useState } from "react"
import "./addMovie.scss"

function AddMovie() {
	const genreOptions = [
		"Action",
		"Comedy",
		"Drama",
		"Fantasy",
		"Horror",
		"Mystery",
		"Romance",
		"Thriller",
		"Western",
	]

	const [title, setTitle] = useState("")
	const [rating, setRating] = useState(0)
	const [genre, setGenre] = useState("")
	const [description, setDescription] = useState("")

	return (
		<form
			className="add-movie"
			onSubmit={e => {
				e.preventDefault()
			}}
		>
			<label htmlFor="Title">Title:</label>
			<input
				type="text"
				name="Title"
				id="Title"
				placeholder="Title"
				value={title}
				onChange={e => setTitle(e.target.value)}
			/>

			<label htmlFor="Rating">Rating:</label>
			<input
				type="range"
				name="Rating"
				id="Rating"
				min="0"
				max="5"
				step=".25"
				value={rating}
				onChange={e => setRating(Number(e.target.value))}
			/>

			<label htmlFor="Genre">Genre:</label>
			<select
				name="Genre"
				id="Genre"
				value={genre}
				onChange={e => setGenre(e.target.value)}
			>
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
				value={description}
				onChange={e => setDescription(e.target.value)}
			></textarea>

			<input id="Clear" type="button" value="Clear" />
			<input id="Add" type="submit" value="Add" />
		</form>
	)
}

export default AddMovie
