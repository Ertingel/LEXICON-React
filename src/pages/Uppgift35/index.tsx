import { useState, useEffect, useReducer, useRef } from "react"
import { todoReducer, TodoEnum, TodoState } from "./todoReducer"

import TodoItem from "./todoItem"
import "./index.scss"

function Uppgift35() {
	const init: TodoState = {
		nextID: 3,
		list: [
			{
				id: 0,
				text: "Pizza",
				completed: false,
				tag: "Food",
				time: new Date(new Date().valueOf() - 100000000),
			},
			{
				id: 1,
				text: "Taco",
				completed: true,
				tag: "Food",
				time: new Date(new Date().valueOf() - 10000000),
			},
			{
				id: 2,
				text: "Snacks",
				completed: false,
				tag: "Food",
				time: new Date(new Date().valueOf() - 1000000),
			},
		],
	}

	const [todo, todoDispatch] = useReducer(todoReducer, init)

	const [filter, setFilter] = useState("")
	const [filteredList, setFilteredList] = useState(todo.list)
	const [filterText, setFilterText] = useState(`${todo.list.length} Items`)

	const [addText, setAddText] = useState("")
	const [addTag, setAddTag] = useState("")

	const listRef = useRef<HTMLOListElement>(null)
	const [mouseDown, setMouseDown] = useState(false)
	const [dragging, setDragging] = useState(false)
	const [draggedID, setDraggedID] = useState(-1)

	const getDragID = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
		if (!listRef.current) return -1

		const { y, height } = listRef.current.getBoundingClientRect()
		let index = ((e.clientY - y) / height) * filteredList.length
		index = Math.max(index, 0)
		index = Math.min(index, filteredList.length - 1)
		index = Math.floor(index)

		return filteredList[index].id
	}

	const dragStart: React.MouseEventHandler<HTMLUListElement> = e => {
		if (!listRef.current) return

		setDraggedID(getDragID(e))
		setMouseDown(true)
	}

	const dragMove: React.MouseEventHandler<HTMLUListElement> = e => {
		if (!mouseDown || !listRef.current) return

		const id = getDragID(e)
		if (draggedID === id) return
		setDragging(true)

		todoDispatch({
			type: TodoEnum.MOVE_BY_ID,
			from: draggedID,
			to: id,
		})
	}

	const dragEnd: React.MouseEventHandler<HTMLUListElement> = e => {
		dragMove(e)
		setDragging(false)
		setDraggedID(-1)
		setMouseDown(false)
	}

	useEffect(() => {
		if (/^\s*$/gu.test(filter)) {
			setFilteredList(todo.list)
			return
		}

		const pattern = new RegExp(
			(filter.match(/\S+/gu) ?? [""]).join("|"),
			"giu"
		)

		setFilteredList(
			todo.list.filter(
				e =>
					pattern.test(e.text) ||
					pattern.test(e.tag) ||
					pattern.test(e.time.toString().substring(0, 24))
			)
		)
	}, [todo, filter])

	useEffect(() => {
		setFilterText(
			todo.list.length != filteredList.length
				? `${filteredList.length} / ${todo.list.length} Items`
				: `${filteredList.length} Items`
		)
	}, [todo.list, filteredList])

	return (
		<section id="Uppgift35">
			<link
				rel="stylesheet"
				href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
			/>

			<div id="background"></div>

			<main id="todo" className={dragging ? "dragging" : ""}>
				<h1>TODO</h1>

				<div id="todo-filter">
					<input
						id="todo-filter-text"
						type="text"
						placeholder="Filter"
						value={filter}
						onChange={e => {
							if (/^\s*$/gu.test(e.target.value)) setFilter("")
							else setFilter(e.target.value)
						}}
						onBlur={() => {
							setFilter(
								/^\s*$/gu.test(filter) ? "" : filter.trim()
							)
						}}
					/>
					<button
						id="todo-filter-clear"
						className="material-symbols-rounded"
						onClick={() => setFilter("")}
					>
						refresh
					</button>
					<p id="todo-filter-info">{filterText}</p>
				</div>

				<ul
					ref={listRef}
					id="todo-list"
					style={
						{
							"--item-count": filteredList.length,
						} as React.CSSProperties
					}
					onMouseDown={dragStart}
					onMouseUp={dragEnd}
					onMouseLeave={dragEnd}
					onMouseMove={dragMove}
				>
					{filteredList.map((item, index) => (
						<TodoItem
							key={item.id}
							item={item}
							todoDispatch={todoDispatch}
							position={index}
							draged={dragging && draggedID === item.id}
						/>
					))}
				</ul>

				<form
					id="todo-add"
					className="todo-item"
					onSubmit={e => {
						let newTag = addTag

						if (/^\s*$/gu.test(newTag)) newTag = ""

						if (!/^\s*$/gu.test(addText))
							todoDispatch({
								type: TodoEnum.NEW,
								text: addText,
								tag: newTag,
							})

						setAddText("")
						setAddTag("")

						e.preventDefault()
					}}
				>
					<input
						id="todo-add-text"
						className="text"
						type="text"
						placeholder="Add To Do"
						required
						value={addText}
						onChange={e => {
							if (/^\s*$/gu.test(e.target.value)) setAddText("")
							else setAddText(e.target.value)
						}}
						onBlur={() => {
							setAddText(
								/^\s*$/gu.test(addText) ? "" : addText.trim()
							)
						}}
					/>
					<input
						id="todo-add-tag"
						className="tag"
						type="text"
						placeholder="Untagged"
						value={addTag}
						onChange={e => {
							if (/^\s*$/gu.test(e.target.value)) setAddTag("")
							else setAddTag(e.target.value)
						}}
						onBlur={() => {
							setAddTag(
								/^\s*$/gu.test(addTag) ? "" : addTag.trim()
							)
						}}
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
