import { useState, useEffect } from "react"
import {
	GetChannelsPage,
	Channel,
	GetChannelsParams,
	GetPrograms,
	Program,
	GetProgramsParams,
} from "./SRAPI.ts"
import ChannelCard from "./card.tsx"
import Pagnator from "./Pagnator.tsx"
import "./lists.scss"

const PARAMS = {
	size: 12,
	page: 1,
}

function ChannelList() {
	const [count, setCount] = useState(0)

	useEffect(() => {
		GetChannelsPage(PARAMS).then(data => {
			setCount(data.totalhits)
		})
	}, [setCount])

	return (
		<section className="list">
			<h1>{count} Kanaler</h1>

			<Pagnator<Channel, GetChannelsParams>
				fetchFunction={GetChannelsPage}
				ComponentBuilder={data => (
					<ChannelCard
						image={data.image}
						title={data.name}
						link={`/Uppgift37/kanal/${data.id}`}
					>
						<p>{data.tagline}</p>
					</ChannelCard>
				)}
				params={PARAMS}
			></Pagnator>
		</section>
	)
}

function ProgramList(
	{ params }: { params?: GetProgramsParams } = { params: {} }
) {
	const [params2, setParams2] = useState(PARAMS)
	const [count, setCount] = useState(0)

	useEffect(() => {
		const params2 = { ...PARAMS, ...params }

		setParams2(params2)
		GetPrograms(params2).then(data => {
			setCount(data.totalhits)
		})
	}, [setParams2, setCount, params])

	return (
		<section className="list">
			<h1>{count} Program</h1>

			<Pagnator<Program, GetProgramsParams>
				fetchFunction={GetPrograms}
				ComponentBuilder={data => (
					<ChannelCard
						image={data.programimage}
						title={data.name}
						link={`/Uppgift37/program/${data.id}`}
					>
						<p>{data.description}</p>
					</ChannelCard>
				)}
				params={params2}
			></Pagnator>
		</section>
	)
}

export { ChannelList, ProgramList }
