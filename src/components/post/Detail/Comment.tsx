import React, { ReactNode, useEffect, useState } from 'react';
import getCommentAPI from '../../../api/comment/get/comment.api';
import { CommentList } from '@/api/comment/get/comment.type';
import { createProfileImageSrc, dateConvert, FORMAT } from '../../../utils/utils';
import { SubmitHandler, useForm } from 'react-hook-form';
import createCommentAPI from '../../../api/comment/create/comment.api';

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
            <div>
                {commentList.map((item) => {
                    const replyCount = Math.floor(Math.random() * 5) + 1;
                    const subinfo = {
                        createdAt: item.createdAt,
                        profileImagePath: item.user.profileImagePath,
                        nickname: item.user.nickname,
                    };

                    return (
                        <div key={item.id} className="comment-container">
                            <Comment.Wrapper>
                                <Comment.Subinfo data={subinfo} />
                                <Comment.Content content={item.content} />
                                <Comment.Footer replyCount={replyCount} />
                            </Comment.Wrapper>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
interface CommentWrapperProps {
    children: ReactNode;
}

Comment.Wrapper = function Wrapper({ children }: CommentWrapperProps) {
    return <div className="comment-wrapper min-h-[200px] py-6 space-y-6 border-b-[1px]">{children}</div>;
};

interface CommentSubinfoProps {
    data: {
        createdAt: string;
        nickname: string;
        profileImagePath: string;
    };
}

Comment.Subinfo = function Subinfo({ data }: CommentSubinfoProps) {
    const { createdAt, nickname, profileImagePath } = data;
    const imageSrc = createProfileImageSrc(profileImagePath);
    return (
        <div className="comment-subinfo-header flex justify-between items-center">
            <div className="profile items-center space-x-2 flex">
                <div className="comment-subinfo-header-profile">
                    <img className="rounded-full w-[3.375rem] h-[3.375rem]" src={imageSrc}></img>
                </div>
                <div className="comment-subinfo-header-info space-y-2">
                    <div className="username font-bold">{nickname}</div>
                    <div className="date text-[14px] leading-3 text-gray-500">
                        {dateConvert(createdAt, FORMAT.YYYYMMDD_HHMM_KR)}
                    </div>
                </div>
            </div>
            <div className="comment-subinfo-header-action flex w-[10%] justify-between ">
                <div>수정</div>
                <div>삭제</div>
            </div>
        </div>
    );
};

interface CommentContentProps {
    content: string;
}

Comment.Content = function Content({ content }: CommentContentProps) {
    return <div className="comment-content text-lg min-h-[80px]">{content}</div>;
};

interface CommentFooterProps {
    replyCount: number;
}

Comment.Footer = function Footer({ replyCount }: CommentFooterProps) {
    return <div>{`+${replyCount} 개의 답글`}</div>;
};

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