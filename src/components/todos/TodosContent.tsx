import {TodosEmpty} from './TodosEmpty';
import {TodosSkeleton} from './TodosSkeleton';
import {TodosError} from './TodosError';
import {TodoList} from './TodoList';
import {useTodos} from '../../api/todo/queries';

export function TodosContent() {
  const {data, isLoading, error} = useTodos();

  if (isLoading) {
    return <TodosSkeleton />;
  }

  if (error) {
    return <TodosError error={error} />;
  }

  if (!data || data.length === 0) {
    return <TodosEmpty />;
  }

  return <TodoList todos={data} />;
}
