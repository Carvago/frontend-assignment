import {APIRequestContext} from '@playwright/test';

const API_BASE = 'http://localhost:3001';

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export function uniqueUsername(): string {
  return `user_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export async function registerViaApi(
  request: APIRequestContext,
  username: string,
  password: string
): Promise<AuthTokens> {
  const response = await request.post(`${API_BASE}/api/register`, {
    data: {username, password},
  });
  return response.json();
}

export async function createTodoViaApi(
  request: APIRequestContext,
  token: string,
  title: string,
  description?: string
) {
  const response = await request.post(`${API_BASE}/api/todo`, {
    headers: {Authorization: `Bearer ${token}`},
    data: {title, description},
  });
  return response.json();
}
