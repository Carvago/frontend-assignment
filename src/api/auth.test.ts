import {
  getStoredAccessToken,
  getStoredRefreshToken,
  storeTokens,
  clearTokens,
  login,
  register,
  getCurrentUser,
} from './auth';
import {apiClient} from './client';

jest.mock('./client', () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe('auth storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('getStoredAccessToken returns null when empty', () => {
    expect(getStoredAccessToken()).toBeNull();
  });

  it('getStoredRefreshToken returns null when empty', () => {
    expect(getStoredRefreshToken()).toBeNull();
  });

  it('storeTokens and getStored* round-trip', () => {
    storeTokens({accessToken: 'at', refreshToken: 'rt'});
    expect(getStoredAccessToken()).toBe('at');
    expect(getStoredRefreshToken()).toBe('rt');
  });

  it('clearTokens removes both', () => {
    storeTokens({accessToken: 'at', refreshToken: 'rt'});
    clearTokens();
    expect(getStoredAccessToken()).toBeNull();
    expect(getStoredRefreshToken()).toBeNull();
  });
});

describe('login', () => {
  it('posts credentials and returns tokens', async () => {
    const tokens = {accessToken: 'at', refreshToken: 'rt'};
    mockedApiClient.post.mockResolvedValueOnce({data: tokens});
    const result = await login({username: 'alice', password: 'secret'});
    expect(mockedApiClient.post).toHaveBeenCalledWith('/api/login', {
      username: 'alice',
      password: 'secret',
    });
    expect(result).toEqual(tokens);
  });

  it('propagates API errors', async () => {
    mockedApiClient.post.mockRejectedValueOnce(new Error('Invalid credentials'));
    await expect(login({username: 'x', password: 'y'})).rejects.toThrow('Invalid credentials');
  });
});

describe('register', () => {
  it('posts credentials and returns tokens', async () => {
    const tokens = {accessToken: 'at', refreshToken: 'rt'};
    mockedApiClient.post.mockResolvedValueOnce({data: tokens});
    const result = await register({
      username: 'bob',
      password: 'pass',
      passwordConfirm: 'pass',
    });
    expect(mockedApiClient.post).toHaveBeenCalledWith('/api/register', {
      username: 'bob',
      password: 'pass',
      passwordConfirm: 'pass',
    });
    expect(result).toEqual(tokens);
  });
});

describe('getCurrentUser', () => {
  it('gets /api/user/me and returns user', async () => {
    const user = {id: '1', username: 'alice'};
    mockedApiClient.get.mockResolvedValueOnce({data: user});
    const result = await getCurrentUser();
    expect(mockedApiClient.get).toHaveBeenCalledWith('/api/user/me');
    expect(result).toEqual(user);
  });

  it('propagates API errors', async () => {
    mockedApiClient.get.mockRejectedValueOnce(new Error('Unauthorized'));
    await expect(getCurrentUser()).rejects.toThrow('Unauthorized');
  });
});
