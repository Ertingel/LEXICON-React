import { useState, useEffect } from "react"

interface Channel {
	image: URL
	imagetemplate: URL
	color: string
	tagline: string
	siteurl: URL
	liveaudio: { id: number; url: URL; statkey: string }
	scheduleurl: URL
	channeltype: string
	xmltvid: string
}

function GetChannels() {
	const [data, setData] = useState<Channel[]>([])

	useEffect(() => {
		const getEL = (element: Element, qualifiedName: string) =>
			element.getElementsByTagName(qualifiedName)[0].innerHTML

		fetch("https://api.sr.se/api/v2/channels")
			.then(async res => res.text())
			.then(async res =>
				new window.DOMParser().parseFromString(res, "text/xml")
			)
			.then(res => {
				setData(
					[...res.getElementsByTagName("channel")].map(channel => {
						const liveaudio =
							channel.getElementsByTagName("liveaudio")[0]

						const data: Channel = {
							image: new URL(getEL(channel, "image")),
							imagetemplate: new URL(
								getEL(channel, "imagetemplate")
							),
							color: getEL(channel, "color"),
							tagline: getEL(channel, "tagline"),
							siteurl: new URL(getEL(channel, "siteurl")),
							liveaudio: {
								id: Number(liveaudio.id),
								url: new URL(getEL(liveaudio, "url")),
								statkey: getEL(liveaudio, "statkey"),
							},
							scheduleurl: new URL(getEL(channel, "scheduleurl")),
							channeltype: getEL(channel, "channeltype"),
							xmltvid: getEL(channel, "xmltvid"),
						}

						return data
					})
				)
				console.log(data)
			})
	}, [])

	return data
}

export type { Channel }
export { GetChannels }
