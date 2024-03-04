import { useEffect, useState, useCallback, useRef } from "react"
import { GetPagnatedData, HasID, PagnatedData } from "./SRAPI"
import "./channelList.scss"

function Pagnator<T extends HasID, U extends GetPagnatedData>({
	fetchFunction,
	componentBuilder,
	params,
}: {
	fetchFunction: (data: U) => PagnatedData<T>
	componentBuilder: ({ data }: { data: T }) => JSX.Element
	params: U
}) {
	const [page, setPage] = useState(1)
	const [list, setList] = useState<T[]>([])

	const observerTarget = useRef(null)

	const loadNextPage = useCallback(() => {
		const data = fetchFunction({
			...params,
			page: page + 1,
		})

		setPage(page + 1)
		setList([...list, ...data.list])

		return data.page === data.totalpages
	}, [fetchFunction, list, page, params])

	useEffect(() => {
		const observer = new IntersectionObserver(
			function (entries) {
				if (entries[0].isIntersecting) {
					if (!loadNextPage())
						if (observerTarget.current)
							observer.unobserve(observerTarget.current)
				}
			},
			{ threshold: 1 }
		)

		if (observerTarget.current) observer.observe(observerTarget.current)

		return () => {
			if (observerTarget.current)
				observer.unobserve(observerTarget.current)
		}
	}, [loadNextPage, observerTarget])

	useEffect(() => {
		setList(fetchFunction(1).list)
	}, [setList, fetchFunction])

	return (
		<ul>
			{list.map(data => (
				<li key={data.id}>{componentBuilder({ data })}</li>
			))}
		</ul>
	)
}
export default Pagnator
