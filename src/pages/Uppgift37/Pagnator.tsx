import { useEffect, useReducer, useRef } from "react"
import { GetPagnatedData, HasID, PagnatedData } from "./SRAPI"
import "./channelList.scss"

enum PageReduceEnum {
	NEW = "NEW",
	ADD = "ADD",
}

interface PageReduceAction<T> {
	type: PageReduceEnum
	data?: PagnatedData<T>
}

interface PageReduceState<T> {
	list: T[]
	page: number
	totalpages: number
}

function PageReducer<T>(
	state: PageReduceState<T>,
	action: PageReduceAction<T>
) {
	if (
		action.type === PageReduceEnum.NEW &&
		typeof action.data !== "undefined"
	)
		return {
			list: action.data.list,
			page: action.data.page,
			totalpages: action.data.totalpages,
		}

	if (
		action.type === PageReduceEnum.ADD &&
		typeof action.data !== "undefined"
	)
		return {
			list: [...state.list, ...action.data.list],
			page: action.data.page,
			totalpages: action.data.totalpages,
		}

	throw Error("Unknown action: " + action.type)
}

function Pagnator<T extends HasID, U extends GetPagnatedData>({
	fetchFunction,
	componentBuilder,
	params,
}: {
	fetchFunction: (data: U) => Promise<PagnatedData<T>>
	componentBuilder: (data: T) => JSX.Element
	params: U
}) {
	const [page, pageDispatch] = useReducer(PageReducer<T>, {
		list: [],
		page: 0,
		totalpages: 1,
	})

	const observerTarget = useRef(null)

	useEffect(() => {
		const observer = new IntersectionObserver(
			async function (entries) {
				if (entries[0].isIntersecting)
					fetchFunction({
						...params,
						page: page.page + 1,
					}).then(data => {
						pageDispatch({
							type: PageReduceEnum.NEW,
							data,
						})

						if (
							data.page >= data.totalpages &&
							observerTarget.current
						)
							observer.unobserve(observerTarget.current)
					})
			},
			{ threshold: 1 }
		)

		if (observerTarget.current) observer.observe(observerTarget.current)

		return () => {
			if (observerTarget.current)
				observer.unobserve(observerTarget.current)
		}
	}, [observerTarget, fetchFunction, page.page, params])

	useEffect(() => {
		fetchFunction({
			...params,
			page: 1,
		}).then(data => {
			pageDispatch({
				type: PageReduceEnum.NEW,
				data,
			})
		})
	}, [pageDispatch, fetchFunction, params])

	return (
		<ul>
			{page.list.map(data => (
				<li key={data.id}>{componentBuilder(data)}</li>
			))}
			<li ref={observerTarget}></li>
		</ul>
	)
}
export default Pagnator
