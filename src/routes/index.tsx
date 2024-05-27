import React, { useMemo } from 'react';
import { createBrowserRouter, LoaderFunctionArgs, Outlet, redirect, RouterProvider } from 'react-router-dom';

import NotFound from '@/pages/NotFound/NotFound';
import Layout from '@/components/layout/Layout';
import { SignUp, SignIn } from '@/pages/Auth';
import { Github } from '@/pages/Oauth';
import { Home } from '@/pages';
import { Map1, Map2 } from '@/pages/Map';
import { CreatePost } from '@/pages/Post';

import EditorProvider from '@/components/editor/EditorProvider';
import DetailPost from '../pages/Post/Detail/DetailPost';
import PageTitle from '@/components/PageTitle';
import Blog from '../pages/Blog/Blog';

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

export default function Router() {
    const router = useMemo(() => {
        return createBrowserRouter([
            {
                path: '*',
                element: (
                    <>
                        <PageTitle title={'NotFound'} />
                        <NotFound />
                    </>
                ),
            },
            {
                path: '/',
                element: <Layout />,
                children: [
                    {
                        path: '/home',
                        element: (
                            <>
                                <PageTitle title={'Home'} />
                                <Home />
                            </>
                        ),
                    },
                    {
                        path: '/post/:postId',
                        element: <DetailPost />,
                    },

                    {
                        path: '/callback/github',
                        element: <Github />,
                    },
                    {
                        path: '/map',
                        element: <Map1 />,
                    },
                    {
                        path: '/map2',
                        element: <Map2 />,
                    },
                    {
                        path: '/blog/:userId',
                        element: <Blog />,
                    },
                ],
            },
            {
                path: '/',
                loader: checkLogin,
                children: [
                    {
                        path: '/signup',
                        element: (
                            <>
                                <PageTitle title={'SignUp'} />
                                <SignUp />
                            </>
                        ),
                    },
                    {
                        path: '/signin',
                        element: (
                            <>
                                <PageTitle title={'SignIn'} />
                                <SignIn />
                            </>
                        ),
                    },
                    {
                        // 하위 path에 EditorProvider 제공
                        path: '/post',
                        element: (
                            <EditorProvider>
                                <Outlet />
                            </EditorProvider>
                        ),
                        children: [
                            {
                                path: 'create',
                                element: (
                                    <>
                                        <PageTitle title={'글 작성'} />
                                        <CreatePost />
                                    </>
                                ),
                            },
                            {
                                path: 'edit/:id',
                                element: (
                                    <>
                                        <PageTitle title={'게시글 수정'} />
                                        <CreatePost />
                                    </>
                                ),
                            },
                        ],
                    },
                ],
            },
        ]);
    }, []);

    return <RouterProvider router={router}></RouterProvider>;
}
