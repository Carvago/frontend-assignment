import {createFileRoute, Navigate} from '@tanstack/react-router';
import {Register} from '../pages/Register';
import {useAuth} from '../context/AuthContext';

function RegisterRouteComponent() {
  const {isAuthenticated, isLoading} = useAuth();
  if (isLoading) return null;
  if (isAuthenticated) return <Navigate to="/" replace />;
  return <Register />;
}

export const Route = createFileRoute('/register')({
  component: RegisterRouteComponent,
});
