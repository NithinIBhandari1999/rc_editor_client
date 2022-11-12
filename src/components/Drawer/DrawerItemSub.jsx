import PropTypes from 'prop-types';
import Link from 'next/link';
import { Fragment } from 'react';
import { useRouter } from 'next/router';

import styles from './css/drawerItemSub.module.scss';

const DrawerItemSub = (props) => {
	const nextRouter = useRouter();

	const renderContent = () => {
		return (
			<div
				className={`${styles.s1SidebarItemContainer}`}
				onClick={() => props?.setDrawerStatus(false)}
			>
				<div
					className={`
						${
							nextRouter.asPath === props.linkHref
								? styles.s1SidebarItemLabelActive
								: styles.s1SidebarItemLabel
						}
					`}
				>
					{props.menuName}
				</div>
			</div>
		);
	};

	if (props.linkHref === '') {
		return <Fragment>{renderContent()}</Fragment>;
	}

	return (
		<Link href={props.linkHref} passHref>
			{renderContent()}
		</Link>
	);
};

DrawerItemSub.propTypes = {
    setDrawerStatus: PropTypes.func.isRequired,
    linkHref: PropTypes.string.isRequired,
    menuName: PropTypes.string.isRequired,
};

export default DrawerItemSub;
