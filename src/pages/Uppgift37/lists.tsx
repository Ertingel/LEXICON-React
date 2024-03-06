import { useState, useEffect } from "react"
import {
	Channel,
	GetChannelsParams,
	getChannelsPage,
	Program,
	GetProgramsParams,
	getPrograms,
	Episode,
	GetEpisodesParams,
	getEpisodes,
	UTCToTime,
} from "./SRAPI.ts"
import Card from "./card.tsx"
import Pagnator from "./Pagnator.tsx"
import "./lists.scss"

const PARAMS = {
	size: 12,
	page: 1,
}

function ChannelList() {
	const [count, setCount] = useState(0)

	useEffect(() => {
		getChannelsPage(PARAMS).then(data => {
			setCount(data.totalhits)
		})
	}, [setCount])

	return (
		<section className="list">
			<h1>{count} Kanaler</h1>

			<Pagnator<Channel, GetChannelsParams>
				fetchFunction={getChannelsPage}
				ComponentBuilder={data => (
					<Card
						image={data.image}
						link={`/Uppgift37/kanal/${data.id}`}
					>
						<h1>{data.name}</h1>
						<p>{data.tagline}</p>
					</Card>
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
		getPrograms(params2).then(data => {
			setCount(data.totalhits)
		})
	}, [setParams2, setCount, params])

	return (
		<section className="list">
			<h1>{count} Program</h1>

			<Pagnator<Program, GetProgramsParams>
				fetchFunction={getPrograms}
				ComponentBuilder={data => (
					<Card
						image={data.programimage}
						link={`/Uppgift37/program/${data.id}`}
					>
						<h1>{data.name}</h1>
						<p>{data.description}</p>
						<i className="right">{data.broadcastinfo}</i>
					</Card>
				)}
				params={params2}
			></Pagnator>
		</section>
	)
}

function EpisodeList({ params }: { params: GetEpisodesParams }) {
	const [params2, setParams2] = useState<GetEpisodesParams>({
		...PARAMS,
		...params,
	})
	const [count, setCount] = useState(0)

	useEffect(() => {
		const params2: GetEpisodesParams = { ...PARAMS, ...params }

		setParams2(params2)
		getEpisodes(params2).then(data => {
			setCount(data.totalhits)
		})
	}, [setParams2, setCount, params])

	return (
		<section className="list">
			<h1>{count} Avsnitt</h1>

			<Pagnator<Episode, GetEpisodesParams>
				fetchFunction={getEpisodes}
				ComponentBuilder={data => (
					<Card
						image={data.imageurl}
						link={`/Uppgift37/avsnitt/${data.id}`}
					>
						<h1>{data.title}</h1>
						<p>{data.description}</p>
						<i className="right">
							{UTCToTime(data.publishdateutc).toLocaleString()}
						</i>
					</Card>
				)}
				params={params2}
			></Pagnator>
		</section>
	)
}

export { ChannelList, ProgramList, EpisodeList }
