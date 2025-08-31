import { create } from 'zustand';
import { checkAuth } from "../utils/checkAuth";

export type AuthState = {
    isLoggedIn: boolean;
    isLoading: boolean;
    actions: {
        login: () => void;
        logout: () => void;
    }
}

export const useAuthStore = create<AuthState>((set) => {
    const resolveAuthState = async () => {
        const authState = await checkAuth();
        set({ isLoggedIn: authState });
      };
    
      (async () => {
        try {
          await resolveAuthState();
        } catch (error) {
          console.error(error);
        } finally {
          set({ isLoading: false });
        }
      })();
    
    return {
        isLoggedIn: false,
        isLoading: true,
        actions: {
            login: () => set({ isLoggedIn: true }),
            logout: () => set({ isLoggedIn: false, }),
        },
    }
});
