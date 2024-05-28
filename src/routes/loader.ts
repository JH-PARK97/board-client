import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import getPostDetailAPI from '@/api/post/detail/post.api';
import getUserPostAPI from '@/api/user/get/user.api';

export const getPostDetailLoader = async ({ params }: LoaderFunctionArgs) => {
    if (params?.postId) {
        const postDetail = await getPostDetailAPI(params.postId);
        if (!postDetail || postDetail.resultCd !== 200) {
            return redirect('/home');
        }
        return postDetail.data;
    }
    return redirect('/home');
};

export const getUserPostLoader = async ({ params, request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const qs = url.searchParams.toString();
    if (params?.userId) {
        const userPost = await getUserPostAPI(params.userId, qs);
        if (!userPost) {
            return redirect('/home');
        }
        return userPost.data;
    }
    return redirect('/home');
};
