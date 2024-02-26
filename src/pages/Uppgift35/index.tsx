import { useState, useReducer } from "react"
import { todoReducer, TodoEnum, TodoState } from "./todoReducer"
import "./index.scss"

function Uppgift35() {
	const init: TodoState = {
		nextID: 0,
		list: [],
	}

	const [todo, todoDispatch] = useReducer(todoReducer, init)

	const [addText, setAddText] = useState("")
	const [addTag, setAddTag] = useState("")

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

				<ul id="todo-list">
					{todo.list.map(item => (
						<p key={item.id}>{item.text}</p>
					))}
				</ul>

				<form
					id="todo-add"
					className="todo-item"
					onSubmit={() => {
						todoDispatch({
							type: TodoEnum.ADD,
							item: {
								text: addText,
								completed: false,
								tag: addTag,
								time: new Date(),
							},
						})
					}}
				>
					<input
						id="todo-add-text"
						className="text"
						type="text"
						placeholder="Add To Do"
						required
						value={addText}
						onChange={e => setAddText(e.target.value)}
					/>
					<input
						id="todo-add-tag"
						className="tag"
						type="text"
						placeholder="Untagged"
						value={addTag}
						onChange={e => setAddTag(e.target.value)}
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
