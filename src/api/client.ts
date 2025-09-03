import axios, { AxiosResponse } from 'axios';
import { components } from '../../types/api';
import { clearTokens, getAccessToken, getRefreshToken, setAccessToken } from '../utils/tokenHelpers';

export type TodoResponse = components['schemas']['TodoResponse'];
export type TodoRequest = components['schemas']['TodoRequest'];
export type UserCredentials = components['schemas']['User'];
export type AuthTokens = components['schemas']['Tokens'];
export type TodoListResponse = components['schemas']['TodoResponse'][];
export type TodoListApiResponse = { todos: TodoListResponse };

const API_BASE_URL = 'http://localhost:3001';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;

      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const response = await apiClient.post('/api/refresh-token', { refreshToken });
          const { accessToken } = response.data;

          setAccessToken(accessToken);
        } catch (refreshError) {
          clearTokens();
          window.location.href = '/login';
        }

        return apiClient.request(error.config);
      } else {
        clearTokens();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export class ApiClient {
  async register(credentials: UserCredentials): Promise<AuthTokens> {
    const response: AxiosResponse<AuthTokens> = await apiClient.post('/api/register', credentials);
    return response.data;
  }

  async login(credentials: UserCredentials): Promise<AuthTokens> {
    const response: AxiosResponse<AuthTokens> = await apiClient.post('/api/login', credentials);
    return response.data;
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    const response = await apiClient.post('/api/refresh-token', { refreshToken });
    return response.data;
  }

  async getTodos(): Promise<TodoListResponse> {
    const response: AxiosResponse<TodoListApiResponse> = await apiClient.get('/api/todo/list');
    return response.data.todos;
  }

  async getTodoById(id: string): Promise<TodoResponse> {
    const response: AxiosResponse<TodoResponse> = await apiClient.get(`/api/todo/${id}`);
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(response.data);
      }, 2000);
    });
  }

  async createTodo(todo: TodoRequest): Promise<TodoResponse> {
    const response: AxiosResponse<TodoResponse> = await apiClient.post('/api/todo', todo);
    return response.data;
  }

  async updateTodo(id: string, todo: TodoRequest): Promise<TodoResponse> {
    const response: AxiosResponse<TodoResponse> = await apiClient.put(`/api/todo/${id}`, todo);
    return response.data;
  }

  deleteTodo(id: string): Promise<AxiosResponse<void>> {
    return apiClient.delete(`/api/todo/${id}`);
  }

  markTodoComplete(id: string): Promise<AxiosResponse<void>> {
    return apiClient.post(`/api/todo/${id}/complete`);
  }

  markTodoIncomplete(id: string): Promise<AxiosResponse<void>> {
    return apiClient.post(`/api/todo/${id}/incomplete`);
  }
}

export const api = new ApiClient();
