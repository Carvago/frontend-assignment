export type User = {
  id: string;
  username: string;
  createdAt: string;
};

export type LoginRequest = {
  username: string;
  password: string;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

export type RefreshTokenResponse = {
  accessToken: string;
};
