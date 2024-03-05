import { useState, useEffect, useRef } from "react"
import { GetChannels, ChannelData, GetChannelsParams } from "./SRAPI"
import Channel from "./channel.tsx"
import Pagnator from "./Pagnator.tsx"
import "./channelList.scss"

function ChannelList() {
	const params = useRef({
		size: 12,
		page: 1,
	})

	const [count, setCount] = useState(0)

	useEffect(() => {
		GetChannels(params.current).then(data => {
			setCount(data.totalhits)
		})
	}, [setCount])

	return (
		<section className="channel-list">
			<h1>{count} Kanaler</h1>

			<Pagnator<ChannelData, GetChannelsParams>
				fetchFunction={GetChannels}
				componentBuilder={data => <Channel data={data} />}
				params={params.current}
			></Pagnator>
		</section>
	)
}
export default ChannelList
