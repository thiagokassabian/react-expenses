import { IExpense, ICategory } from './../@types/expenses';
import { getExpenses, getExpensesMonth } from './../contexts/ExpensesContext/actions';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ExpensesContext } from '../contexts/ExpensesContext';

const useExpenses = (date: string) => {
	const { dispatch } = useContext(ExpensesContext);
	const [expenses, setExpenses] = useState<IExpense[]>();
	const [sum, setSum] = useState<number>();
	const [categories, setCategories] = useState<ICategory[]>();

	useEffect(() => {
		getExpenses(date!).then(setExpenses); //* Apenas para utilização deste hook para atender solicitação do desafio 
		getExpensesMonth(dispatch, date!).then(dispatch => dispatch()); //* Colocando os mesmos dados no Contexto
	}, [date]);

	useEffect(() => {
		const categoriesOfMonth = () => {
			const categories = expenses!.map(expense => expense.categoria);
			const uniqueCategories = [...new Set(categories)];
			const sumOfTheCategories: ICategory[] = uniqueCategories.map(category => {
				const expensesByCategory = expenses!.filter(expense => expense.categoria === category).map(expense => expense.valor);
				const sum = expensesByCategory.reduce((acc: number, value: number) => acc + value, 0);
				return { categoria: category, valor: sum };
			});
			setCategories(sumOfTheCategories);
		};

		const sumOfMonth = () => {
			const values = expenses!.map(expense => expense.valor);
			const sum = values.reduce((acc: number, value: number) => acc + value, 0);
			setSum(sum);
		};

		if (expenses) {
			categoriesOfMonth();
			sumOfMonth();
		};
	}, [expenses]);

	return { expenses, sum, categories };
};

export default useExpenses;