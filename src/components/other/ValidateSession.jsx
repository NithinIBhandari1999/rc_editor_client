import { Fragment, useEffect } from 'react';
import axios from 'axios';
import { useSetAtom } from 'jotai';
import { jotaiAuthState, authStateDefault } from '../../jotai/states/jotaiAuthState';

import envKeys from '../../config/envKeys';

const ValidateSession = () => {
    const setAuthState = useSetAtom(jotaiAuthState);

	// -----
	// useEffect
	useEffect(() => {
		console.log({
			validateSession: 'validateSession',
		});
        validateSession();
	}, []);

    // -----
    // functions
    const validateSession = async () => {
		try {

			const res = await axios.get(
				`${envKeys.BACKEND_URL}/api/user/validateSession/validateSession`,
				{
					withCredentials: true,
				}
			);

			const authState = res.data.data.authState;

            console.log({
                d: res.data.data
            });

			setAuthState(authState);
		} catch (error) {
			console.error(error);
			setAuthState(authStateDefault);
		}
	};

	return <Fragment />;
};

export default ValidateSession;
