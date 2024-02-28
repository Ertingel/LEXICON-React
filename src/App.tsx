import { Routes, Route } from "react-router-dom"
import ViteDefault from "./pages/ViteDefault/App.tsx"
import Uppgift33 from "./pages/Uppgift33/index.tsx"
import Uppgift34 from "./pages/Uppgift34/index.tsx"
import Uppgift35 from "./pages/Uppgift35/index.tsx"
import Uppgift36 from "./pages/Uppgift36/index.tsx"
import "./App.css"

function App() {
	return (
		<Routes>
			<Route path="Uppgift33" element={<Uppgift33 />} />
			<Route path="Uppgift34" element={<Uppgift34 />} />
			<Route path="Uppgift35" element={<Uppgift35 />} />
			<Route path="Uppgift36" element={<Uppgift36 />} />
			<Route path="*" element={<ViteDefault />} />
		</Routes>
	)
}

export default App
