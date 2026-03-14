'use client';

import {useEffect, useState} from 'react';

import {getTodos, deleteTodo, completeTodo, incompleteTodo} from '@/api/todos';
import type {Todo} from '@/types';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setError('Failed to load todos. Please try again.'))
      .finally(() => setIsLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const handleToggleComplete = async (todo: Todo) => {
    const action = todo.completed ? incompleteTodo : completeTodo;
    await action(todo.id);
    setTodos(prev => prev.map(t => (t.id === todo.id ? {...t, completed: !t.completed} : t)));
  };

  return {todos, isLoading, error, handleDelete, handleToggleComplete};
}
