import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import {
	getChannel,
	getProgram,
	Channel,
	Program,
	getEpisode,
	Episode,
	UTCToTime,
} from "./SRAPI"
import { ProgramList, EpisodeList } from "./lists"
import "./info.scss"

function ChannelInfo() {
	const { id } = useParams()

	const [data, setdata] = useState<Channel>()
	console.log(data)
	useEffect(() => {
		getChannel(Number(id)).then(data => setdata(data))
	}, [setdata, id])

	if (typeof data === "undefined")
		return (
			<article className="info">
				<h1>Laddar Info</h1>
			</article>
		)

	return (
		<article className="info">
			<section className="info-channel">
				<img src={data.image} />
				<div>
					<h1>{data.name}</h1>
					<b>{data.channeltype}</b>
					<p>{data.tagline}</p>
				</div>
			</section>

			<ProgramList params={{ channelid: data.id }} />
		</article>
	)
}

function ProgramInfo() {
	const { id } = useParams()

	const [data, setdata] = useState<Program>()
	console.log(data)
	useEffect(() => {
		getProgram(Number(id)).then(data => setdata(data))
	}, [setdata, id])

	if (typeof data === "undefined")
		return (
			<article className="info">
				<h1>Laddar Info</h1>
			</article>
		)

	return (
		<article className="info">
			<section className="info-program">
				<img src={data.programimagetemplatewide} />
				<div>
					<h1>{data.name}</h1>
					<h2>
						<b>{data.channel.name}:</b>
						{data.broadcastinfo}
					</h2>
					<p>{data.description}</p>
				</div>
			</section>

			<EpisodeList params={{ programid: data.id }} />
		</article>
	)
}

function EpisodeInfo() {
	const { id } = useParams()

	const [data, setdata] = useState<Episode>()
	console.log(data)
	useEffect(() => {
		getEpisode(Number(id)).then(data => setdata(data))
	}, [setdata, id])

	if (typeof data === "undefined")
		return (
			<article className="info">
				<h1>Laddar Info</h1>
			</article>
		)

	return (
		<article className="info">
			<section className="info-program">
				<img src={data.imageurl} />
				<div>
					<h1>{data.title}</h1>
					<h2>
						<b>{data.program.name}:</b>
						{UTCToTime(
							data.broadcasttime.starttimeutc
						).toLocaleString()}{" "}
						-
						{UTCToTime(
							data.broadcasttime.endtimeutc
						).toLocaleString()}
					</h2>
					<p>{data.description}</p>
				</div>
			</section>
		</article>
	)
}

export { ChannelInfo, ProgramInfo, EpisodeInfo }
