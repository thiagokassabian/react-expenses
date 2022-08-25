import { Backdrop, CircularProgress, Container, Paper, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { IExpense } from "../@types/expenses"
import Expenses from "../components/Expenses"
import Header from "../components/Header"
import { getExpensesMonth } from "../services/apiService"
import "./styles.css"

const ExpensesPage = () => {
	const { date } = useParams()

	const [expenses, setExpenses] = useState<IExpense[]>([])
	const [loading, setLoading] = useState<boolean>(false)
	const sum = useRef<number>(0)

	useEffect(() => {
		sum.current = 0
		setLoading(true)
		const fetch = async () => {
			const expensesData = await getExpensesMonth(date!)
			setExpenses(expensesData)
			sumOfTheMonth(expensesData.map(expense => expense.valor))
			setLoading(false)
		}
		fetch()
	}, [date])

	const sumOfTheMonth = (values: number[]) => {
		sum.current = values.reduce((acumulator, value) => acumulator + value, 0)
	}

	return (
		<>
			<Paper
				elevation={4}
				sx={{ position: "sticky", top: 0, backgroundColor: "#f5f5f5", zIndex: 100, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
			>
				<Container maxWidth="lg" sx={{ paddingY: 3 }}>
					<Header sum={sum.current} date={date!} />
				</Container>
			</Paper>

			<Container maxWidth="lg" sx={{ paddingY: 3, height: "calc(100% - 96px)" }}>
				{loading && (
					<Backdrop sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }} open={loading}>
						<CircularProgress color="inherit" />
					</Backdrop>
				)}
				{!loading && expenses.length === 0 && <Typography>Não há despesas neste mês</Typography>}
				{!loading && expenses.length > 0 && <Expenses expenses={expenses} />}
			</Container>
		</>
	)
}

export default ExpensesPage
