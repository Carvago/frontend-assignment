import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {registerUser, loginUser, getCurrentUser, type UserResponse} from '../api/generated';
import {clearTokens, getAccessToken, setTokens} from '../utils/storage';

type AuthContextType = {
  user: UserResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(() => !!getAccessToken());

  const fetchUser = useCallback(async () => {
    try {
      const response = await getCurrentUser();
      setUser(response);
    } catch {
      clearTokens();
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      const token = getAccessToken();
      if (token) {
        await fetchUser();
      }
      setIsLoading(false);
    };
    initAuth();
  }, [fetchUser]);

  const login = useCallback(
    async (username: string, password: string) => {
      const response = await loginUser({username, password});
      setTokens(response.accessToken, response.refreshToken);
      await fetchUser();
    },
    [fetchUser]
  );

  const register = useCallback(
    async (username: string, password: string) => {
      const response = await registerUser({username, password});
      setTokens(response.accessToken, response.refreshToken);
      await fetchUser();
    },
    [fetchUser]
  );

  const logout = useCallback(() => {
    clearTokens();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
    }),
    [user, isLoading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
