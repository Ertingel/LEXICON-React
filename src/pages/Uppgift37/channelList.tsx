import { GetChannels } from "./SRAPI"
import Channel from "./channel.tsx"
import "./channelList.scss"

function ChannelList() {
	const channels = GetChannels()

	return (
		<section className="channel-list">
			<h1>Kanaler</h1>
			<ul>
				{channels.map(channel => (
					<li key={channel.id}>
						<Channel data={channel} />
					</li>
				))}
			</ul>
		</section>
	)
}
export default ChannelList
