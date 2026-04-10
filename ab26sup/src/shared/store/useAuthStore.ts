import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  name: string;
  email: string;
  current_odo: number;
  daily_avg_km: number;
  avatar_url?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  rememberMe: boolean;
  setAuth: (user: User, token: string, rememberMe?: boolean) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  setRememberMe: (rememberMe: boolean) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      rememberMe: true,
      setAuth: (user, token, rememberMe = true) => 
        set({ user, token, isAuthenticated: true, rememberMe }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      updateUser: (newUser) => set((state) => ({
        user: state.user ? { ...state.user, ...newUser } : null
      })),
      setRememberMe: (rememberMe) => set({ rememberMe }),
    }),
    {
      name: 'ab26-auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAuthStore;
