import PropTypes from 'prop-types'; 
import { Fragment, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useScreenWidth, constantScreenList } from '../../../hooks/useScreenWidth';

import styles from './css/drawer.module.scss';
import stylesDrawerHeader from './css/drawerHeader.module.scss';

import DrawerItemMain from '../../../components/Drawer/DrawerItemMain';
import DrawerItemSub from '../../../components/Drawer/DrawerItemSub';

import imgIconClose from './img/imgIconClose.svg';
import imgIconMenu from './img/imgIconMenu.svg';

import imgIconProfile from './img/notactive/imgIconProfile.svg';
import imgIconProfileActive from './img/active/imgIconProfile.svg';

import imgIconLogout from './img/notactive/imgIconLogout.svg';
import imgIconLogoutActive from './img/active/imgIconLogout.svg';

const DrawerUser = (props) => {
	const nextRouter = useRouter();

	const [drawerStatus, setDrawerStatus] = useState(false);
	const [currentScreen] = useScreenWidth();

	const renderHeader = () => {
		return (
			<div className={`${stylesDrawerHeader.componentHeader}`}>
				<nav className={stylesDrawerHeader.headerContainer1}>
					<div className={stylesDrawerHeader.headerContainer2}>
						<Link href='/' className={stylesDrawerHeader.headerWebsiteName}>
							RT Editor
						</Link>

						<div>
							{constantScreenList.sm === currentScreen.basic ? (
								<div>
									<div
										className={`${stylesDrawerHeader.headerIconMenuContainer}`}
									>
										<img
											src={drawerStatus ? imgIconClose.src : imgIconMenu.src}
											alt=''
											className={`${stylesDrawerHeader.headerIconMenu}`}
											onClick={() =>
												setDrawerStatus(drawerStatus ? false : true)
											}
										/>
									</div>
								</div>
							) : (
								<Fragment>
									<Link
										href={'/search'}
										className={`${stylesDrawerHeader.headerLink} ${
											nextRouter.pathname.includes('/search')
												? stylesDrawerHeader.headerLinkActive
												: ''
										}`}
									>
										Search
									</Link>

									<Link
										href='/logout'
										className={`${stylesDrawerHeader.headerLink} ${
											nextRouter.pathname.includes('/logout')
												? stylesDrawerHeader.headerLinkActive
												: ''
										}}`}
									>
										Logout
									</Link>
								</Fragment>
							)}
						</div>
					</div>
				</nav>
			</div>
		);
	};

	const renderSidebar = () => {
		return (
			<div>
				{/* Link Profile */}
				<DrawerItemMain
					linkHref={'/dashboard/user/profile'}
					menuName={'Profile'}
					setDrawerStatus={setDrawerStatus}
					menuIcon={imgIconProfile.src}
					menuIconActive={imgIconProfileActive.src}
				/>

				{/* Link Project */}
				<DrawerItemMain
					linkHref={''}
					menuName={'Project'}
					setDrawerStatus={setDrawerStatus}
					menuIcon={imgIconProfile.src}
					menuIconActive={imgIconProfileActive.src}
				/>

				{/* Link Project Add */}
				<DrawerItemSub
					linkHref={'/dashboard/user/project/add'}
					menuName={'Add'}
					setDrawerStatus={setDrawerStatus}
				/>

				{/* Link Project List */}
				<DrawerItemSub
					linkHref={'/dashboard/user/project/list'}
					menuName={'List'}
					setDrawerStatus={setDrawerStatus}
				/>

				{/* Link Logout */}
				<DrawerItemMain
					linkHref={'/logout'}
					menuName={'Logout'}
					setDrawerStatus={setDrawerStatus}
					menuIcon={imgIconLogout.src}
					menuIconActive={imgIconLogoutActive.src}
				/>
			</div>
		);
	};

	const renderMain = () => {
		return (
			<div
				style={{
					display: 'flex',
				}}
			>
				{/* Left Side */}
				<div
					className={`${styles.sidebarContainer}
						${
							currentScreen.basic === constantScreenList.sm && drawerStatus === false
								? styles.sidebarContainerSm
								: ''
						}
					`}
				>
					{/* Left Content */}
					<div className={`${styles.sidebarContainer2}`}>{renderSidebar()}</div>
				</div>

				{/* Right Side */}
				<div
					className={
						currentScreen.basic === constantScreenList.sm
							? styles.rightSide
							: styles.rightSideLg
					}
				>
					{/* Right Content */}
					<div>{props.children}</div>
				</div>
			</div>
		);
	};

	return (
		<div
			style={{
				paddingTop: '60px',
				minHeight: 'calc(100vh - 60px)',
			}}
		>
			{renderHeader()}
			{renderMain()}
			{renderHeader()}
		</div>
	);
};

DrawerUser.propTypes  = {
    children: PropTypes.element.isRequired
};

export default DrawerUser;
