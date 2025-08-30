import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {LoginPage} from '../pages/LoginPage';
import {RegisterPage} from '../pages/RegisterPage';
import {ProtectedRoute} from './ProtectedRoute';
import {Layout} from './Layout';
import { TodosPage } from '../pages/TodosPage';

const RouterContent = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />

    <Route
      path="/todos"
      element={
        <ProtectedRoute>
          <TodosPage />
        </ProtectedRoute>
      }
    />

    <Route
      path="/"
      element={
        <ProtectedRoute>
          <Navigate to="/todos" replace />
        </ProtectedRoute>
      }
    />

    {/* Catch all - redirect to root */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export const AppRouter = () => (
  <BrowserRouter>
    <Layout>
      <RouterContent />
    </Layout>
  </BrowserRouter>
);
