import { useEffect, useState } from 'react';
import { getUser } from '../contexts/UserAuthContext/actions';
import { IUser } from './../@types/expenses';

const useUser = () => {
	const [user, setUser] = useState<IUser | null>(null);

	useEffect(() => {
		getUser().then(setUser, signOut);
	}, []);

	const signOut = () => {
		setUser(null);
	};

	return { user, setUser, signOut };
};

export default useUser;