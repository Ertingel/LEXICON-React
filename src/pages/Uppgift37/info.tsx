import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import {
	getChannel,
	getProgram,
	Channel,
	Program,
	getEpisode,
	Episode,
	UTCToTime,
	getTimeStr,
} from "./SRAPI"
import { ProgramList, EpisodeList } from "./lists"
import Audio from "./Audio.tsx"
import "./info.scss"

function ChannelInfo() {
	const { id } = useParams()

	const [data, setdata] = useState<Channel>()

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
			<header className="row">
				<img src={data.imagetemplate} />
				<div>
					<h1>{data.name}</h1>
					<h2>{data.channeltype}</h2>
					<p>{data.tagline}</p>
					<Audio live={data.liveaudio.url} />
				</div>
			</header>

			<ProgramList params={{ channelid: data.id }} />
		</article>
	)
}

function ProgramInfo() {
	const { id } = useParams()

	const [data, setdata] = useState<Program>()

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
			<header>
				<img src={data.programimagetemplatewide} />
				<div>
					<h1>{data.name}</h1>
					<h2>
						<Link to={`/Uppgift37/kanal/${data.channel.id}`}>
							{data.channel.name}
						</Link>
						<span>: {data.broadcastinfo}</span>
					</h2>

					<p>{data.description}</p>

					<ul>
						{data.responsibleeditor ? (
							<li>
								<b>Redaktör</b>: {data.responsibleeditor}
							</li>
						) : undefined}

						{data.socialmediaplatforms.map(
							({ platform, platformurl }) => (
								<li key={platform}>
									<b>{platform}</b>:{" "}
									<a href={platformurl}>{platformurl}</a>
								</li>
							)
						)}

						{data.email ? (
							<li>
								<b>Email</b>:{" "}
								<a href={`mailto:${data.email}`}>
									{data.email}
								</a>
							</li>
						) : undefined}

						{data.phone ? (
							<li>
								<b>Tel</b>:{" "}
								<a href={`tel:${data.phone}`}>{data.phone}</a>
							</li>
						) : undefined}
					</ul>
				</div>
			</header>

			<EpisodeList params={{ programid: data.id }} />
		</article>
	)
}

function EpisodeInfo() {
	const { id } = useParams()

	const [data, setdata] = useState<Episode>()

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
			<header>
				<img src={data.imageurltemplate} />
				<div>
					<h1>{data.title}</h1>
					<h2>
						<Link to={`/Uppgift37/program/${data.program.id}`}>
							{data.program.name}
						</Link>
						<span>
							:{" "}
							{getTimeStr(
								UTCToTime(data.broadcasttime.starttimeutc)
							)}
							{" - "}
							{getTimeStr(
								UTCToTime(data.broadcasttime.endtimeutc)
							)}
						</span>
					</h2>
					<p>{data.description}</p>
					<p>{data.text}</p>

					<Audio
						live={data.listenpodfile.url}
						download={data.downloadpodfile.url}
					/>
				</div>
			</header>
		</article>
	)
}

export { ChannelInfo, ProgramInfo, EpisodeInfo }
