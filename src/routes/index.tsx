import {createFileRoute, Navigate} from '@tanstack/react-router';
import {Dashboard} from '../pages/Dashboard';
import {useAuth} from '../context/AuthContext';

function HomeComponent() {
  const {isAuthenticated, isLoading} = useAuth();
  if (isLoading) return null;
  if (!isAuthenticated) return <Navigate to="/login" />;
  return <Dashboard />;
}

export const Route = createFileRoute('/')({
  component: HomeComponent,
});
