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

const params = {
	size: 12,
	page: 1,
}

function ChannelList() {
	const [count, setCount] = useState(0)

	useEffect(() => {
		GetChannelsPage(params).then(data => {
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
				params={params}
			></Pagnator>
		</section>
	)
}

function ProgramList() {
	const [count, setCount] = useState(0)

	useEffect(() => {
		GetPrograms(params).then(data => {
			setCount(data.totalhits)
		})
	}, [setCount])

	return (
		<section className="list">
			<h1>{count} Program</h1>

			<Pagnator<Program, GetProgramsParams>
				fetchFunction={GetPrograms}
				ComponentBuilder={data => (
					<ChannelCard
						image={data.programimage}
						title={data.name}
						link={`Uppgift37/program/${data.id}`}
					>
						<p>{data.description}</p>
					</ChannelCard>
				)}
				params={params}
			></Pagnator>
		</section>
	)
}

export { ChannelList, ProgramList }
