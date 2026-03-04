export type Todo = {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  completed: boolean;
  userId: string;
};

export type TodoListResponse = {
  todos: Todo[];
};

export type CreateTodoRequest = {
  title: string;
  description?: string;
};

export type UpdateTodoRequest = {
  title: string;
  description?: string;
};
