import { createContext, Dispatch, ReactNode, useReducer } from "react"
import { IExpense } from "../../@types/expenses"
import { reducer } from "./reducer"

export interface IExpensesContextProps {
	expenses: IExpense[]
	sum: number
	loading: boolean
}

export interface IExpensesAction {
	type: string
	payload?: any
}

interface IExpenseContext {
	state: IExpensesContextProps
	dispatch: Dispatch<IExpensesAction>
}

const initialState: IExpensesContextProps = {
	expenses: [],
	sum: 0,
	loading: false
}

export const ExpensesContext = createContext({} as IExpenseContext)

export const ExpensesContextProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	return <ExpensesContext.Provider value={{ state, dispatch }}>{children}</ExpensesContext.Provider>
}
