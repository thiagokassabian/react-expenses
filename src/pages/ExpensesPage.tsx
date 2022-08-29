import { Backdrop, CircularProgress, Container, Paper, Typography } from "@mui/material"
import { useContext, useEffect } from "react"
import { Outlet, useParams } from "react-router-dom"
import Expenses from "../components/Expenses"
import Toolbar from "../components/Toolbar"
import Header from "../components/Header"
import { ExpensesContext, ExpensesContextProvider } from "../contexts/ExpensesContext"
import { getExpensesMonth } from "../contexts/ExpensesContext/actions"
import "./styles.css"

const ExpensesPage = () => {
	const { date } = useParams()
	const {
		state: { expenses, loading },
		dispatch
	} = useContext(ExpensesContext)

	//* Utilização de hook customizado para atender requisitos do desafio
	//const { expenses: expensesHook, categories, sum } = useExpenses(date!)
	// console.table(expensesHook)  //* Despesas
	// console.log(`TOTAL: ${sum}`) //* Total
	// console.table(categories) //* Categorias

	useEffect(() => {
		getExpensesMonth(dispatch, date!).then(dispatch => dispatch())
	}, [date])

	return (
		<>
			<Paper
				elevation={4}
				sx={{
					position: "sticky",
					top: 0,
					backgroundColor: "#f5f5f5",
					zIndex: 100,
					borderBottomLeftRadius: 0,
					borderBottomRightRadius: 0
				}}
			>
				<Container maxWidth="lg" sx={{ paddingY: 2 }}>
					<Toolbar date={date!} />
				</Container>
			</Paper>

			<Container maxWidth="lg" sx={{ paddingY: 3 }}>
				{loading && (
					<Backdrop sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }} open={loading}>
						<CircularProgress color="inherit" />
					</Backdrop>
				)}
				{!loading && expenses.length === 0 && <Typography>Não há despesas neste mês</Typography>}
				{!loading && expenses.length > 0 && <Expenses />}
			</Container>
		</>
	)
}

export default ExpensesPage
