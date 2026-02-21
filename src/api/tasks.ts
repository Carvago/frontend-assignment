import {apiClient} from './client';
import type {Task} from '../types/task';

/** Backend Todo shape (api responses) */
interface TodoDto {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  completed: boolean;
  userId: string;
}

function mapTodoToTask(todo: TodoDto): Task {
  return {
    id: todo.id,
    title: todo.title,
    description: todo.description ?? '',
    completed: todo.completed,
    createdAt: todo.createdAt,
  };
}

export interface TaskListResponse {
  todos: TodoDto[];
}

export async function fetchTaskList(): Promise<Task[]> {
  const {data} = await apiClient.get<TaskListResponse>('/api/todo/list');
  return (data.todos ?? []).map(mapTodoToTask);
}

export async function fetchTask(id: string): Promise<Task> {
  const {data} = await apiClient.get<TodoDto>(`/api/todo/${id}`);
  return mapTodoToTask(data);
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
}

export async function createTask(payload: CreateTaskPayload): Promise<Task> {
  const {data} = await apiClient.post<TodoDto>('/api/todo', {
    title: payload.title.trim(),
    description: (payload.description ?? '').trim() || undefined,
  });
  return mapTodoToTask(data);
}

export async function updateTask(
  id: string,
  updates: {title?: string; description?: string}
): Promise<void> {
  await apiClient.put(`/api/todo/${id}`, updates);
}

export async function deleteTask(id: string): Promise<void> {
  await apiClient.delete(`/api/todo/${id}`);
}

export async function setTaskCompleted(id: string, completed: boolean): Promise<void> {
  const path = completed ? `/api/todo/${id}/complete` : `/api/todo/${id}/incomplete`;
  await apiClient.post(path);
}

/** Seed mock todos for performance testing. Returns number of created tasks. */
export async function seedTasks(count: number = 3000): Promise<{created: number}> {
  const {data} = await apiClient.post<{created: number}>(
    `/api/todo/seed?count=${Math.min(Math.max(1, count), 10000)}`
  );
  return data;
}
