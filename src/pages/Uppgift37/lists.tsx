import { useState, useEffect } from "react"
import {
	GetChannels,
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
		GetChannels(params).then(data => {
			setCount(data.totalhits)
		})
	}, [setCount])

	return (
		<section className="list">
			<h1>{count} Kanaler</h1>

			<Pagnator<Channel, GetChannelsParams>
				fetchFunction={GetChannels}
				ComponentBuilder={data => (
					<ChannelCard image={data.image} title={data.name}>
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
					<ChannelCard image={data.programimage} title={data.name}>
						<p>{data.description}</p>
					</ChannelCard>
				)}
				params={params}
			></Pagnator>
		</section>
	)

	/*
	const [count, setCount] = useState(0)

	useEffect(() => {
		GetChannels(params).then(data => {
			setCount(data.totalhits)
		})
	}, [setCount])

	return (
		<section className="list">
			<h1>{count} Kanaler</h1>

			<Pagnator<Channel, GetChannelsParams>
				fetchFunction={GetChannels}
				ComponentBuilder={data => (
					<ChannelCard image={data.image} title={data.name}>
						<p>{data.tagline}</p>
					</ChannelCard>
				)}
				params={params}
			></Pagnator>
		</section>
	)
	*/
}

export { ChannelList, ProgramList }
