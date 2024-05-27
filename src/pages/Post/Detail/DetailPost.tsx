import React, { useEffect, useState } from 'react';
import getPostDetailAPI from '@/api/post/detail/post.api';
import { PostDetailItem } from '@/api/post/detail/post.type';
import DetailPostComponent from '@/components/post/detail/DetailPost';
import { useNavigate, useParams } from 'react-router-dom';

export default function DetailPost() {
    const [postInfo, setPostInfo] = useState<PostDetailItem>();
    const navigate = useNavigate();
    const { postId } = useParams();

    if (!postId) return null;
    useEffect(() => {
        const fetchPostDetail = async () => {
            try {
                const resp = await getPostDetailAPI(postId);
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
            <DetailPostComponent postInfo={postInfo} />
        </>
    );
}
