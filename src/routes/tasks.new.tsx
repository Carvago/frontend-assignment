import {createFileRoute, Navigate} from '@tanstack/react-router';
import {TaskForm} from '../pages/TaskForm';
import {useAuth} from '../context/AuthContext';

function NewTaskRouteComponent() {
  const {isAuthenticated, isLoading} = useAuth();
  if (isLoading) return null;
  if (!isAuthenticated) return <Navigate to="/login" />;
  return <TaskForm />;
}

export const Route = createFileRoute('/tasks/new')({
  component: NewTaskRouteComponent,
});
