import { BrowserRouter, Routes, Route } from "react-router-dom"
import ViteDefault from "./ViteDefault/App.tsx"
import Uppgift33 from "./Uppgift33/index.tsx"
import "./App.css"

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="Uppgift33" element={<Uppgift33 />} />
				<Route path="*" element={<ViteDefault />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App