import {getAccessToken, setAccessToken, getRefreshToken, setTokens, clearTokens} from './storage';

beforeEach(() => {
  localStorage.clear();
});

describe('storage', () => {
  describe('getAccessToken', () => {
    it('returns null when no token is stored', () => {
      expect(getAccessToken()).toBeNull();
    });

    it('returns the stored access token', () => {
      localStorage.setItem('zentask_access_token', 'test-token');
      expect(getAccessToken()).toBe('test-token');
    });
  });

  describe('setAccessToken', () => {
    it('stores the access token in localStorage', () => {
      setAccessToken('new-token');
      expect(localStorage.getItem('zentask_access_token')).toBe('new-token');
    });

    it('overwrites an existing access token', () => {
      setAccessToken('first');
      setAccessToken('second');
      expect(localStorage.getItem('zentask_access_token')).toBe('second');
    });
  });

  describe('getRefreshToken', () => {
    it('returns null when no token is stored', () => {
      expect(getRefreshToken()).toBeNull();
    });

    it('returns the stored refresh token', () => {
      localStorage.setItem('zentask_refresh_token', 'refresh-abc');
      expect(getRefreshToken()).toBe('refresh-abc');
    });
  });

  describe('setTokens', () => {
    it('stores both access and refresh tokens', () => {
      setTokens('access-123', 'refresh-456');
      expect(localStorage.getItem('zentask_access_token')).toBe('access-123');
      expect(localStorage.getItem('zentask_refresh_token')).toBe('refresh-456');
    });
  });

  describe('clearTokens', () => {
    it('removes both tokens from localStorage', () => {
      setTokens('access', 'refresh');
      clearTokens();
      expect(localStorage.getItem('zentask_access_token')).toBeNull();
      expect(localStorage.getItem('zentask_refresh_token')).toBeNull();
    });

    it('does not throw when tokens do not exist', () => {
      expect(() => clearTokens()).not.toThrow();
    });
  });
});
