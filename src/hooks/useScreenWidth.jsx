import { useState, useEffect } from 'react';

export const constantScreenListExact = {
	xs: 'xa',
	sm: 'sm',
	md: 'md',
	lg: 'lg',
	xl: 'xl',
	xxl: 'xxl',
};

export const constantScreenList = {
	sm: 'sm',
	lg: 'lg',
};

// X-Small            None	<576px
// Small              sm	≥576px
// Medium             md    ≥768px
// Large       	      lg	≥992px
// Extra large        xl	≥1200px
// Extra extra large  xxl   ≥1400px

export const useScreenWidth = () => {
	const [currentScreen, setCurrentScreen] = useState({
		basic: constantScreenListExact.sm,
		exact: constantScreenListExact.sm,
	});

	const updateDimensions = () => {
		let tempScreenWidth = '';
		let tempScreenWidthExact = '';

		if (window.innerWidth > 0) {
			tempScreenWidth = constantScreenList.sm;
			tempScreenWidthExact = constantScreenListExact.xs;
		}
		if (window.innerWidth >= 576) {
			tempScreenWidth = constantScreenList.sm;
			tempScreenWidthExact = constantScreenListExact.sm;
		}
		if (window.innerWidth >= 768) {
			tempScreenWidth = constantScreenList.sm;
			tempScreenWidthExact = constantScreenListExact.md;
		}
		if (window.innerWidth >= 992) {
			tempScreenWidth = constantScreenList.lg;
			tempScreenWidthExact = constantScreenListExact.lg;
		}
		if (window.innerWidth >= 1200) {
			tempScreenWidth = constantScreenList.lg;
			tempScreenWidthExact = constantScreenListExact.xl;
		}
		if (window.innerWidth >= 1400) {
			tempScreenWidth = constantScreenList.lg;
			tempScreenWidthExact = constantScreenListExact.xxl;
		}

		setCurrentScreen({
			basic: tempScreenWidth,
			exact: tempScreenWidthExact,
		});
	};

	useEffect(() => {
		updateDimensions();
	}, []);

	useEffect(() => {
		window.addEventListener('resize', updateDimensions);
		return () => window.removeEventListener('resize', updateDimensions);
	}, []);

	return [currentScreen];
};

const exportDefault = {
	useScreenWidth,
	constantScreenList,
	constantScreenListExact,
};

export default exportDefault;
