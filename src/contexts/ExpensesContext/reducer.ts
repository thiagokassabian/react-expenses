import { IExpense, ICategory } from './../../@types/expenses';
import { IExpensesAction, IExpensesContextProps } from ".";
import { types } from "./types";

const categories = (expenses: IExpense[]): ICategory[] => {
	const categories = expenses!.map(expense => expense.categoria);
	const uniqueCategories = [...new Set(categories)];
	const sumOfTheCategories = uniqueCategories.map(category => {
		const expensesByCategory = expenses!.filter(expense => expense.categoria === category).map(expense => expense.valor);
		const sum = expensesByCategory.reduce((acc: number, value: number) => acc + value, 0);
		return { categoria: category, valor: sum };
	});
	return sumOfTheCategories;
};

const sumOfMonth = (expenses: IExpense[]): number => {
	const values = expenses.map(expense => expense.valor);
	return values.reduce((acc: number, value: number) => acc + value, 0);
};

export const reducer = (state: IExpensesContextProps, action: IExpensesAction): IExpensesContextProps => {
	switch (action.type) {
		case types.LOADING:
			return { ...state, loading: true };

		case types.EXPENSES:
			const { expenses }: { expenses: IExpense[]; } = action.payload;
			return { ...state, loading: false, expenses, sum: sumOfMonth(expenses), categories: categories(expenses) };
	}
	return state;
};
