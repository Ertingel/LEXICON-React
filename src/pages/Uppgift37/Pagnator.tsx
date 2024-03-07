import { useEffect, useReducer, useRef } from "react"
import { HasID, GetPagnatedData, PagnatedData } from "./SRAPI"

enum PageReduceEnum {
	NEW = "NEW",
	ADD = "ADD",
}

interface PageReduceAction<T extends HasID> {
	type: PageReduceEnum
	data?: PagnatedData<T>
}

interface PageReduceState<T> {
	list: T[]
	page: number
	totalpages: number
}

function PageReducer<T extends HasID>(
	state: PageReduceState<T>,
	action: PageReduceAction<T>
) {
	if (action.type === PageReduceEnum.NEW)
		return {
			list: [],
			page: 0,
			totalpages: 1,
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
	ComponentBuilder,
	params,
}: {
	fetchFunction: (data: U) => Promise<PagnatedData<T>>
	ComponentBuilder: ({ data }: { data: T }) => JSX.Element
	params: U
}) {
	const [page, pageDispatch] = useReducer(PageReducer<T>, {
		list: [],
		page: 1,
		totalpages: 2,
	})

	const observerTarget = useRef(null)

	useEffect(() => {
		const refVal = observerTarget.current

		const observer = new IntersectionObserver(
			async function (entries) {
				if (entries[0].isIntersecting)
					fetchFunction({
						...params,
						page: page.page + 1,
					}).then(data => {
						pageDispatch({
							type: PageReduceEnum.ADD,
							data,
						})

						if (data.page >= data.totalpages && refVal)
							observer.unobserve(refVal)
					})
			},
			{ threshold: 0.1 }
		)

		if (refVal) observer.observe(refVal)

		return () => {
			if (refVal) observer.unobserve(refVal)
		}
	}, [observerTarget, fetchFunction, page.page, params])

	useEffect(() => {
		pageDispatch({
			type: PageReduceEnum.NEW,
		})
	}, [params])

	return (
		<ul className="pagnator">
			{page.list.map(data => (
				<ComponentBuilder key={data.id} data={data} />
			))}
			{page.page < page.totalpages ? (
				<li ref={observerTarget} className="loading"></li>
			) : undefined}
		</ul>
	)
}
export default Pagnator
