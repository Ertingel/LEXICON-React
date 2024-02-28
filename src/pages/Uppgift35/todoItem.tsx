import { useState, useEffect, Dispatch, memo } from "react"
import { TodoEntry, TodoAction, TodoEnum } from "./todoReducer"
import "./todoItem.scss"

function getTimeGap(time: Date): number {
	const now = new Date()
	const delta = now.valueOf() - time.valueOf()

	const second = 1000
	const minute = second * 60
	const hour = minute * 60

	if (delta / minute < 1) return second
	if (delta / hour < 1) return minute
	return hour
}

function getTimeStr(time: Date): string {
	const now = new Date()
	const delta = now.valueOf() - time.valueOf()

	const second = 1000
	const minute = second * 60
	const hour = minute * 60
	const day = hour * 24
	const year = day * 365

	if (delta / second < 1) return "Now"
	if (delta / minute < 1) return `${Math.floor(delta / second)}sec Ago`
	if (delta / hour < 1) return `${Math.floor(delta / minute)}min Ago`

	const clock = `${String(time.getHours()).padStart(2, "0")}:${String(
		time.getMinutes()
	).padStart(2, "0")}`

	if (delta / day < 1 && now.getDate() === time.getDate())
		return `${clock} Today`

	const month_name =
		[
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		][time.getMonth()] +
		" " +
		time.getDate()

	if (delta / year < 1) return `${month_name} ${clock}`

	return `${time.getFullYear()}-${
		time.getMonth() + 1
	}-${time.getDate()} ${clock}`
}

const TodoItem = memo(function ({
	item,
	todoDispatch,
	position,
	draged = false,
}: {
	item: TodoEntry
	todoDispatch: Dispatch<TodoAction>
	position: number
	draged: boolean
}) {
	const [timeText, setTimeText] = useState(getTimeStr(item.time))
	useEffect(() => {
		const interval = setInterval(() => {
			setTimeText(getTimeStr(item.time))
		}, getTimeGap(item.time))
		return () => clearInterval(interval)
	})

	return (
		<li
			className={draged ? "draging todo-item" : "todo-item"}
			style={
				{
					"--item-position": position,
				} as React.CSSProperties
			}
		>
			<input
				className="text"
				type="text"
				placeholder="Delete?"
				value={item.text}
				onChange={e => {
					todoDispatch({
						type: TodoEnum.SET_TEXT,
						id: item.id,
						text: e.target.value,
					})
				}}
				onBlur={() => {
					if (/^\s*$/gu.test(item.text))
						todoDispatch({
							type: TodoEnum.REMOVE,
							id: item.id,
						})
					else
						todoDispatch({
							type: TodoEnum.SET_TEXT,
							id: item.id,
							text: item.text.trim(),
						})
				}}
			/>
			<input
				className="tag"
				type="text"
				placeholder="Untagged"
				value={item.tag}
				onChange={e => {
					todoDispatch({
						type: TodoEnum.SET_TAG,
						id: item.id,
						tag: e.target.value,
					})
				}}
				onBlur={() => {
					if (/^\s*$/gu.test(item.text))
						todoDispatch({
							type: TodoEnum.SET_TAG,
							id: item.id,
							tag: "",
						})
					else
						todoDispatch({
							type: TodoEnum.SET_TAG,
							id: item.id,
							tag: item.tag.trim(),
						})
				}}
			/>
			<input
				className="completed material-symbols-rounded"
				type="checkbox"
				checked={item.completed}
				onChange={() => {
					todoDispatch({
						type: TodoEnum.TOGGLE_COMPLETED,
						id: item.id,
					})
				}}
			/>
			<input
				className="remove material-symbols-rounded"
				type="button"
				value="delete"
				onClick={() => {
					todoDispatch({
						type: TodoEnum.REMOVE,
						id: item.id,
					})
				}}
			/>
			<time className="date" dateTime={item.time.toString()}>
				{timeText}
			</time>
		</li>
	)
})

export default TodoItem
