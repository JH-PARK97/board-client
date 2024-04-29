import React, { createContext, useContext, useEffect, useState } from 'react';
import getPostDetailAPI from '@/api/post/detail/post.api';
import { PostDetailItem } from '@/api/post/detail/post.type';
import DetailPost from './Components';
import { useParams } from 'react-router-dom';

export const PostDetailContext = createContext<PostDetailItem | null>(null);
export default function DetailPostPage() {
    const [postInfo, setPostInfo] = useState<PostDetailItem>();
    const { id } = useParams();

    if (!id) return null;
    useEffect(() => {
        const fetchPostDetail = async () => {
            const resp = await getPostDetailAPI(id);
            if (!resp) return null;
            const { data } = resp;

            if (data.resultCd === 200) {
                setPostInfo(data.data);
            }
        };
        fetchPostDetail();
    }, []);

    if (!postInfo) {
        return null;
    }

    return (
        <>
            <PostDetailContext.Provider value={postInfo}>
                <DetailPost />
            </PostDetailContext.Provider>
        </>
    );
}
