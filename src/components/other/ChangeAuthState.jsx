import { Fragment, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { jotaiAuthState } from '../../jotai/states/jotaiAuthState';

const ValidateSession = () => {
    const authState = useAtomValue(jotaiAuthState);

	// -----
	// useEffect
	useEffect(() => {
		console.log({
			authState
		});
	}, [authState]);

    // -----
    // functions
    

	return <Fragment />;
};

export default ValidateSession;
