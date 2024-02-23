import { HashRouter, Routes, Route } from "react-router-dom"
import ViteDefault from "./pages/ViteDefault/App.tsx"
import Uppgift33 from "./pages/Uppgift33/index.tsx"
import Uppgift34 from "./pages/Uppgift34/index.tsx"
import "./App.css"

function App() {
	return (
		<HashRouter>
			<Routes>
				<Route path="Uppgift33" element={<Uppgift33 />} />
				<Route path="Uppgift34" element={<Uppgift34 />} />
				<Route path="*" element={<ViteDefault />} />
			</Routes>
		</HashRouter>
	)
}

export default App
