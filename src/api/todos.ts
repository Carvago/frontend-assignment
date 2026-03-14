import client from './client';

import type {Todo} from '@/types';

export async function getTodos(): Promise<Todo[]> {
  const {data} = await client.get<{todos: Todo[]}>('/todo/list');
  return data.todos;
}

export async function createTodo(payload: Pick<Todo, 'title' | 'description'>): Promise<Todo> {
  const {data} = await client.post<Todo>('/todo', payload);
  return data;
}

export async function getTodo(id: string): Promise<Todo> {
  const {data} = await client.get<Todo>(`/todo/${id}`);
  return data;
}

export async function updateTodo(id: string, payload: Pick<Todo, 'title' | 'description'>): Promise<Todo> {
  const {data} = await client.put<Todo>(`/todo/${id}`, payload);
  return data;
}

export async function deleteTodo(id: string): Promise<void> {
  await client.delete(`/todo/${id}`);
}

export async function completeTodo(id: string): Promise<void> {
  await client.post(`/todo/${id}/complete`);
}

export async function incompleteTodo(id: string): Promise<void> {
  await client.post(`/todo/${id}/incomplete`);
}
