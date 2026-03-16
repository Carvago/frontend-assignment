import Cookies from 'js-cookie';

import client from './client';

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

interface Credentials {
  username: string;
  password: string;
  fullName?: string;
}

function saveTokens(data: AuthResponse): void {
  Cookies.set('token', data.accessToken, {sameSite: 'strict'});
  Cookies.set('refreshToken', data.refreshToken, {sameSite: 'strict'});
}

export function clearTokens(): void {
  Cookies.remove('token');
  Cookies.remove('refreshToken');
}

export async function login(credentials: Credentials): Promise<AuthResponse> {
  const {data} = await client.post<AuthResponse>('/login', credentials);
  saveTokens(data);
  return data;
}

export async function register(credentials: Credentials): Promise<AuthResponse> {
  const {data} = await client.post<AuthResponse>('/register', credentials);
  saveTokens(data);
  return data;
}
