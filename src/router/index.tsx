import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { lazy } from 'react';

const Home = lazy(() => import('@/views/Home'));
const Details = lazy(() => import('@/views/Details'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/home" />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/details',
    element: <Details />,
  },
];

export default routes;
