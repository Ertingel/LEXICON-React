import { memo, ReactNode } from "react"
import { Link } from "react-router-dom"
import "./card.scss"

function BaseChannelCard({
	image,
	title,
	children,
	link,
}: {
	image: string
	title: string
	children: ReactNode
	link: string
}) {
	return (
		<li className="card">
			<Link to={link}>
				<img src={image} alt="" />
				<h1>{title}</h1>
				<div>{children}</div>
			</Link>
		</li>
	)
}
const ChannelCard = memo(BaseChannelCard)

export default ChannelCard
