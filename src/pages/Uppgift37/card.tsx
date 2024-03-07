import { memo, ReactNode } from "react"
import { Link } from "react-router-dom"
import { Channel, Program, Episode, getTimeStr, UTCToTime } from "./SRAPI"
import "./card.scss"

function BaseCardFrame({
	image,
	children,
	link,
}: {
	image: string
	children: ReactNode
	link: string
}) {
	return (
		<li className="card">
			<Link to={link}>
				<img src={image} alt="" />
				<div>{children}</div>
			</Link>
		</li>
	)
}

function BaseChannelCard({ data }: { data: Channel }) {
	return (
		<BaseCardFrame image={data.image} link={`/Uppgift37/kanal/${data.id}`}>
			<h1>{data.name}</h1>
			<p>{data.tagline}</p>
			<i className="right">{data.channeltype}</i>
		</BaseCardFrame>
	)
}

function BaseProgramCard({ data }: { data: Program }) {
	return (
		<BaseCardFrame
			image={data.programimage}
			link={`/Uppgift37/program/${data.id}`}
		>
			<h1>{data.name}</h1>
			<p>{data.description}</p>
			<i className="right">{data.broadcastinfo}</i>
		</BaseCardFrame>
	)
}

function BaseEpisodeCard({ data }: { data: Episode }) {
	return (
		<BaseCardFrame
			image={data.imageurl}
			link={`/Uppgift37/avsnitt/${data.id}`}
		>
			<h1>{data.title}</h1>
			<p>{data.description}</p>
			<i className="right">
				{getTimeStr(UTCToTime(data.publishdateutc))}
			</i>
		</BaseCardFrame>
	)
}

const CardFrame = memo(BaseCardFrame)
const ChannelCard = memo(BaseChannelCard)
const ProgramCard = memo(BaseProgramCard)
const EpisodeCard = memo(BaseEpisodeCard)

export { CardFrame, ChannelCard, ProgramCard, EpisodeCard }
