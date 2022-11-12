import dynamic from 'next/dynamic';

const CombinePage = dynamic(() => import('../../../src/pages/userDashboard/CombinePage'), {
	ssr: false,
});

const Custom = () => {
	return <CombinePage />;
};

export default Custom;
