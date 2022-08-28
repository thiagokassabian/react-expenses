import { IExpense } from './../../@types/expenses';
import { IExpensesAction, IExpensesContextProps } from ".";
import { types } from "./types";

export const reducer = (state: IExpensesContextProps, action: IExpensesAction): IExpensesContextProps => {
	switch (action.type) {

		case types.LOADING:
			return { ...state, loading: true };

		case types.EXPENSES:
			const { expenses } = action.payload;
			const values = (expenses).map((expense: IExpense) => expense.valor);
			const sum = values.reduce((acc: number, value: number) => acc + value, 0);
			return { ...state, loading: false, expenses, sum };
	}
	return state;
};
