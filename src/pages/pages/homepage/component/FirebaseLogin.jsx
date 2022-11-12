import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSetAtom } from 'jotai';

import '../../../../config/firebaseConfig';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';

import { jotaiAuthState, authStateDefault } from '../../../../jotai/states/jotaiAuthState';
import envKeys from '../../../../config/envKeys';

const provider = new GoogleAuthProvider();

const FirebaseLogin = () => {
	const auth = getAuth();

	const setAuthState = useSetAtom(jotaiAuthState);

	// -----
	// useRefs
	const useEffect1Ref = useRef(true);

	// -----
	// useStates
	const [currentUser, setCurrentUser] = useState(null);
	const [requestCurrentUser, setRequestCurrentUser] = useState({
		loading: true,
		success: '',
		error: '',
	});

	useEffect(() => {
		if (useEffect1Ref?.current === true) {
			onAuthStateChanged(auth, (user) => {
				if (user) {
					setCurrentUser(user);

					loginByFirebaseToken(user.accessToken);

					setRequestCurrentUser({
						loading: false,
						success: '',
						error: '',
					});
				} else {
					setCurrentUser(null);

					setAuthState(authStateDefault);

					setRequestCurrentUser({
						loading: false,
						success: '',
						error: '',
					});
				}
			});
		}

		return () => {
			useEffect1Ref.current = true;
		};
	}, []);

	// -----
	// functions
	const customLogIn = () => {
		try {
			setRequestCurrentUser({
				loading: true,
				success: '',
				error: '',
			});

			signInWithPopup(auth, provider)
				.then((result) => {
                    
					// The signed-in user info.
					const user = result.user;
					// ...

					toast.success('Login success');

					setCurrentUser(user);

					setRequestCurrentUser({
						loading: false,
						success: '',
						error: '',
					});
				})
				.catch(() => {
					setRequestCurrentUser({
						loading: false,
						success: '',
						error: '',
					});
				});
		} catch (error) {
			console.log(error);
		}
	};

	const loginByFirebaseToken = async (firebaseToken) => {
		try {
			console.log('validating session');

			const res = await axios.post(
				`${envKeys.BACKEND_URL}/api/user/auth/firebaseLogin`,
				{
					firebaseToken: firebaseToken,
				},
				{
					withCredentials: true,
				}
			);

			const authState = res.data.data.authState;

			setAuthState(authState);
		} catch (error) {
			toast.error('Login Failed. Please try again.');
			console.error(error);
			setAuthState(authStateDefault);
		}
	};

	return (
		<div>
			{requestCurrentUser.loading && (
				<button className={'btn btn-secondary rounded-0'}>Loading</button>
			)}
			{requestCurrentUser.loading === false && !currentUser && (
				<button
					className={'btn btn-primary rounded-0'}
					onClick={() => {
						customLogIn();
					}}
				>
					Google Login or Register
				</button>
			)}
		</div>
	);
};

export default FirebaseLogin;
