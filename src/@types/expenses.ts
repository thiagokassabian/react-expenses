export interface IExpense {
	id: number;
	descricao: string;
	categoria: string;
	valor: number;
	mes: string;
	dia: string;
}

export interface ICategory {
	categoria: string;
	valor: number;
}

export interface IUser {
	nome: string;
	email: string;
}