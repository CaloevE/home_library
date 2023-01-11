import {FC, lazy, Suspense, useEffect} from 'react';
import {Navigate, RouteObject, useLocation, useRoutes} from 'react-router';

// eslint-disable-next-line @typescript-eslint/no-explicit-any,react/display-name
const Loadable = (Component: FC) => (props: any) => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Component {...props} />
		</Suspense>
	);
};

const Page = {
	Library: {
		List: Loadable(lazy(() => import('./local_Library'))),
		Book: {
			List: Loadable(lazy(() => import('./local_Library/'))),
			Id: Loadable(lazy(() => import('./local_Library/_bookId'))),
		},
	},
	Error404: Loadable(lazy(() => import('./error404'))),
};

const routes: Array<RouteObject> = [
	{
		path: '/',
		children: [{
			path: '/',
			element: <Navigate to="/project"
			                   replace/>
		}],
	},
	{
		path: '/project',
		children: [
			{index: true, element: <Page.Library.List/>},
			{
				path: ':projectId',
				children: [
					{
						index: true,
						element: <Navigate to="./book"
						                   replace/>
					},
					{
						path: 'book',
						children: [
							{index: true, element: <Page.Library.Book.List/>},
							{path: ':bookId', element: <Page.Library.Book.Id/>},
						],
					},
				],
			},
		],
	},
	{
		path: '*',
		element: <Page.Error404/>,
	},
];

const Router: FC = () => {
	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	return useRoutes(routes);
};

export default Router;
