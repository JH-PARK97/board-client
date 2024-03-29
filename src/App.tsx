import { createBrowserRouter, LoaderFunctionArgs, redirect, RouterProvider } from 'react-router-dom';
import { useMemo } from 'react';
import SignUp from './components/auth/SignUp';
import React from 'react';
import Blog from './components/blog/Blog';
import SignIn from './components/auth/SignIn';
import Github from './components/Oauth/Github';
import NotFound from './components/NotFound/NotFound';
import CreatePost from './components/post/CreatePost';
import Footer from './components/shared/Layout/Footer';

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
    if (pathname === '/') {
        return redirect('/home');
    }

    if (protectPage && isLogin) {
        return redirect('/home');
    }
    if (!protectPage && !isLogin) {
        return redirect('/signin');
    }
    return null;
}

function footerRender() {
    const pathname = window.location.pathname;

    if (['/signin', '/signup'].includes(pathname)) {
        return null;
    }

    return <Footer description="Something here to give the footer a purpose!" />;
}

export default function App() {
    const router = useMemo(() => {
        return createBrowserRouter([
            {
                path: '*',
                element: <NotFound />,
            },
            {
                path: '/',
                element: footerRender(),
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
                            {
                                path: '/post/create',
                                element: <CreatePost />,
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
                ],
            },
        ]);
    }, []);

    return <RouterProvider router={router}></RouterProvider>;
}
