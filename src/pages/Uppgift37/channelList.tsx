import { GetChannels } from "./SRAPI"
import Channel from "./channel.tsx"
import "./channelList.scss"

function ChannelList() {
	const channels = GetChannels()

	return (
		<ul>
			{channels.map(channel => (
				<li key={channel.channeltype}>
					<Channel data={channel} />
				</li>
			))}
		</ul>
	)
}
export default ChannelList
