import {LogoutOutlined, ProfileOutlined, ProjectOutlined, RocketOutlined, TableOutlined} from '@ant-design/icons';
import {Layout, Menu} from 'antd';
import {MenuProps} from 'antd/lib/menu';
import {FC, memo, ReactNode, useMemo} from 'react';
import {matchPath, useLocation, useParams} from 'react-router';
import {Outlet, useNavigate} from 'react-router-dom';

import styles from './index.module.scss';
import MainMenu from "../../components/mainMenu";
import BookList from "../../components/booksList";

interface DefaultLayoutProps {
	children?: ReactNode;
}

type AvailableProjectPaths = 'daily' | 'retro' | 'planning';

const isActive = (projectPath: AvailableProjectPaths, currentPath: string): boolean => {
	return !!matchPath(`/project/:projectId/${projectPath}`, currentPath);
};

const DefaultLayout: FC<DefaultLayoutProps> = ({children}) => {
	const {projectId} = useParams();

	const navigate = useNavigate();
	const location = useLocation();

	const handleMenuClick: MenuProps['onSelect'] = ({key}) => {
		switch (key) {
			case 'projects':
				navigate('/project');
				break;
			case 'logout':
				console.log('logout action');
				break;
			default: {
				const path = `/project/${projectId}/${key}`;
				navigate(path);
			}
		}
	};

	const activeMenuItem = useMemo<Array<string>>(() => {
		const path = location.pathname;

		if (isActive('daily', path)) {
			return ['daily'];
		}
		if (isActive('retro', path)) {
			return ['retro'];
		}
		if (isActive('planning', path)) {
			return ['planning'];
		}

		return [];
	}, [location]);

	return (
		<Layout>
			<Layout.Header className={styles.header}
			               style={{paddingInline: '0'}}>
				<MainMenu/>
			</Layout.Header>
			<Layout.Content className={styles.body}>
				<BookList/>
			</Layout.Content>
		</Layout>
	);
};

export default memo(DefaultLayout);
