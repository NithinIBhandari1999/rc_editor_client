import { Route, Switch } from 'wouter';

import Drawer from './drawer/Drawer';

import ProjectList from './project/ProjectList';
import ProjectAdd from './project/ProjectAdd';
import EditorPage from './editor/EditorPage';

const CombinePage = () => {
	return (
		<div>
			<Drawer>
				<Switch>
					<Route path='/dashboard/user/profile' component={ProjectList} />
					<Route path='/dashboard/user/project/list' component={ProjectList} />
					<Route path='/dashboard/user/project/add' component={ProjectAdd} />
					<Route path='/dashboard/user/editor/:id' component={EditorPage} />
				</Switch>
			</Drawer>
		</div>
	);
};

export default CombinePage;
