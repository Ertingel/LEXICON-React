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
	GetProgramCategories,
} from "./SRAPI.ts"
import { ChannelCard, ProgramCard, EpisodeCard } from "./card.tsx"
import Pagnator from "./Pagnator.tsx"
import "./lists.scss"

const PARAMS = {
	size: 12,
	page: 1,
}

function ChannelList() {
	const [params2, setParams2] = useState<GetProgramsParams>(PARAMS)
	const [count, setCount] = useState(0)

	useEffect(() => {
		getChannelsPage(params2).then(data => {
			setCount(data.totalhits)
		})
	}, [setCount, params2])

	return (
		<section className="list">
			<h1>{count} Kanaler</h1>

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

			{/* <input
				type="text"
				id="filter-text"
				value={params2.filtervalue ?? ""}
				onChange={e => {
					setParams2({
						...params2,
						filter: "channel.channeltype",
						filtervalue: e.target.value,
					})
					console.log(params2)
				}}
			/> */}

			<Pagnator<Channel, GetChannelsParams>
				fetchFunction={getChannelsPage}
				ComponentBuilder={({ data }) => <ChannelCard data={data} />}
				params={params2}
			></Pagnator>
		</section>
	)
}

function ProgramList(
	{ params }: { params?: GetProgramsParams } = { params: {} }
) {
	const [params2, setParams2] = useState<GetProgramsParams>(PARAMS)
	const [count, setCount] = useState(0)
	const programCategories = GetProgramCategories()

	useEffect(() => {
		setParams2({ ...PARAMS, ...params })
	}, [setParams2, params])

	useEffect(() => {
		getPrograms(params2).then(data => {
			setCount(data.totalhits)
		})
	}, [setCount, params2])

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

			<label htmlFor="audio-quality">Ljud kvalitet:</label>
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

			{/* <input
				type="text"
				id="filter-text"
				value={params2.filtervalue ?? ""}
				onChange={e => {
					setParams2({
						...params2,
						filter: "channeltype",
						filtervalue: e.target.value,
					})
					console.log(params2)
				}}
			/> */}
			<label htmlFor="catagory">Categori:</label>
			<select
				id="catagory"
				onChange={e => {
					setParams2({
						...params2,
						programcategoryid: Number(e.target.value),
					})
				}}
				value={params2.programcategoryid ?? ""}
			>
				<option value="">Alla</option>
				{programCategories.map(category => (
					<option key={category.id} value={category.id}>
						{category.name}
					</option>
				))}
			</select>

			<label htmlFor="archived">Arkiverad:</label>
			<select
				id="archived"
				onChange={e => {
					setParams2({ ...params2, isarchived: e.target.value })
				}}
				value={params2.isarchived ?? ""}
			>
				<option value="true">Ja</option>
				<option value="">Alla</option>
				<option value="false">Nej</option>
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
