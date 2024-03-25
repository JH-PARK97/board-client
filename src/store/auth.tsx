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
    logout: (isSaved: boolean, email: string | null) => void;
    id?: string;
    subscribeAccessToken: (isSaved: boolean, email: string | null) => void;
}

export const useAuthStore = create(
    persist<AuthStore>(
        (set, get) => ({
            isLogin: !!localStorage.getItem('accessToken'),
            user: null,
            isSaved: false,
            login: (user: CustomUserItem, isSaved: boolean) => {
                set({ isLogin: true, user: user, isSaved, email: get().user?.email });
            },
            logout: (isSaved: boolean, email: string | null) => {
                localStorage.removeItem('accessToken');
                set({ isLogin: false, user: null, email: email, isSaved: isSaved });
            },
            // localStorage에서 accessToken의 값의 변화에 반응
            subscribeAccessToken: (isSaved: boolean, email: string | null) => {
                window.addEventListener('storage', () => {
                    console.log(!!localStorage.getItem('accessToken'));
                    // set({ isLogin: !!localStorage.getItem('accessToken'), user: null, email: email, isSaved: isSaved });
                });
            },
        }),

        {
            name: 'auth-storage',
        }
    )
);
