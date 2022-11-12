import { Fragment } from 'react';
import Head from 'next/head';
import { useAtom } from 'jotai';
import Link from 'next/link';

import '../../../config/firebaseConfig';

import styles from './css/styles.module.scss';

import { jotaiAuthState } from '../../../jotai/states/jotaiAuthState';

import FirebaseLogin from './component/FirebaseLogin';

const Homepage = () => {
	const [authState] = useAtom(jotaiAuthState);

	// -----
	// useRefs

	// -----
	// useStates

	return (
		<Fragment>
			<Head>
				<title>Code Editor</title>
			</Head>
			<section>
				<div className='container-sm py-5'>
					<div className={styles.s__containerOuter}>
						<div className={styles.s__container}>
							<div>
								<h1 className='text-center pb-5'>Code Editor</h1>
								<p className={'text-center pb-3'}>
									The Online Code Editor is a simple, basic code editor that
									allows you to write and edit code online. It has a basic set of
									features, including syntax highlighting, line numbers, and a
									basic search and replace function.
								</p>

								<div className={'text-center pb-3'}>
									{authState.statusIsLoggedIn && (
										<Link
											className={'btn btn-primary rounded-0'}
											href={'/dashboard/user'}
										>
											Dashboard
										</Link>
									)}

									{!authState.statusIsLoggedIn && (
										<div>
											<FirebaseLogin />
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Fragment>
	);
};

export default Homepage;
