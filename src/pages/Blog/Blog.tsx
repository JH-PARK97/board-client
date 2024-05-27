import React, { useEffect, useState } from 'react';
import BlogComponent from '@/components/blog/Blog';
import getUserPostAPI from '../../api/user/get/user.api';
import { GetUserPostListItem } from '../../api/user/get/user.type';
import { useParams, useSearchParams } from 'react-router-dom';
import Pagination from '../../components/pagination';

export default function Blog() {
    const [userPost, setUserPost] = useState<GetUserPostListItem>();
    const { userId } = useParams();
    const [searchParams] = useSearchParams();

    const pageNo = parseInt(searchParams.get('pageNo') ?? '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') ?? '7', 10);

    const params = searchParams.toString();
    if (!userId) return null;
    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const resp = await getUserPostAPI(userId, params);
                if (resp.resultCd === 200) {
                    setUserPost(resp.data);
                }
            } catch (e) {
                console.error(e);
            }
        };
        fetchUserPosts();
    }, [params]);

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
