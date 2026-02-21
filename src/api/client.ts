import axios, {type InternalAxiosRequestConfig} from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const AUTH_KEYS = {
  ACCESS: 'accessToken',
  REFRESH: 'refreshToken',
} as const;

function clearStoredTokens(): void {
  localStorage.removeItem(AUTH_KEYS.ACCESS);
  localStorage.removeItem(AUTH_KEYS.REFRESH);
}

let onUnauthorized: () => void = () => {};

export function setUnauthorizedHandler(handler: () => void): void {
  onUnauthorized = handler;
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(AUTH_KEYS.ACCESS);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  if (refreshPromise) return refreshPromise;
  const refreshToken = localStorage.getItem(AUTH_KEYS.REFRESH);
  if (!refreshToken) return null;
  refreshPromise = axios
    .post<{accessToken: string}>(`${API_BASE_URL}/api/refresh-token`, {
      refreshToken,
    })
    .then((res) => {
      const accessToken = res.data.accessToken;
      if (accessToken) localStorage.setItem(AUTH_KEYS.ACCESS, accessToken);
      return accessToken;
    })
    .catch(() => null)
    .finally(() => {
      refreshPromise = null;
    });
  return refreshPromise;
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    if (error.response?.status !== 401 || originalConfig._retry) {
      return Promise.reject(error);
    }
    originalConfig._retry = true;
    const newToken = await refreshAccessToken();
    if (newToken) {
      originalConfig.headers.Authorization = `Bearer ${newToken}`;
      return apiClient.request(originalConfig);
    }
    clearStoredTokens();
    onUnauthorized();
    return Promise.reject(error);
  }
);
