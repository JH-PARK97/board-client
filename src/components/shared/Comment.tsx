import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { CommentList, ReplyList } from '@/api/comment/get/comment.type';
import { createProfileImageSrc, dateConvert, FORMAT } from '@/utils/utils';
import { ReplyCommentComponent } from './ReplyComment';
import { useForm } from 'react-hook-form';
import { CommentListContext } from '../post/detail/Comment';

function CommentComponent() {
    const commentContext = useContext(CommentListContext);

    if (!commentContext) {
        throw new Error('CommentComponent must be used within a CommentListProvider');
    }
    const { commentList } = commentContext;
    return (
        <div>
            {commentList.map((comment) => {
                const subinfo = {
                    createdAt: comment.createdAt,
                    profileImagePath: comment.user.profileImagePath,
                    nickname: comment.user.nickname,
                };
                let replyList: ReplyList[] = [];
                let replyCount = 0;

                // comment.reply가 배열일 때만 replyList에 할당
                if (Array.isArray(comment.reply)) {
                    replyList = comment.reply;
                    replyCount = comment.reply.length;
                }
                return (
                    <div key={comment.id} className="comment-container">
                        <CommentComponent.Wrapper>
                            <CommentComponent.Subinfo data={subinfo} />
                            <CommentComponent.Content content={comment.content} />
                            <CommentComponent.Footer
                                parentCommentId={comment.id}
                                replyList={replyList}
                                replyCount={replyCount}
                            />
                        </CommentComponent.Wrapper>
                    </div>
                );
            })}
        </div>
    );
}
interface CommentWrapperProps {
    children: ReactNode;
}

CommentComponent.Wrapper = function Wrapper({ children }: CommentWrapperProps) {
    return <div className="comment-wrapper min-h-[200px] py-6 space-y-6 border-b-[1px]">{children}</div>;
};

interface CommentSubinfoProps {
    data: {
        createdAt: string;
        nickname: string;
        profileImagePath: string;
    };
}

CommentComponent.Subinfo = function Subinfo({ data }: CommentSubinfoProps) {
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
            <div className="comment-subinfo-header-action flex w-[10%] justify-between date text-[14px] text-gray-500">
                <div>수정</div>
                <div>삭제</div>
            </div>
        </div>
    );
};

interface CommentContentProps {
    content: string;
}

CommentComponent.Content = function Content({ content }: CommentContentProps) {
    return <div className="comment-content text-lg min-h-[80px]">{content}</div>;
};

interface CommentFooterProps {
    replyCount?: number;
    parentCommentId: number;
    replyList: ReplyList[];
}

interface CommentFooterContextType {
    toggleReply: () => void;
}
export const CommentFooterContext = createContext<CommentFooterContextType | undefined>(undefined);
CommentComponent.Footer = function Footer({ replyCount, parentCommentId, replyList }: CommentFooterProps) {
    const [watchMoreReply, setWatchMoreReply] = useState<boolean>(true);

    function toggleReply() {
        setWatchMoreReply((prev) => !prev);
    }
    return (
        <>
            <div className="comment-footer">
                {replyCount === 0 ? (
                    <button onClick={toggleReply}>{watchMoreReply ? `답글 달기` : `숨기기`}</button>
                ) : (
                    <button onClick={toggleReply}>{`${watchMoreReply ? `${replyCount}개의 답글` : `숨기기`}`}</button>
                )}
            </div>
            <div hidden={watchMoreReply}>
                <CommentFooterContext.Provider value={{ toggleReply }}>
                    <ReplyCommentComponent parentCommentId={parentCommentId} replyList={replyList} />
                </CommentFooterContext.Provider>
            </div>
        </>
    );
};

interface CreateCommentProps {
    parentId: number;
    createAPI: (parentId: number, input: any) => Promise<any>;
    handleClickReplyComment?: () => void;
}
function CreateComment({ parentId, createAPI, handleClickReplyComment }: CreateCommentProps) {
    const commentContext = useContext(CommentListContext);
    if (!commentContext) return null;
    const { fetchCommentList } = commentContext;
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm();

    // handleClickReplyComment의 타입이 함수가 아닌 경우 = 댓글 작성하는 경우 (답글X)
    const isEdit = typeof handleClickReplyComment !== 'function';

    const onSubmit = async (input: any) => {
        const resp = await createAPI(parentId, input);
        if (resp.resultCd === 200) {
            setValue('content', '');
            await fetchCommentList();
        }
    };
    const handelClickCancel = () => {
        if (isEdit) return null;
        handleClickReplyComment();
        setValue('content', '');
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="comment-input">
                <textarea
                    {...register('content', { required: true })}
                    placeholder="댓글을 작성하세요"
                    className="w-full min-h-[100px] resize-none border-2 border-gray-100 p-4 pb-6 no-scrollbar "
                />
                <div className="comment-button-wapper flex justify-end space-x-3">
                    <button type="submit">댓글 작성</button>
                    <button hidden={isEdit} onClick={handelClickCancel} type="button">
                        취소
                    </button>
                </div>
            </div>
        </form>
    );
}

export { CommentComponent, CreateComment };
