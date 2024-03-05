import { Routes, Route } from "react-router-dom"
import { ChannelList, ProgramList } from "./lists.tsx"
import "./index.scss"

function Uppgift37() {
	return (
		<article id="Uppgift37">
			<Routes>
				<Route path="/program" element={<ProgramList />} />
				<Route path="/*" element={<ChannelList />} />
			</Routes>
		</article>
	)
}

export default Uppgift37
