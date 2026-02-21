export interface AuthCredentials {
  username: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
  username: string;
  createdAt: string;
}

export interface AuthErrorResponse {
  error: string;
}
