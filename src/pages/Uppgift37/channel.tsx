import { memo } from "react"
import { ChannelData } from "./SRAPI"
import "./channel.scss"

function BaseChannel({ data }: { data: ChannelData }) {
	return (
		<article className="channel">
			<img src={data.image.href} alt="" />
			<h1>{data.name}</h1>
			<p>{data.tagline}</p>
		</article>
	)
}
const Channel = memo(BaseChannel)

export default Channel
