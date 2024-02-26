interface TodoItemData {
	text: string
	completed: boolean
	tag: string
	time: Date
}

interface TodoItem extends TodoItemData {
	id: number
}

interface TodoState {
	nextID: number
	list: TodoItem[]
}

enum TodoEnum {
	MOVE = "MOVE",
	ADD = "ADD",
	REMOVE = "REMOVE",
}

interface TodoAction {
	type: TodoEnum

	from?: number
	to?: number
	id?: number

	item?: TodoItemData
}

function todoReducer(state: TodoState, action: TodoAction): TodoState {
	if (action.type === TodoEnum.REMOVE && typeof action.id !== "undefined")
		return {
			...state,
			list: state.list.filter(item => item.id != action.id),
		}

	if (action.type === TodoEnum.ADD && typeof action.item !== "undefined")
		return {
			...state,
			nextID: state.nextID + 1,
			list: [{ ...action.item, id: state.nextID }, ...state.list],
		}

	throw Error(`Unknown action. \n${JSON.stringify(action, null, 2)}`)
}

export type { TodoAction, TodoState }
export default todoReducer
export { todoReducer, TodoEnum }
