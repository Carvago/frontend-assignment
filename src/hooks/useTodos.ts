'use client';

import {useEffect, useState} from 'react';

import {getTodos, createTodo, deleteTodo, completeTodo, incompleteTodo} from '@/api/todos';
import type {Todo} from '@/types';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const handleCreate = async (payload: Pick<Todo, 'title' | 'description'>) => {
    const todo = await createTodo(payload);
    setTodos(prev => [todo, ...prev]);
  };

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const handleToggleComplete = async (todo: Todo) => {
    const action = todo.completed ? incompleteTodo : completeTodo;
    await action(todo.id);
    setTodos(prev => prev.map(t => (t.id === todo.id ? {...t, completed: !t.completed} : t)));
  };

  return {todos, isLoading, handleCreate, handleDelete, handleToggleComplete};
}
