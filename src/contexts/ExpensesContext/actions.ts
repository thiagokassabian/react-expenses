import { IExpense, IUser } from './../../@types/expenses';
import { Dispatch } from "react";
import { IExpensesAction } from ".";
import { get } from "../../services/httpService";
import { types } from "./types";


export const getExpensesMonth = async (dispatch: Dispatch<IExpensesAction>, month: string): Promise<() => void> => {
	dispatch({ type: types.LOADING });
	const expenses = await get(`/despesas?mes=${month}&_sort=dia`);
	return () => dispatch({ type: types.EXPENSES, payload: { expenses } });
};


//* ACTION PARA UTILIZAÇÃO DO HOOK CUSTOMIZADO APENAS PARA ATENDER REQUISITOS DO DESAFIO
// export const getExpenses = async (month: string): Promise<IExpense[]> => {
// 	const expenses = await get(`/despesas?mes=${month}&_sort=dia`);
// 	return expenses;
// };