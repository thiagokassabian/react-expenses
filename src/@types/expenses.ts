export interface IExpense {
	id: number;
	descricao: string;
	categoria: string;
	valor: number;
	mes: string;
	dia: string;
}
// export type ExpensesContextType = {
// 	expenses: IExpense[];
// 	setState: React.Dispatch<React.SetStateAction<IExpense>>;
// 	save: (expense: IExpense) => void;
// };