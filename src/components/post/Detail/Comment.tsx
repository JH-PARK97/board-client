import React, { createContext, ReactNode, useEffect, useState } from 'react';
import getCommentAPI from '../../../api/comment/get/comment.api';
import { CommentList } from '@/api/comment/get/comment.type';
import createCommentAPI from '../../../api/comment/create/comment.api';
import { CommentComponent, CreateComment } from '../../shared/Comment';

interface CommentProps {
    postId: number;
}

interface CommentListContextType {
    commentList: CommentList[];
    fetchCommentList: () => Promise<any>;
}
export const CommentListContext = createContext<CommentListContextType | undefined>(undefined);

export default function Comment({ postId }: CommentProps) {
    const [commentList, setCommentList] = useState<CommentList[]>([]);

    const fetchCommentList = async () => {
        try {
            const resp = await getCommentAPI(postId);
            if (resp.resultCd === 200) {
                setCommentList(resp.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCommentList();
    }, []);

    if (!commentList) return null;

    return (
        <>
            <CommentListContext.Provider value={{ commentList, fetchCommentList }}>
                <CreateComment createAPI={createCommentAPI} parentId={postId} />
                <CommentComponent />
            </CommentListContext.Provider>
        </>
    );
}
