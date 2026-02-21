import {createFileRoute, Navigate} from '@tanstack/react-router';
import {Login} from '../pages/Login';
import {useAuth} from '../context/AuthContext';

function LoginRouteComponent() {
  const {isAuthenticated, isLoading} = useAuth();
  if (isLoading) return null;
  if (isAuthenticated) return <Navigate to="/" replace />;
  return <Login />;
}

export const Route = createFileRoute('/login')({
  component: LoginRouteComponent,
});
