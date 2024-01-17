import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useMemo } from 'react';
import Home from './components/Home';
import SignUp from './components/auth/SignUp';
import React from 'react';
import Blog from './components/blog/Blog';
import SignIn from './components/auth/SignIn';

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
                path: '/home',
                element: <Home />,
            },
            {
                path: '/signup',
                element: <SignUp />,
            },
            {
                path: '/signin',
                element: <SignIn />,
            },
        ]);
    }, []);

    return <RouterProvider router={router}></RouterProvider>;
}
