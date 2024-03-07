import { useState } from "react"

const MEMO: Map<string, object> = new Map()

function getURL(url: string, params: object) {
	return Object.entries(params)
		.filter(([, value]) => value || typeof value === "boolean")
		.reduce(
			(acc, [key, value]) => acc + `&${key}=${value}`,
			`${url}?format=JSON`
		)
}

async function memoizedFetch(url: string) {
	if (MEMO.has(url)) return MEMO.get(url)

	const res = fetch(url).then(async res => await res.json())
	MEMO.set(url, res)

	return res
}

function UTCToTime(utc: string) {
	return new Date(Number(utc.substring(6, utc.length - 2)))
}

function getTimeStr(time: Date): string {
	const now = new Date()
	const delta = Math.abs(now.valueOf() - time.valueOf())

	const second = 1000
	const minute = second * 60
	const hour = minute * 60
	const day = hour * 24
	const year = day * 365

	const clock = `${String(time.getHours()).padStart(2, "0")}:${String(
		time.getMinutes()
	).padStart(2, "0")}`

	if (delta / day < 1 && now.getDate() === time.getDate())
		return `Idag ${clock}`

	const month_name =
		[
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"Maj",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		][time.getMonth()] +
		" " +
		time.getDate()

	if (delta / year < 1) return `${month_name} ${clock}`

	return `${time.getFullYear()}-${
		time.getMonth() + 1
	}-${time.getDate()} ${clock}`
}

interface HasID {
	id: number
}

interface PagnatedData<T extends HasID> {
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

interface Channel extends HasID {
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

async function getChannel(id: number): Promise<Channel> {
	return await memoizedFetch(getChannelURL(id)).then(res => res.channel)
}

async function getChannelsPage(
	params: GetChannelsParams = {}
): Promise<PagnatedData<Channel>> {
	const res = await memoizedFetch(
		getURL("https://api.sr.se/api/v2/channels", params)
	)

	res.channels.forEach((channel: Channel) =>
		MEMO.set(getChannelURL(channel.id), { channel })
	)

	return {
		list: res.channels,
		page: res.pagination.page,
		totalhits: res.pagination.totalhits,
		totalpages: res.pagination.totalpages,
	}
}

interface GetProgramsParams extends GetGeneralData {
	channelid?: number
	programcategoryid?: number
	isarchived?: string
}

interface Program extends HasID {
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

async function getProgram(id: number): Promise<Program> {
	return await memoizedFetch(getProgramURL(id)).then(res => res.program)
}

async function getPrograms(
	params: GetProgramsParams = {}
): Promise<PagnatedData<Program>> {
	const res = await memoizedFetch(
		getURL("https://api.sr.se/api/v2/programs", params)
	)

	res.programs.forEach((program: Program) =>
		MEMO.set(getChannelURL(program.id), { program })
	)

	return {
		list: res.programs,
		page: res.pagination.page,
		totalhits: res.pagination.totalhits,
		totalpages: res.pagination.totalpages,
	}
}

interface ProgramCategory {
	id: number
	name: string
}

function GetProgramCategories() {
	const [list, setList] = useState<ProgramCategory[]>([])

	memoizedFetch(
		"https://api.sr.se/api/v2/programcategories?format=JSON&pagination=false"
	).then(data => {
		setList(data.programcategories)
		return data.programcategories
	})

	return list
}

interface GetEpisodesParams extends GetGeneralData {
	programid: number
	fromdate?: string
	todate?: string
}

interface Episode extends HasID {
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
	text: string
	title: string
	url: string
}

function getEpisodeURL(id: number) {
	return `https://api.sr.se/api/v2/episodes/get?id=${id}&format=JSON`
}

async function getEpisode(id: number): Promise<Episode> {
	return await memoizedFetch(getEpisodeURL(id)).then(res => res.episode)
}

async function getEpisodes(
	params: GetEpisodesParams
): Promise<PagnatedData<Episode>> {
	const res = await memoizedFetch(
		getURL("https://api.sr.se/api/v2/episodes/index", params)
	)

	res.episodes.forEach((episode: Episode) =>
		MEMO.set(getChannelURL(episode.id), { episode })
	)

	return {
		list: res.episodes,
		page: res.pagination.page,
		totalhits: res.pagination.totalhits,
		totalpages: res.pagination.totalpages,
	}
}

export type {
	HasID,
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
	getURL,
	memoizedFetch,
	UTCToTime,
	getTimeStr,
	getChannelURL,
	getChannel,
	getChannelsPage,
	getProgramURL,
	getProgram,
	getPrograms,
	GetProgramCategories,
	getEpisodeURL,
	getEpisode,
	getEpisodes,
}
