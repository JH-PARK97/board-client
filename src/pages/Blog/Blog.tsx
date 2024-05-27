import React, { useEffect, useState } from 'react';
import BlogComponent from '@/components/blog/Blog';
import getUserPostAPI from '../../api/user/get/user.api';
import { GetUserPostListItem } from '../../api/user/get/user.type';
import { useParams } from 'react-router-dom';

export default function Blog() {
    const [userPost, setUserPost] = useState<GetUserPostListItem>();
    const { userId } = useParams();
    if (!userId) return null;
    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const resp = await getUserPostAPI(userId);
                if (resp.resultCd === 200) {
                    setUserPost(resp.data);
                }
            } catch (e) {
                console.error(e);
            }
        };
        fetchUserPosts();
    }, []);

    if (!userPost) return null;

    return <BlogComponent userPost={userPost} />;
}
