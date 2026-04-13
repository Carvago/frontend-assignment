import Datastore from '@seald-io/nedb';

export type Todo = {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  completed: boolean;
  userId: string;
};
export const todoDB = new Datastore<Todo>({
  filename: 'backend/database/data/todos.db',
  autoload: true,
});
