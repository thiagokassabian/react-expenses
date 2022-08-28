import { createContext, Dispatch, ReactNode, useReducer } from "react"
import { ICategory, IExpense } from "../../@types/expenses"
import { reducer } from "./reducer"

export interface IExpensesAction {
	type: string
	payload?: any
}

export interface IExpensesContextProps {
	expenses: IExpense[]
	sum: number
	categories: ICategory[]
	loading: boolean
}

interface IExpenseContext {
	state: IExpensesContextProps
	dispatch: Dispatch<IExpensesAction>
}

const initialState: IExpensesContextProps = {
	expenses: [],
	sum: 0,
	categories: [],
	loading: false
}

export const ExpensesContext = createContext({} as IExpenseContext)

export const ExpensesContextProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	return <ExpensesContext.Provider value={{ state, dispatch }}>{children}</ExpensesContext.Provider>
}
