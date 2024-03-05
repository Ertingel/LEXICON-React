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

const MEMO: {
	PAGES: Map<string, Promise<PagnatedData<ChannelData>>>
} = {
	PAGES: new Map(),
}

function GetChannelsURL(params: GetChannelsParams) {
	return Object.entries(params).reduce(
		(acc, [key, value]) => acc + `&${key}=${value}`,
		"https://api.sr.se/api/v2/channels?format=JSON"
	)
}

async function GetChannels(params: GetChannelsParams = {}) {
	const querry = GetChannelsURL(params)

	console.log(MEMO.PAGES.has(querry))
	if (MEMO.PAGES.has(querry)) return await MEMO.PAGES.get(querry)!

	const data = fetch(querry)
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

			return data
		})

	MEMO.PAGES.set(querry, data)
	return await data
}

export type {
	GetPagnatedData,
	GetChannelsParams,
	HasID,
	ChannelData,
	PagnatedData,
}
export { GetChannelsURL, GetChannels }
