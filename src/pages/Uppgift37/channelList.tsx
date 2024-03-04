import { GetChannels } from "./SRAPI"
import Channel from "./channel.tsx"
import "./channelList.scss"

function ChannelList() {
	const channelsPage = GetChannels({
		size: 12,
	})

	return (
		<section className="channel-list">
			<h1>{channelsPage.totalhits} Kanaler</h1>
			<ul>
				{channelsPage.channels.map(channel => (
					<li key={channel.id}>
						<Channel data={channel} />
					</li>
				))}
			</ul>
			<p>
				{channelsPage.page}/{channelsPage.totalpages}
			</p>
		</section>
	)
}
export default ChannelList
