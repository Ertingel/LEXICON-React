import { useEffect, useState } from "react"
import { GetChannels } from "./SRAPI"
import Channel from "./channel.tsx"
import "./channelList.scss"

function ChannelList() {
	const [page, setPage] = useState(1)
	const [channelsPage, setChannelsPage] = GetChannels({
		page: page,
		size: 12,
	})

	useEffect(() => {
		setChannelsPage({
			page: page,
			size: 12,
		})
	}, [page, setChannelsPage])

	return (
		<section className="channel-list">
			<h1>{channelsPage.totalhits} Kanaler</h1>
			<button
				className="previus"
				onClick={() => setPage(Math.max(1, page - 1))}
			>
				←
			</button>
			<ul>
				{channelsPage.channels.map(channel => (
					<li key={channel.id}>
						<Channel data={channel} />
					</li>
				))}
			</ul>
			<button
				className="next"
				onClick={() =>
					setPage(Math.min(channelsPage.totalpages, page + 1))
				}
			>
				→
			</button>
			<p>
				{channelsPage.page}/{channelsPage.totalpages}
			</p>
		</section>
	)
}
export default ChannelList
