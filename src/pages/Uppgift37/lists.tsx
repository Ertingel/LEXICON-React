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
					<ChannelCard
						image={data.programimage}
						title={data.name}
						link={`/Uppgift37/program/${data.id}`}
						time={data.broadcastinfo}
					>
						<p>{data.description}</p>
					</ChannelCard>
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
					<ChannelCard
						image={data.imageurl}
						title={data.title}
						link={`/Uppgift37/avsnitt/${data.id}`}
						time={UTCToTime(data.publishdateutc).toLocaleString()}
					>
						<p>{data.description}</p>
					</ChannelCard>
				)}
				params={params2}
			></Pagnator>
		</section>
	)
}

export { ChannelList, ProgramList, EpisodeList }
