import PropTypes from 'prop-types';

import { Toaster } from 'react-hot-toast';

import { Provider } from 'jotai';

import '../styles/globals.css';

import 'bootstrap/dist/css/bootstrap.css';

import ChangeAuthState from '../src/components/other/ChangeAuthState';
import ValidateSession from '../src/components/other/ValidateSession';

const MyApp = ({ Component, pageProps }) => {
	return (
		<div>
			<Provider>
				<Toaster position='top-right' />
                <ValidateSession />
                <ChangeAuthState />
				<Component {...pageProps} />
			</Provider>
		</div>
	);
};

MyApp.propTypes = {
	Component: PropTypes.element.isRequired,
	pageProps: PropTypes.any.isRequired,
};

export default MyApp;
