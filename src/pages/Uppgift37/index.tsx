import { Routes, Route } from "react-router-dom"
import ChannelList from "./lists.tsx"
import "./index.scss"

function Uppgift37() {
	return (
		<article id="Uppgift37">
			<Routes>
				<Route path="*" element={<ChannelList />} />
			</Routes>
		</article>
	)
	/*
	return (
		<article id="Uppgift37">
			<ChannelList />
			<Routes>
				<Route path="Uppgift33" element={<Uppgift33 />} />
				<Route path="Uppgift34" element={<Uppgift34 />} />
				<Route path="Uppgift35" element={<Uppgift35 />} />
				<Route path="Uppgift36" element={<Uppgift36 />} />
				<Route path="Uppgift37" element={<Uppgift37 />} />
				<Route path="*" element={<ViteDefault />} />
			</Routes>
		</article>
	)
	*/
}

export default Uppgift37
