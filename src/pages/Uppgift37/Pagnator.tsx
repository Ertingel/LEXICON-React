import { useEffect, useReducer, useRef } from "react"
import { GetPagnatedData, PagnatedData } from "./SRAPI"

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

function Pagnator<T, U extends GetPagnatedData>({
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
		page: 0,
		totalpages: 1,
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
		<ul className="pagnator">
			{page.list.map((data, index) => (
				<ComponentBuilder key={index} data={data} />
			))}
			{page.page < page.totalpages ? (
				<li ref={observerTarget} className="loading"></li>
			) : undefined}
		</ul>
	)
}
export default Pagnator
