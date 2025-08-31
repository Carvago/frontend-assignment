import {BrowserRouter, useRoutes} from 'react-router';
import {LoginPage} from '../pages/LoginPage';
import {RegisterPage} from '../pages/RegisterPage';
import {Layout} from './Layout';
import { TodosPage } from '../pages/TodosPage';
import { ProtectedRoute } from './ProtectedRoute';
import { UnProtectedRoute } from './UnProtectedRoute';

const routeConfig = [
  {
    path: '/login',
    element: <UnProtectedRoute><LoginPage /></UnProtectedRoute>,
  },
  {
    path: '/register',
    element: <UnProtectedRoute><RegisterPage /></UnProtectedRoute>,
  },
  {
    path: '/',
    element: <ProtectedRoute><TodosPage /></ProtectedRoute>,
  },
];

const Routes = () => {
  const element = useRoutes(routeConfig);
  return element;
}

export const AppRouter = () => (
  <BrowserRouter>
    <Layout>
      <Routes /> 
    </Layout>
  </BrowserRouter>
);
