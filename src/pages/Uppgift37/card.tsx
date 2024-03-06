import { memo, ReactNode } from "react"
import { Link } from "react-router-dom"
import "./card.scss"

function BaseCard({
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
const Card = memo(BaseCard)

export default Card
