import React, { ReactNode, useEffect, useState } from 'react';
import getCommentAPI from '../../../api/comment/get/comment.api';
import { CommentList } from '@/api/comment/get/comment.type';
import { createProfileImageSrc, dateConvert, FORMAT } from '../../../utils/utils';
import { SubmitHandler, useForm } from 'react-hook-form';
import createCommentAPI from '../../../api/comment/create/comment.api';
import { CommentComponent } from '../../shared/Comment';
import ReplyComment from './ReplyComment';

interface CommentProps {
    postId: string;
}

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

    const onUpdateCommentList = async () => {
        await fetchCommentList();
    };

    return (
        <>
            <CreateComment postId={postId} onUpdateCommentList={onUpdateCommentList} />
            <CommentComponent commentList={commentList}></CommentComponent>
        </>
    );
}
interface CreateCommentProps {
    postId: string;
    onUpdateCommentList: () => void;
}
function CreateComment({ postId, onUpdateCommentList }: CreateCommentProps) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm();

    const onSubmit = async (input: any) => {
        const resp = await createCommentAPI(postId, input);
        if (resp.resultCd === 200) {
            setValue('content', '');
            onUpdateCommentList();
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="comment-input">
                <textarea
                    {...register('content', { required: true })}
                    placeholder="댓글을 작성하세요"
                    className="w-full min-h-[100px] resize-none border-2 border-gray-100 p-4 pb-6 no-scrollbar "
                />
                <div className="comment-button-wapper flex justify-end">
                    <button type="submit">댓글 작성</button>
                </div>
            </div>
        </form>
    );
}
