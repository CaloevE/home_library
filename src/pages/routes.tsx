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
		Books: {
			List: Loadable(lazy(() => import('./library/books'))),
		},
		Shelves: {
			List: Loadable(lazy(() => import('./library/shelves'))),
		},
	},
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
				path: 'books',
				children: [
					{
						index: true,
						element: <Page.Library.Books.List/>
					},
				],
			},
			{
				path: 'shelves',
				children: [
					{
						index: true,
						element: <Page.Library.Shelves.List/>
					},
				],
			},
		],
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
