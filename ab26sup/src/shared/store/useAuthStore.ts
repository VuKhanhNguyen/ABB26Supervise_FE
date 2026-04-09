import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  email: string;
  current_odo: number;
  daily_avg_km: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
  updateUser: (newUser) => set((state) => ({
    user: state.user ? { ...state.user, ...newUser } : null
  })),
}));

export default useAuthStore;
