import { useState, useEffect } from "react"

interface GetChannelsParams {
	audioquality?: string
	callback?: string
	filter?: string
	filtervalue?: string
	liveaudiotemplateid?: string
	ondemandaudiotemplateid?: string
	page?: number
	pagination?: boolean
	size?: number
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

interface ChannelPageData {
	channels: ChannelData[]
	page: number
	totalhits: number
	totalpages: number
}

function GetChannels(params: GetChannelsParams = {}) {
	const [data, setData] = useState<ChannelPageData>({
		channels: [],
		page: 0,
		totalhits: 0,
		totalpages: 0,
	})

	useEffect(() => {
		const querry = Object.entries(params).reduce(
			(acc, [key, value]) => acc + `&${key}=${value}`,
			"https://api.sr.se/api/v2/channels?format=JSON"
		)

		fetch(querry)
			.then(async res => await res.json())
			.then(res => {
				console.log(querry)
				console.log(res)
				setData({
					channels: res.channels,
					page: res.pagination.page,
					totalhits: res.pagination.totalhits,
					totalpages: res.pagination.totalpages,
				})
			})
	}, [])

	return data
}

export type { GetChannelsParams, ChannelData, ChannelPageData }
export { GetChannels }
