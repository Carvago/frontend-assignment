export function getAccessToken() {
  return localStorage.getItem('accessToken');
}

export function getRefreshToken() {
  return localStorage.getItem('refreshToken');
}

export function setAccessToken(accessToken: string) {
  localStorage.setItem('accessToken', accessToken);
}

export function setRefreshToken(refreshToken: string) {
  localStorage.setItem('refreshToken', refreshToken);
}

export function setTokens(accessToken: string, refreshToken: string) {
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
}

export function clearTokens() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}
