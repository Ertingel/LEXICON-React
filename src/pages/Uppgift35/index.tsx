import "./index.scss"

function Uppgift35() {
	return (
		<section id="Uppgift35">
			<link
				rel="stylesheet"
				href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
			/>

			<div id="background"></div>

			<main id="todo">
				<h1>TODO</h1>

				<div id="todo-filter">
					<input
						id="todo-filter-text"
						type="text"
						placeholder="Filter"
					/>
					<button
						id="todo-filter-clear"
						className="material-symbols-rounded"
					>
						refresh
					</button>
					<p id="todo-filter-info"></p>
				</div>

				<ul id="todo-list"></ul>

				<form id="todo-add" className="todo-item">
					<input
						id="todo-add-text"
						className="text"
						type="text"
						placeholder="Add To Do"
						required
					/>
					<input
						id="todo-add-tag"
						className="tag"
						type="text"
						placeholder="Untagged"
					/>
					<input
						id="todo-add-button"
						className="completed material-symbols-rounded"
						type="submit"
						value="add"
					/>
					<p className="date">Add</p>
				</form>
			</main>
		</section>
	)
}

export default Uppgift35
