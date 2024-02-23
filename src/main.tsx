import React from "react"
import { HashRouter } from "react-router-dom"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<h1>Testing</h1>
		<HashRouter>
			<App />
		</HashRouter>
	</React.StrictMode>
)
