import { createContext, FC } from 'react';
import { useReducer, useState } from 'react';
import { ExpensesContextType } from '../../@types/expenses';
// import { ExpenseContext } from './context';
// import { reducer } from './reducer';

const contextDefaultValues: ExpensesContextType;

const ExpenseContext = createContext<ExpenseContextType | null>(null);

const ExpenseContextProvider: FC = ({ children }) => {
	const [expenseState, setExpenseState] = useState(null);

	return (
		{ children }
	);
};