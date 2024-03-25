import { createBrowserRouter, LoaderFunctionArgs, redirect, RouterProvider } from 'react-router-dom';
import { useMemo } from 'react';
import SignUp from './components/auth/SignUp';
import React from 'react';
import Blog from './components/blog/Blog';
import SignIn from './components/auth/SignIn';
import Github from './components/Oauth/Github';
import NotFound from './components/NotFound/NotFound';
import CreatePost from './components/post/CreatePost';

async function checkLogin(ctx: LoaderFunctionArgs) {
    const url = new URL(ctx.request.url);
    const token = localStorage.getItem('accessToken');
    const isLogin = !!token;
    const pathname = url.pathname;
    const protectPage = pathname.includes('signin') || pathname.includes('signup');

    // // isLimitPage -> true면 로그인, 회원가입 페이지 -> isLogin이 false일 때만 접근 가능. 아니면 home으로 redirect
    // if (['/signin', '/signup'].includes(pathname)) {
    //     console.log('로그인 상태에만 진입 가능한 페이지');
    //     return redirect('/home')
    // }
    // //  isLimitPage -> false면 로그인 해야 접근 가능 페이지(로그인, 회원가입 외 전부)
    // if (!['/signin', '/signup'].includes(pathname)) {
    //     console.log('로그인 상태에만 진입 가능한 페이지');
    //     return redirect('/signup');
    // }

    if (protectPage && isLogin) {
        console.log('비로그인 상태에만 진입 가능한 페이지');
        return redirect('/home');
    }
    if (!protectPage && !isLogin) {
        console.log('로그인 상태에만 진입 가능한 페이지');
        return redirect('/signup');
    }
    return null;
}

export default function App() {
    const router = useMemo(() => {
        return createBrowserRouter([
            {
                path: '',
                children: [
                    {
                        path: '/',
                        loader: checkLogin,
                        children: [
                            {
                                path: '/signup',
                                element: <SignUp />,
                            },
                            {
                                path: '/signin',
                                element: <SignIn />,
                            },
                        ],
                    },
                    {
                        path: '/home',
                        element: <Blog />,
                    },
                    {
                        path: '/callback/github',
                        element: <Github />,
                    },
                    {
                        path: '/post/create',
                        element: <CreatePost />,
                        loader: checkLogin,
                    },
                ],
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ]);
    }, []);

    return <RouterProvider router={router}></RouterProvider>;
}
