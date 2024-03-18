import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import { useMemo } from 'react';
import SignUp from './components/auth/SignUp';
import React from 'react';
import Blog from './components/blog/Blog';
import SignIn from './components/auth/SignIn';
import Github from './components/Oauth/Github';
import NotFound from './components/NotFound/NotFound';

export default function App() {
    const router = useMemo(() => {
        return createBrowserRouter([
            {
                path: '*',
                element: <NotFound />,
            },
            {
                path: '/home',
                element: <Blog />,
            },
            {
                path: '/signup',
                element: <SignUp />,
                loader: async () => {
                    return checkLogin();
                },
            },
            {
                path: '/signin',
                element: <SignIn />,
                loader: async () => {
                    return checkLogin();
                },
            },
            {
                path: '/callback/github',
                element: <Github />,
            },
        ]);
    }, []);

    function checkLogin() {
        const token = localStorage.getItem('accessToken');
        const isLogin = !!token;
        if (isLogin) {
            return redirect('/home');
        }
        return isLogin;
    }
    return <RouterProvider router={router}></RouterProvider>;
}
