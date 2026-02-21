import {apiClient} from './client';
import type {AuthCredentials, AuthTokens, User} from '../types/auth';

const AUTH_KEYS = {
  ACCESS: 'accessToken',
  REFRESH: 'refreshToken',
} as const;

export function getStoredAccessToken(): string | null {
  return localStorage.getItem(AUTH_KEYS.ACCESS);
}

export function getStoredRefreshToken(): string | null {
  return localStorage.getItem(AUTH_KEYS.REFRESH);
}

export function storeTokens(tokens: AuthTokens): void {
  localStorage.setItem(AUTH_KEYS.ACCESS, tokens.accessToken);
  localStorage.setItem(AUTH_KEYS.REFRESH, tokens.refreshToken);
}

export function clearTokens(): void {
  localStorage.removeItem(AUTH_KEYS.ACCESS);
  localStorage.removeItem(AUTH_KEYS.REFRESH);
}

export async function register(credentials: AuthCredentials): Promise<AuthTokens> {
  const {data} = await apiClient.post<AuthTokens>('/api/register', credentials);
  return data;
}

export async function login(credentials: AuthCredentials): Promise<AuthTokens> {
  const {data} = await apiClient.post<AuthTokens>('/api/login', credentials);
  return data;
}

export async function getCurrentUser(): Promise<User> {
  const {data} = await apiClient.get<User>('/api/user/me');
  return data;
}
