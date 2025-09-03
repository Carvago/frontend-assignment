import {useAuthStore} from './useAuthStore';

export function useIsLoggedIn() {
  const {isLoggedIn, isLoading} = useAuthStore();

  return isLoggedIn && !isLoading;
}
