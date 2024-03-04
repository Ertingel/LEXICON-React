import { useEffect, useState, useCallback, useRef } from "react"
import { GetPagnatedData, HasID, PagnatedData } from "./SRAPI"
import "./channelList.scss"

function Pagnator<T extends HasID, U extends GetPagnatedData>({
	fetchFunction,
	componentBuilder,
	params,
}: {
	fetchFunction: (data: U) => Promise<PagnatedData<T>>
	componentBuilder: (data: T) => JSX.Element
	params: U
}) {
	const [page, setPage] = useState(1)
	const [list, setList] = useState<T[]>([])

	const observerTarget = useRef(null)

	const loadNextPage = useCallback(async () => {
		const data = await fetchFunction({
			...params,
			page: page + 1,
		})

		setPage(page + 1)
		setList([...list, ...data.list])

		return data.page === data.totalpages
	}, [fetchFunction, list, page, params])

	useEffect(() => {
		const observer = new IntersectionObserver(
			async function (entries) {
				if (entries[0].isIntersecting)
					if (!(await loadNextPage()))
						if (observerTarget.current)
							observer.unobserve(observerTarget.current)
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
		loadNextPage()
	}, [loadNextPage])

	return (
		<ul>
			{list.map(data => (
				<li key={data.id}>{componentBuilder(data)}</li>
			))}
		</ul>
	)
}
export default Pagnator
