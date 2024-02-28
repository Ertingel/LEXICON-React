interface TodoEntry {
	id: number

	text: string
	completed: boolean
	tag: string
	time: Date
}

interface TodoState {
	nextID: number
	list: TodoEntry[]
}

enum TodoEnum {
	MOVE_BY_ID = "MOVE_BY_ID",
	MOVE = "MOVE",
	NEW = "NEW",
	ADD = "ADD",
	REMOVE = "REMOVE",
	SET_TEXT = "SET_TEXT",
	TOGGLE_COMPLETED = "TOGGLE_COMPLETED",
	SET_COMPLETED = "SET_COMPLETED",
	SET_TAG = "SET_TAG",
	SET_TIME = "SET_TIME",
}

interface TodoAction {
	type: TodoEnum

	from?: number
	to?: number
	id?: number

	text?: string
	completed?: boolean
	tag?: string
	time?: Date
}

function todoReducer(state: TodoState, action: TodoAction): TodoState {
	if (
		action.type === TodoEnum.MOVE_BY_ID &&
		typeof action.from !== "undefined" &&
		typeof action.to !== "undefined"
	) {
		action.type = TodoEnum.MOVE
		action.from = state.list.findIndex(e => e.id === action.from)
		action.to = state.list.findIndex(e => e.id === action.to)
	}

	if (
		action.type === TodoEnum.MOVE &&
		typeof action.from !== "undefined" &&
		typeof action.to !== "undefined"
	) {
		const element = state.list[action.from]
		const newList = [...state.list]
		newList.splice(action.from, 1)
		newList.splice(action.to, 0, element)

		return {
			...state,
			nextID: state.nextID + 1,
			list: newList,
		}
	}

	if (action.type === TodoEnum.REMOVE && typeof action.id !== "undefined")
		return {
			...state,
			list: state.list.filter(item => item.id != action.id),
		}

	if (
		action.type === TodoEnum.NEW &&
		typeof action.text !== "undefined" &&
		typeof action.tag !== "undefined"
	) {
		action.type = TodoEnum.ADD
		action.completed = false
		action.time = new Date()
	}

	if (
		action.type === TodoEnum.ADD &&
		typeof action.text !== "undefined" &&
		typeof action.completed !== "undefined" &&
		typeof action.tag !== "undefined" &&
		typeof action.time !== "undefined"
	)
		return {
			...state,
			nextID: state.nextID + 1,
			list: [
				...state.list,
				{
					id: state.nextID,
					text: action.text,
					completed: action.completed,
					tag: action.tag,
					time: action.time,
				},
			],
		}

	if (
		action.type === TodoEnum.SET_TEXT &&
		typeof action.id !== "undefined" &&
		typeof action.text !== "undefined"
	)
		return {
			...state,
			list: state.list.map(item =>
				item.id === action.id && typeof action.text !== "undefined"
					? { ...item, text: action.text }
					: item
			),
		}

	if (
		action.type === TodoEnum.TOGGLE_COMPLETED &&
		typeof action.id !== "undefined"
	)
		return {
			...state,
			list: state.list.map(item =>
				item.id === action.id
					? { ...item, completed: !item.completed }
					: item
			),
		}

	if (
		action.type === TodoEnum.SET_COMPLETED &&
		typeof action.id !== "undefined" &&
		typeof action.completed !== "undefined"
	)
		return {
			...state,
			list: state.list.map(item =>
				item.id === action.id && typeof action.completed !== "undefined"
					? { ...item, completed: action.completed }
					: item
			),
		}

	if (
		action.type === TodoEnum.SET_TAG &&
		typeof action.id !== "undefined" &&
		typeof action.tag !== "undefined"
	)
		return {
			...state,
			list: state.list.map(item =>
				item.id === action.id && typeof action.tag !== "undefined"
					? { ...item, tag: action.tag }
					: item
			),
		}

	if (
		action.type === TodoEnum.SET_TIME &&
		typeof action.id !== "undefined" &&
		typeof action.time !== "undefined"
	)
		return {
			...state,
			list: state.list.map(item =>
				item.id === action.id && typeof action.time !== "undefined"
					? { ...item, time: action.time }
					: item
			),
		}

	throw Error(`Unknown action. \n${JSON.stringify(action, null, 2)}`)
}

export type { TodoEntry, TodoAction, TodoState }
export default todoReducer
export { todoReducer, TodoEnum }
