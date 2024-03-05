import { useState, useEffect } from "react"
import { GetChannels, ChannelData, GetChannelsParams } from "./SRAPI"
import Channel from "./channel.tsx"
import Pagnator from "./Pagnator.tsx"
import "./channelList.scss"

const params = {
	size: 12,
	page: 1,
}

function ChannelList() {
	const [count, setCount] = useState(0)

	useEffect(() => {
		GetChannels(params).then(data => {
			setCount(data.totalhits)
		})
	}, [setCount])

	return (
		<section className="channel-list">
			<h1>{count} Kanaler</h1>

			<Pagnator<ChannelData, GetChannelsParams>
				fetchFunction={GetChannels}
				componentBuilder={data => <Channel data={data} />}
				params={params}
			></Pagnator>
		</section>
	)
}
export default ChannelList
