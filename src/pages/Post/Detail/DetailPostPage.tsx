import React, { useEffect, useState } from 'react';
import getPostDetailAPI from '@/api/post/detail/post.api';
import { PostDetailItem } from '@/api/post/detail/post.type';
import DetailPost from './DetailPost';
import { useNavigate, useParams } from 'react-router-dom';

export default function DetailPostPage() {
    const [postInfo, setPostInfo] = useState<PostDetailItem>();
    const navigate = useNavigate();
    const { id } = useParams();

    if (!id) return null;
    useEffect(() => {
        const fetchPostDetail = async () => {
            try {
                const resp = await getPostDetailAPI(id);
                const { data } = resp;

                if (resp.resultCd === 200) {
                    setPostInfo(data);
                } else {
                    navigate('/home');
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchPostDetail();
    }, []);

    if (!postInfo) {
        return null;
    }

    return (
        <>
            <DetailPost postInfo={postInfo} />
        </>
    );
}
