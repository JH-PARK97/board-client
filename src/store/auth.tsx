import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserItem } from '../api/auth/login.type';

type CustomUserItem = Omit<UserItem, 'password'>;

interface AuthStore {
    isLogin: boolean;
    user: CustomUserItem | null;
    email?: string | null;
    isSaved: boolean;
    login: (user: CustomUserItem, isSaved: boolean) => void;
    logout: () => void;
}

export const useAuthStore = create(
    persist<AuthStore>(
        (set, get) => ({
            isLogin: localStorage.getItem('accessToken') !== null,
            user: null,
            isSaved: false,
            login: (user: CustomUserItem, isSaved: boolean) => {
                set({ isLogin: true, user: user, isSaved: isSaved });
            },
            logout: () => {
                localStorage.removeItem('accessToken');

                set({ isLogin: false, user: null, email: get().user?.email });
            },
        }),

        {
            name: 'auth-storage',
        }
    )
);
