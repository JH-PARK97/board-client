import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useMemo } from 'react';
import SignUp from './components/auth/SignUp';
import React from 'react';
import Blog from './components/blog/Blog';
import SignIn from './components/auth/SignIn';
import Github from './components/Oauth/Github';

export default function App() {
    const router = useMemo(() => {
        return createBrowserRouter([
            {
                path: '*',
                element: <p>Not Found</p>,
            },
            {
                path: '/',
                element: <Blog />,
            },
            {
                path: '/signup',
                element: <SignUp />,
            },
            {
                path: '/signin',
                element: <SignIn />,
            },
            {
                path: '/callback/github',
                element: <Github />,
            },
        ]);
    }, []);

    return <RouterProvider router={router}></RouterProvider>;
}
