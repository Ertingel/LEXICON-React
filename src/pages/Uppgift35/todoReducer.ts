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
	MOVE = "MOVE",
	ADD = "ADD",
	REMOVE = "REMOVE",
	SET_TEXT = "SET_TEXT",
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
	if (action.type === TodoEnum.REMOVE && typeof action.id !== "undefined")
		return {
			...state,
			list: state.list.filter(item => item.id != action.id),
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
				{
					id: state.nextID,
					text: action.text,
					completed: action.completed,
					tag: action.tag,
					time: action.time,
				},
				...state.list,
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
					? {
							...item,
							text: action.text,
					  }
					: item
			),
		}


		
	throw Error(`Unknown action. \n${JSON.stringify(action, null, 2)}`)
}

export type { TodoEntry, TodoAction, TodoState }
export default todoReducer
export { todoReducer, TodoEnum }
