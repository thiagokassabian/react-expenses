import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import ExpensesPage from "./pages/ExpensesPage"
import { actualYearMonth } from "./utils/dateFunctions"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/despesas/:date" element={<ExpensesPage />} />
				<Route path="*" element={<Navigate to={`/despesas/${actualYearMonth()}`} replace />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
)
