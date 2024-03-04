import { useState, useEffect, Dispatch, SetStateAction } from "react"

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

function GetChannels(
	params: GetChannelsParams = {}
): [ChannelPageData, Dispatch<SetStateAction<GetChannelsParams>>] {
	const [params2, setParams] = useState<GetChannelsParams>(params)

	const [data, setData] = useState<ChannelPageData>({
		channels: [],
		page: 0,
		totalhits: 0,
		totalpages: 0,
	})

	useEffect(() => {
		const querry = Object.entries(params2).reduce(
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
	}, [params2])

	return [data, setParams]
}

export type { GetChannelsParams, ChannelData, ChannelPageData }
export { GetChannels }
