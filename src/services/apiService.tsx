import { IExpense } from "../@types/expenses"
import { get } from "./httpService"

export const getExpenses = async (): Promise<IExpense[]> => {
	const expenses = await get("/despesas")
	return expenses
}

export const getExpensesMonth = async (month: string): Promise<IExpense[]> => {
	const expenses = await get(`/despesas?mes=${month}&_sort=dia`)
	return expenses
}
