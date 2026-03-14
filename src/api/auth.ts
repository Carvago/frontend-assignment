import client from './client';

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

interface Credentials {
  username: string;
  password: string;
}

export async function login(credentials: Credentials): Promise<AuthResponse> {
  const {data} = await client.post<AuthResponse>('/login', credentials);
  localStorage.setItem('token', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  return data;
}
