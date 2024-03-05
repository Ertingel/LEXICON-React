import { memo, ReactNode } from "react"
import "./card.scss"

function BaseChannelCard({
	image,
	title,
	children,
}: {
	image: string
	title: string
	children: ReactNode
}) {
	return (
		<li className="card">
			<img src={image} alt="" />
			<h1>{title}</h1>
			<div>{children}</div>
		</li>
	)
}
const ChannelCard = memo(BaseChannelCard)

export default ChannelCard
