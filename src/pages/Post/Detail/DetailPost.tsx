import React from 'react';
import DetailPostComponent from '@/components/post/detail/DetailPost';
import { useLoaderData } from 'react-router-dom';
import { LoaderData } from '@/routes/type';
import { getPostDetailLoader } from '@/routes/loader';
import { PostDetailItem } from '@/api/post/detail/post.type';

export default function DetailPost() {
    const postInfo: PostDetailItem = useLoaderData() as LoaderData<typeof getPostDetailLoader>;

    if (!postInfo) {
        return null;
    }

    return (
        <>
            <DetailPostComponent postInfo={postInfo} />
        </>
    );
}
