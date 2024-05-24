import React, { createContext, useEffect, useState } from 'react';
import getCommentAPI from '@/api/comment/get/comment.api';
import { CommentList } from '@/api/comment/get/comment.type';
import createCommentAPI from '@/api/comment/create/comment.api';
import { CommentComponent, CreateComment } from '@/components/comment/Comment';

interface CommentProps {
    postId: number;
}

interface CommentListContextType {
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

    let replyCount = 0;
    const commentCount = commentList?.length;

    commentList.forEach((comment) => {
        if (comment.reply) {
            replyCount += comment.reply.length;
        }
    });

    const commentTotalCount = replyCount + commentCount;

    return (
        <>
            <CommentListContext.Provider value={{ fetchCommentList }}>
                <div className="commet-totalCount mb-4">
                    <p className="font-bold text-xl">{commentTotalCount}개의 댓글</p>
                </div>
                <CreateComment createAPI={createCommentAPI} parentId={postId} />
                <CommentComponent commentList={commentList} />
            </CommentListContext.Provider>
        </>
    );
}
