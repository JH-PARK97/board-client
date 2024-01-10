import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useMemo } from 'react';
import Home from './components/Home';
import SignUp from './components/SignUp';
import React from 'react';

export default function App() {
    const router = useMemo(() => {
        return createBrowserRouter([
            {
                path: '/',
                element: <div>root</div>,
            },
            {
                path: '/home',
                element: <Home />,
            },
            {
                path: '/signup',
                element: <SignUp />,
            },
        ]);
    }, []);

    return <RouterProvider router={router}></RouterProvider>;
}
