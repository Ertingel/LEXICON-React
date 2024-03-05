const MEMO: {
	PAGES: Map<string, Promise<PagnatedData<Channel>>>
	PROGRAMS: Map<string, Promise<PagnatedData<Program>>>
} = {
	PAGES: new Map(),
	PROGRAMS: new Map(),
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
	totalpages: number
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

function GetChannelsURL(params: GetChannelsParams) {
	return Object.entries(params).reduce(
		(acc, [key, value]) => acc + `&${key}=${value}`,
		"https://api.sr.se/api/v2/channels?format=JSON"
	)
}

async function GetChannels(
	params: GetChannelsParams = {}
): Promise<PagnatedData<Channel>> {
	const querry = GetChannelsURL(params)

	if (MEMO.PAGES.has(querry)) return await MEMO.PAGES.get(querry)!

	const data = fetch(querry)
		.then(async res => await res.json())
		.then(res => {
			//console.log(querry)
			//console.log(res)

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

	if (MEMO.PROGRAMS.has(querry)) return await MEMO.PROGRAMS.get(querry)!

	const data = fetch(querry)
		.then(async res => await res.json())
		.then(res => {
			//console.log(querry)
			//console.log(res)

			const data = {
				list: res.programs,
				page: res.pagination.page,
				totalhits: res.pagination.totalhits,
				totalpages: res.pagination.totalpages,
			}

			return data
		})

	MEMO.PROGRAMS.set(querry, data)
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
export { GetChannelsURL, GetChannels, GetProgramsURL, GetPrograms }
