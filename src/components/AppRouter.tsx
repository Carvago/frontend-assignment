import {BrowserRouter, Navigate, useRoutes} from 'react-router';
import {LoginPage} from '../pages/LoginPage';
import {RegisterPage} from '../pages/RegisterPage';
import {Layout} from './Layout';
import {TodosPage} from '../pages/TodosPage';
import {ProtectedRoute} from './ProtectedRoute';
import {UnProtectedRoute} from './UnProtectedRoute';
import {TodoDetailPage} from '../pages/TodoDetailPage';
import {TodoCreatePage} from '../pages/TodoCreatePage';
import {TodoEditPage} from '../pages/TodoEditPage';
import {NotFound} from '../pages/NotFound';

const routeConfig = [
  {
    path: '/login',
    element: (
      <UnProtectedRoute>
        <LoginPage />
      </UnProtectedRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <UnProtectedRoute>
        <RegisterPage />
      </UnProtectedRoute>
    ),
  },
  {
    path: '/',
    element: <Navigate to="/todos" replace />,
  },
  {
    path: '/todos',
    element: (
      <ProtectedRoute>
        <TodosPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/todos/create',
    element: (
      <ProtectedRoute>
        <TodoCreatePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/todos/:id',
    element: (
      <ProtectedRoute>
        <TodoDetailPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/todos/:id/edit',
    element: (
      <ProtectedRoute>
        <TodoEditPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

const Routes = () => {
  const element = useRoutes(routeConfig);
  return element;
};

export const AppRouter = () => (
  <BrowserRouter>
    <Layout>
      <Routes />
    </Layout>
  </BrowserRouter>
);
