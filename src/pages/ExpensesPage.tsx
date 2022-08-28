import { Backdrop, CircularProgress, Container, Paper, Typography } from "@mui/material"
import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import Expenses from "../components/Expenses"
import Header from "../components/Header"
import { ExpensesContext } from "../contexts/ExpensesContext"
import { getExpensesMonth } from "../contexts/ExpensesContext/actions"
import "./styles.css"

const ExpensesPage = () => {
	const { date } = useParams()
	const { state, dispatch } = useContext(ExpensesContext)
	const { loading, expenses } = state

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
				<Container maxWidth="lg" sx={{ paddingY: 3 }}>
					<Header date={date!} />
				</Container>
			</Paper>

			<Container maxWidth="lg" sx={{ paddingY: 3, height: "calc(100% - 96px)" }}>
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
