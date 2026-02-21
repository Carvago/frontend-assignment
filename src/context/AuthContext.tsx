import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {useNavigate} from '@tanstack/react-router';
import {setUnauthorizedHandler} from '../api/client';
import {
  clearTokens,
  getCurrentUser,
  getStoredAccessToken,
  login as apiLogin,
  register as apiRegister,
  storeTokens,
} from '../api/auth';
import type {AuthCredentials, User} from '../types/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (credentials: AuthCredentials) => Promise<void>;
  register: (credentials: AuthCredentials) => Promise<void>;
  logout: () => void;
  authError: string | null;
  clearAuthError: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({children}: {children: ReactNode}) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const loadUser = useCallback(async () => {
    const token = getStoredAccessToken();
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch {
      setUser(null);
      clearTokens();
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = useCallback(
    async (credentials: AuthCredentials) => {
      setAuthError(null);
      try {
        const tokens = await apiLogin(credentials);
        storeTokens(tokens);
        await loadUser();
        navigate({to: '/', replace: true});
      } catch (err: unknown) {
        const message =
          err && typeof err === 'object' && 'response' in err
            ? (err as {response?: {data?: {error?: string}}}).response?.data?.error
            : null;
        setAuthError(message ?? 'Login failed');
        throw err;
      }
    },
    [loadUser, navigate]
  );

  const register = useCallback(
    async (credentials: AuthCredentials) => {
      setAuthError(null);
      try {
        const tokens = await apiRegister(credentials);
        storeTokens(tokens);
        await loadUser();
        navigate({to: '/', replace: true});
      } catch (err: unknown) {
        const message =
          err && typeof err === 'object' && 'response' in err
            ? (err as {response?: {data?: {error?: string}}}).response?.data?.error
            : null;
        setAuthError(message ?? 'Registration failed');
        throw err;
      }
    },
    [loadUser, navigate]
  );

  const logout = useCallback(() => {
    clearTokens();
    setUser(null);
    setAuthError(null);
    navigate({to: '/login', replace: true});
  }, [navigate]);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      clearTokens();
      setUser(null);
      setAuthError(null);
      navigate({to: '/login', replace: true});
    });
  }, [navigate]);

  const clearAuthError = useCallback(() => setAuthError(null), []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      authError,
      clearAuthError,
    }),
    [user, isLoading, login, register, logout, authError, clearAuthError]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
