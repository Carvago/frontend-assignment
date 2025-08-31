let token: string | null = null;
let refreshToken: string | null = null;

export function getAccessToken() {
    if (!token) {
        token = localStorage.getItem('accessToken');
    }
    return token;
}

export function getRefreshToken() {
    if (!refreshToken) {
        refreshToken = localStorage.getItem('refreshToken');
    }
    return refreshToken;
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
