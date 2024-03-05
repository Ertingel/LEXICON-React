const MEMO: {
	CHANNELS_PAGES: Map<string, Promise<PagnatedData<Channel>>>
	CHANNELS: Map<string, Promise<Channel>>
	PROGRAMS_PAGES: Map<string, Promise<PagnatedData<Program>>>
} = {
	CHANNELS_PAGES: new Map(),
	CHANNELS: new Map(),
	PROGRAMS_PAGES: new Map(),
}

interface GetPagnatedData {
	page?: number
	pagination?: boolean
	size?: number
}

interface PagnatedData<T> {
	list: T[]
	page: number
	totalhits: number
	totalCHANNEL_pages: number
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

interface Channel {
	id: number
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

function GetChannelURL(id: number) {
	return `https://api.sr.se/api/v2/channels${id ? "/" + id : ""}?format=JSON`
}

function GetChannelsPageURL(params: GetChannelsParams) {
	return Object.entries(params).reduce(
		(acc, [key, value]) => acc + `&${key}=${value}`,
		"https://api.sr.se/api/v2/channels?format=JSON"
	)
}

async function GetChannel(id: number): Promise<Channel> {
	const querry = GetChannelURL(id)

	if (MEMO.CHANNELS.has(querry)) return await MEMO.CHANNELS.get(querry)!

	const data = fetch(querry)
		.then(async res => await res.json())
		.then(res => res.channel)

	MEMO.CHANNELS.set(querry, data)
	return await data
}

async function GetChannelsPage(
	params: GetChannelsParams = {}
): Promise<PagnatedData<Channel>> {
	const querry = GetChannelsPageURL(params)

	if (MEMO.CHANNELS_PAGES.has(querry))
		return await MEMO.CHANNELS_PAGES.get(querry)!

	const data = fetch(querry)
		.then(async res => await res.json())
		.then(res => {
			/*
			res.channels.forEach((channel:Channel) => {
				MEMO.CHANNELS.set(GetChannelURL(channel.id), channel)
			});
			*/

			return {
				list: res.channels,
				page: res.pagination.page,
				totalhits: res.pagination.totalhits,
				totalCHANNEL_pages: res.pagination.totalCHANNEL_pages,
			}
		})

	MEMO.CHANNELS_PAGES.set(querry, data)
	return await data
}

interface GetProgramsParams extends GetPagnatedData {
	channelid?: number
	programcategoryid?: number
	isarchived?: boolean
}

interface Program {
	id: number
	description: string
	broadcastinfo: string
	email: string
	phone: string
	programurl: string
	programslug: string
	programimage: string
	programimagetemplate: string
	programimagewide: string
	programimagetemplatewide: string
	socialimage: string
	socialimagetemplate: string
	socialmediaplatforms: {
		platform: string
		platformurl: string
	}[]
	channel: {
		id: number
		name: string
	}
	archived: boolean
	hasondemand: boolean
	haspod: boolean
	responsibleeditor: string
	name: string
}

function GetProgramsURL(params: GetProgramsParams) {
	return Object.entries(params).reduce(
		(acc, [key, value]) => acc + `&${key}=${value}`,
		"https://api.sr.se/api/v2/programs?format=JSON"
	)
}

async function GetPrograms(
	params: GetProgramsParams = {}
): Promise<PagnatedData<Program>> {
	const querry = GetProgramsURL(params)

	if (MEMO.PROGRAMS_PAGES.has(querry))
		return await MEMO.PROGRAMS_PAGES.get(querry)!

	const data = fetch(querry)
		.then(async res => await res.json())
		.then(res => ({
			list: res.programs,
			page: res.pagination.page,
			totalhits: res.pagination.totalhits,
			totalCHANNEL_pages: res.pagination.totalCHANNEL_pages,
		}))

	MEMO.PROGRAMS_PAGES.set(querry, data)
	return await data
}

export type {
	GetPagnatedData,
	GetChannelsParams,
	Channel,
	PagnatedData,
	GetProgramsParams,
	Program,
}
export {
	GetChannelURL,
	GetChannelsPageURL,
	GetChannelsPage,
	GetChannel,
	GetProgramsURL,
	GetPrograms,
}
