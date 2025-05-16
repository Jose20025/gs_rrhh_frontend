import type { User } from '@/types/user';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface StoreState {
  isAuthenticated: boolean;
  user: User | null;

  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<StoreState>()(
  persist(
    (set) => ({
      // isAuthenticated: import.meta.env.DEV ? true : false,
      isAuthenticated: false,
      user: null,

      login: (user: User) => set(() => ({ isAuthenticated: true, user })),
      logout: () => set(() => ({ isAuthenticated: false, user: null })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
