import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { GetChannel, Program } from "./SRAPI"
import "./channelInfo.scss"

function ChannelInfo() {
	const { id } = useParams()

	const [data, setdata] = useState<Program>()

	useEffect(() => {
		GetChannel(Number(id)).then(data => {
			console.log(data)
			//const res = data.list[0]
			//setdata(data.list[0])
		})
	}, [setdata, id])

	return <article className="channel-info"></article>
}

export default ChannelInfo
