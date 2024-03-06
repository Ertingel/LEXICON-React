const MEMO: {
	CHANNELS_PAGES: Map<string, Promise<PagnatedData<Channel>>>
	CHANNELS: Map<string, Promise<Channel>>

	PROGRAMS_PAGES: Map<string, Promise<PagnatedData<Program>>>
	PROGRAMS: Map<string, Promise<Program>>

	EPISODES_PAGES: Map<string, Promise<PagnatedData<Episode>>>
	EPISODES: Map<string, Promise<Episode>>
} = {
	CHANNELS_PAGES: new Map(),
	CHANNELS: new Map(),

	PROGRAMS_PAGES: new Map(),
	PROGRAMS: new Map(),

	EPISODES_PAGES: new Map(),
	EPISODES: new Map(),
}

interface PagnatedData<T> {
	list: T[]
	page: number
	totalhits: number
	totalpages: number
}

interface GetPagnatedData {
	page?: number
	pagination?: boolean
	size?: number
}

interface GetGeneralData extends GetPagnatedData {
	audioquality?: string
	callback?: string
	filter?: string
	filtervalue?: string
	liveaudiotemplateid?: string
	ondemandaudiotemplateid?: string
	sort?: string
}

interface GetChannelsParams extends GetGeneralData {
	id?: number
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

function getChannelURL(id: number) {
	return `https://api.sr.se/api/v2/channels/${id}?format=JSON`
}

function getChannelsPageURL(params: GetChannelsParams) {
	return Object.entries(params).reduce(
		(acc, [key, value]) => acc + `&${key}=${value}`,
		"https://api.sr.se/api/v2/channels?format=JSON"
	)
}

async function getChannel(id: number): Promise<Channel> {
	const querry = getChannelURL(id)

	if (MEMO.CHANNELS.has(querry)) return await MEMO.CHANNELS.get(querry)!

	const data = fetch(querry)
		.then(async res => await res.json())
		.then(res => res.channel)

	MEMO.CHANNELS.set(querry, data)
	return await data
}

async function getChannelsPage(
	params: GetChannelsParams = {}
): Promise<PagnatedData<Channel>> {
	const querry = getChannelsPageURL(params)

	if (MEMO.CHANNELS_PAGES.has(querry))
		return await MEMO.CHANNELS_PAGES.get(querry)!

	const data = fetch(querry)
		.then(async res => await res.json())
		.then(res => {
			res.channels.forEach((channel: Channel) => {
				const promise = async () => channel
				MEMO.CHANNELS.set(getChannelURL(channel.id), promise())
			})

			return {
				list: res.channels,
				page: res.pagination.page,
				totalhits: res.pagination.totalhits,
				totalpages: res.pagination.totalpages,
			}
		})

	MEMO.CHANNELS_PAGES.set(querry, data)
	return await data
}

interface GetProgramsParams extends GetGeneralData {
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

function getProgramURL(id: number) {
	return `https://api.sr.se/api/v2/programs/${id}?format=JSON`
}

function getProgramsURL(params: GetProgramsParams) {
	return Object.entries(params).reduce(
		(acc, [key, value]) => acc + `&${key}=${value}`,
		"https://api.sr.se/api/v2/programs?format=JSON"
	)
}

async function getProgram(id: number): Promise<Program> {
	const querry = getProgramURL(id)

	if (MEMO.PROGRAMS.has(querry)) return await MEMO.PROGRAMS.get(querry)!

	const data = fetch(querry)
		.then(async res => await res.json())
		.then(res => res.channel)

	MEMO.PROGRAMS.set(querry, data)
	return await data
}

async function getPrograms(
	params: GetProgramsParams = {}
): Promise<PagnatedData<Program>> {
	const querry = getProgramsURL(params)

	if (MEMO.PROGRAMS_PAGES.has(querry))
		return await MEMO.PROGRAMS_PAGES.get(querry)!

	const data = fetch(querry)
		.then(async res => await res.json())
		.then(res => {
			res.programs.forEach((program: Program) => {
				const promise = async () => program
				MEMO.PROGRAMS.set(getProgramURL(program.id), promise())
			})

			return {
				list: res.programs,
				page: res.pagination.page,
				totalhits: res.pagination.totalhits,
				totalpages: res.pagination.totalpages,
			}
		})

	MEMO.PROGRAMS_PAGES.set(querry, data)
	return await data
}

interface GetEpisodesParams extends GetGeneralData {
	programid: number
	fromdate?: string
	todate?: string
}

interface Episode {
	audiopreference: string
	audiopresentation: string
	audiopriority: string
	broadcasttime: {
		starttimeutc: "/Date(1709643840000)/"
		endtimeutc: "/Date(1709646000000)/"
	}
	channelid: number
	description: string
	downloadpodfile: {
		availablefromutc: string
		description: string
		duration: number
		filesizeinbytes: number
		id: number
		program: { id: number; name: string }
		publishdateutc: string
		statkey: string
		title: string
		url: string
	}
	id: number
	imageurl: string
	imageurltemplate: string
	listenpodfile: {
		availablefromutc: string
		description: string
		duration: number
		filesizeinbytes: number
		id: number
		program: { id: number; name: string }
		publishdateutc: string
		statkey: string
		title: string
		url: string
	}
	photographer: string
	program: { id: number; name: string }
	publishdateutc: string
	title: string
	url: string
}

function getEpisodeURL(id: number) {
	return `https://api.sr.se/api/v2/episodes/index/${id}?format=JSON`
}

function getEpisodesURL(params: GetEpisodesParams) {
	return Object.entries(params).reduce(
		(acc, [key, value]) => acc + `&${key}=${value}`,
		"https://api.sr.se/api/v2/episodes/index?format=JSON"
	)
}

async function getEpisode(id: number): Promise<Episode> {
	const querry = getEpisodeURL(id)

	if (MEMO.EPISODES.has(querry)) return await MEMO.EPISODES.get(querry)!

	const data = fetch(querry)
		.then(async res => await res.json())
		.then(res => res.episode)

	MEMO.EPISODES.set(querry, data)
	return await data
}

async function getEpisodes(
	params: GetEpisodesParams
): Promise<PagnatedData<Episode>> {
	const querry = getEpisodesURL(params)

	if (MEMO.EPISODES_PAGES.has(querry))
		return await MEMO.EPISODES_PAGES.get(querry)!

	const data = fetch(querry)
		.then(async res => await res.json())
		.then(res => {
			res.episodes.forEach((program: Episode) => {
				const promise = async () => program
				MEMO.EPISODES.set(getEpisodeURL(program.id), promise())
			})

			return {
				list: res.episodes,
				page: res.pagination.page,
				totalhits: res.pagination.totalhits,
				totalpages: res.pagination.totalpages,
			}
		})

	MEMO.EPISODES_PAGES.set(querry, data)
	return await data
}

export type {
	GetPagnatedData,
	GetGeneralData,
	GetChannelsParams,
	Channel,
	PagnatedData,
	GetProgramsParams,
	Program,
	Episode,
	GetEpisodesParams,
}
export {
	getChannelURL,
	getChannelsPageURL,
	getChannel,
	getChannelsPage,
	getProgramURL,
	getProgramsURL,
	getProgram,
	getPrograms,
	getEpisodeURL,
	getEpisodesURL,
	getEpisode,
	getEpisodes,
}
