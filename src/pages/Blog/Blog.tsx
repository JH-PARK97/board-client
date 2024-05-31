import React, { useEffect, useState } from 'react';
import BlogComponent from '@/components/blog/Blog';
import { GetUserPostListItem } from '@/api/user/get/user.type';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import Pagination from '@/components/Pagination';
import { LoaderData } from '@/routes/type';
import { getUserPostLoader } from '@/routes/loader';
import getCategoryAPI from '@/api/category/get/category.api';
import { CategoryList } from '@/api/category/get/category.type';

export default function Blog() {
    const userPost: GetUserPostListItem = useLoaderData() as LoaderData<typeof getUserPostLoader>;
    const [categories, setCategories] = useState<CategoryList[]>([]);

    const [searchParams] = useSearchParams();
    const pageNo = parseInt(searchParams.get('pageNo') ?? '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') ?? '7', 10);

    if (!userPost) return null;

    const userId = userPost.id;

    const getBlogCategory = async () => {
        try {
            const resp = await getCategoryAPI(userId);
            if (resp.resultCd === 200) {
                setCategories(resp.data);
            }
        } catch (e) {
            console.error(e);
        }
    };
    useEffect(() => {
        getBlogCategory();
    }, []);

    return (
        <>
            <BlogComponent userPost={userPost} categories={categories} />
            <div className="pagination">
                <Pagination currentPage={pageNo} pageCount={5} pageSize={pageSize} totalCount={userPost.totalCount} />
            </div>
        </>
    );
}
