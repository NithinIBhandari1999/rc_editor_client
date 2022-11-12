import PropTypes from 'prop-types';
import Link from 'next/link';
import { Fragment } from 'react';
import { useRouter } from 'next/router';

import styles from './css/drawerItemMain.module.scss';

const DrawerItemMain = (props) => {
	const nextRouter = useRouter();

	const renderContent = () => {
		return (
			<div
				className={`${styles.s1SidebarItemContainer}`}
				onClick={() => props?.setDrawerStatus(false)}
			>
				<img
					src={
						nextRouter.asPath === props.linkHref
							? props?.menuIcon
							: props?.menuIconActive
					}
					alt=''
					className={`${styles.s1SidebarItemImage}`}
				/>
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

DrawerItemMain.propTypes = {
    setDrawerStatus: PropTypes.func.isRequired,
    linkHref: PropTypes.string.isRequired,
    menuIcon: PropTypes.string.isRequired,
    menuIconActive: PropTypes.string.isRequired,
    menuName: PropTypes.string.isRequired,
};

export default DrawerItemMain;
