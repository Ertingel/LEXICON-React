import { useState, useEffect } from "react"

interface GetChannelsParams {
	audioquality?: string
	callback?: string
	filter?: string
	filtervalue?: string
	indent?: string
	liveaudiotemplateid?: string
	ondemandaudiotemplateid?: string
	page?: string
	pagination?: string
	size?: string
	sort?: string
}

interface ChannelData {
	channeltype: string
	color: string
	id: number
	image: string
	imagetemplate: string
	liveaudio: { id: number; url: string; statkey: string }
	name: string
	scheduleurl: string
	siteurl: string
	tagline: string
	xmltvid: string
}

function GetChannels(params: GetChannelsParams = {}) {
	const [data, setData] = useState<ChannelData[]>([])

	useEffect(() => {
		const querry = Object.entries(params).reduce(
			(acc, [key, value]) => acc + `?${key}=${value}`,
			"https://api.sr.se/api/v2/channels?format=JSON"
		)

		fetch(querry)
			.then(async res => await res.json())
			.then(res => {
				setData(res.channels)
				console.log(res)
			})
	}, [])

	return data
}

export type { GetChannelsParams, ChannelData }
export { GetChannels }
