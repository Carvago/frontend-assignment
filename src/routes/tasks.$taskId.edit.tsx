import {createFileRoute, Navigate} from '@tanstack/react-router';
import {TaskForm} from '../pages/TaskForm';
import {useAuth} from '../context/AuthContext';

export const Route = createFileRoute('/tasks/$taskId/edit')({
  component: EditTaskRouteComponent,
});

function EditTaskRouteComponent() {
  const {isAuthenticated, isLoading} = useAuth();
  const {taskId} = Route.useParams();
  if (isLoading) return null;
  if (!isAuthenticated) return <Navigate to="/login" />;
  return <TaskForm taskId={taskId} />;
}
