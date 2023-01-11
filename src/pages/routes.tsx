import {FC, lazy, Suspense, useEffect} from 'react';
import {Navigate, RouteObject, useLocation, useRoutes} from 'react-router';

import DefaultLayout from "../layouts/Default";

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
		List: Loadable(lazy(() => import('./library'))),
		Book: {
			Id: Loadable(lazy(() => import('./library/_bookId'))),
		},
	},
	Error404: Loadable(lazy(() => import('./error404'))),
};

const routes: Array<RouteObject> = [
	{
		path: '/',
		element: <DefaultLayout/>,
		children: [{
			path: '/',
			element: <Navigate to="/library"
			                   replace/>
		}],
	},
	{
		path: '/library',
		element: <DefaultLayout/>,
		children: [
			{index: true, element: <Page.Library.List/>},
			{
				path: ':bookId',
				children: [
					{
						index: true,
						element: <Page.Library.Book.Id/>
					},
				],
			},
		],
	},
	{
		path: '*',
		element: (
			<DefaultLayout>
				<Page.Error404/>
			</DefaultLayout>),
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
