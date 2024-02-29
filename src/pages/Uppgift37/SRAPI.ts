import { useState, useMemo } from "react"

function GetChannels() {
	const [data, setData] = useState(new Document())
	/*
	fetch("https://api.sr.se/api/v2/channels")
		.then(async res =>
			new window.DOMParser().parseFromString(await res.text(), "text/xml")
		)
		.then(res => setData(res))
		.then(res => console.log(res))
*/
	/*
	fetch("https://api.sr.se/api/v2/channels")
		.then(async res =>
			new window.DOMParser().parseFromString(await res.text(), "text/xml")
		)
		.then(res => setData(res))
*/
	return data
}

export { GetChannels }
