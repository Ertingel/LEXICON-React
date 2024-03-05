import { useState, useEffect, Dispatch, SetStateAction } from "react"

interface GetPagnatedData {
	page?: number
	pagination?: boolean
	size?: number
}

interface GetChannelsParams extends GetPagnatedData {
	audioquality?: string
	callback?: string
	filter?: string
	filtervalue?: string
	liveaudiotemplateid?: string
	ondemandaudiotemplateid?: string
	sort?: string
}

interface HasID {
	id: number
}

interface ChannelData extends HasID {
	channeltype: string
	color: string
	image: string
	imagetemplate: string
	liveaudio: { id: number; url: string; statkey: string }
	name: string
	scheduleurl: string
	siteurl: string
	tagline: string
	xmltvid: string
}

interface PagnatedData<T> {
	list: T[]
	page: number
	totalhits: number
	totalpages: number
}

const SRAPI_MEMO: {
	pages: Map<string, PagnatedData<ChannelData>>
} = {
	pages: new Map(),
}

function GetChannels(
	params: GetChannelsParams = {}
): [PagnatedData<ChannelData>, Dispatch<SetStateAction<GetChannelsParams>>] {
	const [params2, setParams] = useState<GetChannelsParams>(params)

	const [data, setData] = useState<PagnatedData<ChannelData>>({
		list: [],
		page: 0,
		totalhits: 0,
		totalpages: 0,
	})

	useEffect(() => {
		const querry = Object.entries(params2).reduce(
			(acc, [key, value]) => acc + `&${key}=${value}`,
			"https://api.sr.se/api/v2/channels?format=JSON"
		)
		console.log(SRAPI_MEMO.pages)
		if (querry in SRAPI_MEMO.pages) setData(SRAPI_MEMO.pages.get(querry)!)

		fetch(querry)
			.then(async res => await res.json())
			.then(res => {
				console.log(querry)
				console.log(res)

				const d = {
					list: res.channels,
					page: res.pagination.page,
					totalhits: res.pagination.totalhits,
					totalpages: res.pagination.totalpages,
				}

				SRAPI_MEMO.pages.set(querry, d)
				setData(d)
			})
	}, [params2])

	return [data, setParams]
}

function GetChannelsURL(params: GetChannelsParams) {
	return Object.entries(params).reduce(
		(acc, [key, value]) => acc + `&${key}=${value}`,
		"https://api.sr.se/api/v2/channels?format=JSON"
	)
}

async function GetChannels2(params: GetChannelsParams = {}) {
	const querry = GetChannelsURL(params)
	if (querry in SRAPI_MEMO.pages) return SRAPI_MEMO.pages.get(querry)

	return await fetch(querry)
		.then(async res => await res.json())
		.then(res => {
			console.log(querry)
			console.log(res)

			const data = {
				list: res.channels,
				page: res.pagination.page,
				totalhits: res.pagination.totalhits,
				totalpages: res.pagination.totalpages,
			}

			SRAPI_MEMO.pages.set(querry, data)
			return data
		})
}

export type {
	GetPagnatedData,
	GetChannelsParams,
	HasID,
	ChannelData,
	PagnatedData,
}
export { GetChannelsURL, GetChannels, GetChannels2 }
