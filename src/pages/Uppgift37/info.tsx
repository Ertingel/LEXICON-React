import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { GetChannel, Channel } from "./SRAPI"
import { ProgramList } from "./lists"
import "./info.scss"

function ChannelInfo() {
	const { id } = useParams()

	const [data, setdata] = useState<Channel>()
	console.log(data)
	useEffect(() => {
		GetChannel(Number(id)).then(data => setdata(data))
	}, [setdata, id])

	if (typeof data === "undefined")
		return (
			<article className="channel-info">
				<h1>Laddar Info</h1>
			</article>
		)

	return (
		<article className="info">
			<section className="info-section">
				<img src={data.image} />
				<h1>{data.name}</h1>
				<p>{data.tagline}</p>
			</section>

			<ProgramList params={{ channelid: data.id }} />
		</article>
	)
}

export { ChannelInfo }
