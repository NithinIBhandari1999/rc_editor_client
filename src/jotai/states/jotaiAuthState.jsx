import { atom } from 'jotai';

export const jotaiAuthState = atom({
	statusIsLoggedIn: false,
	statusEmailVerified: false,

	userId: '',
	userFullName: '',
	userEmail: '',
});

export const authStateDefault = {
	statusIsLoggedIn: false,
	statusEmailVerified: false,
	userId: '',
	userFullName: '',
	userEmail: '',
};
