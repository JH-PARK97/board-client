import React from 'react';
import BlogComponent from '@/components/blog/Blog';
import { GetUserPostListItem } from '@/api/user/get/user.type';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import Pagination from '@/components/Pagination';
import { LoaderData } from '@/routes/type';
import { getUserPostLoader } from '@/routes/loader';

export default function Blog() {
    const userPost: GetUserPostListItem = useLoaderData() as LoaderData<typeof getUserPostLoader>;

    const [searchParams] = useSearchParams();
    const pageNo = parseInt(searchParams.get('pageNo') ?? '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') ?? '7', 10);

    if (!userPost) return null;

    return (
        <>
            <BlogComponent userPost={userPost} />
            <div className="pagination">
                <Pagination currentPage={pageNo} pageCount={5} pageSize={pageSize} totalCount={userPost.totalCount} />
            </div>
        </>
    );
}
