import { Routes, Route } from "react-router-dom"
import { ChannelList, ProgramList } from "./lists.tsx"
import { ChannelInfo, ProgramInfo, EpisodeInfo } from "./info.tsx"
import "./index.scss"

function Uppgift37() {
	return (
		<article id="Uppgift37">
			<Routes>
				<Route path="/kanal/:id" element={<ChannelInfo />} />
				<Route path="/kanal" element={<ChannelList />} />

				<Route path="/program/:id" element={<ProgramInfo />} />
				<Route path="/program" element={<ProgramList />} />

				<Route path="/avsnitt/:id" element={<EpisodeInfo />} />

				<Route path="/*" element={<ChannelList />} />
			</Routes>
		</article>
	)
}

export default Uppgift37
