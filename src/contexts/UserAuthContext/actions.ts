import { auth, get, post } from './../../services/httpService';
import { IUser } from './../../@types/expenses';

export const getUser = async (): Promise<IUser> => {
	const user = await get(`/sessao/usuario`);
	return user;
};

export const signIn = async (email: string, password: string): Promise<IUser> => {
	const user = await auth(`/sessao/criar`, email, password);
	return user;
};

export const signOut = async (): Promise<IUser> => {
	const user = await post(`/sessao/finalizar`);
	return user;
};