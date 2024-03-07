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
} from "./SRAPI.ts"
import { ChannelCard, ProgramCard, EpisodeCard } from "./card.tsx"
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
				ComponentBuilder={({ data }) => <ChannelCard data={data} />}
				params={PARAMS}
			></Pagnator>
		</section>
	)
}

function ProgramList(
	{ params }: { params?: GetProgramsParams } = { params: {} }
) {
	const [params2, setParams2] = useState<GetProgramsParams>(PARAMS)
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

			{/*
			
			hi (high) - högsta kvalitet, också det som ställer störst krav på uppkopplingen pga sin storlek
			normal - default
			lo (low) - lägsta kvalitet, rekommenderat att användas vid dålig uppkoppling

			filter = elementnamn, filtervalue = elementvärde

			sort = värde[ desc][,värde[ desc],...]
			
			
			*/}

			<select
				id="audio-quality"
				onChange={e => {
					setParams2({ ...params2, audioquality: e.target.value })
				}}
				value={params2.audioquality}
			>
				<option value="hi">Hög</option>
				<option value="">Normal</option>
				<option value="lo">Låg</option>
			</select>

			<Pagnator<Program, GetProgramsParams>
				fetchFunction={getPrograms}
				ComponentBuilder={({ data }) => <ProgramCard data={data} />}
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
				ComponentBuilder={({ data }) => <EpisodeCard data={data} />}
				params={params2}
			></Pagnator>
		</section>
	)
}

export { ChannelList, ProgramList, EpisodeList }
