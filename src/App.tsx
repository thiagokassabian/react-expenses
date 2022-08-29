import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import ExpensesPage from "./pages/ExpensesPage"
import { actualYearMonth } from "./utils/dateFunctions"
import { ExpensesContextProvider } from "./contexts/ExpensesContext"
import useUser from "./hooks/useUser"
import Header from "./components/Header"
import LoginPage from "./pages/LoginPage"

const App = () => {
	const { user, setUser, signOut } = useUser()

	return (
		<>
			<Header user={user} onSignOut={signOut} />

			{!user && <LoginPage onSignIn={setUser} />}

			{user && (
				<BrowserRouter>
					<Routes>
						<Route
							path="/despesas/:date"
							element={
								<ExpensesContextProvider>
									<ExpensesPage />
								</ExpensesContextProvider>
							}
						/>
						<Route path="*" element={<Navigate to={`/despesas/${actualYearMonth()}`} replace />} />
					</Routes>
				</BrowserRouter>
			)}
		</>
	)
}

export default App
