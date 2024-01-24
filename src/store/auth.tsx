import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserItem } from '../api/auth/login.type';

type CustomUserItem = Omit<UserItem, 'password'>;

interface AuthStore {
    isLogin: boolean;
    user: CustomUserItem | null;
    login: (user: CustomUserItem) => void;
    logout: () => void;
}

export const useAuthStore = create(
    persist<AuthStore>(
        (set) => ({
            isLogin: localStorage.getItem('accessToken') !== null,
            user: null,
            login: (user: CustomUserItem) => {
                set({ isLogin: true, user: user });
            },
            logout: () => {
                localStorage.removeItem('accessToken');
                set({ isLogin: false, user: null });
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);
