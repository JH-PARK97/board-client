import React, { createContext, ReactNode, useContext, useState } from 'react';
import { ReplyList } from '@/api/comment/get/comment.type';
import { createProfileImageSrc, dateConvert, FORMAT } from '@/utils/utils';
import { CommentFooterContext, CreateComment } from './Comment';
import createReplyCommentAPI from '../../api/reply/create/reply.api';

interface ReplyCommentComponentProps {
    replyList: ReplyList[];
    parentCommentId: number;
}

function ReplyCommentComponent({ replyList = [], parentCommentId }: ReplyCommentComponentProps) {
    const commentFooterContext = useContext(CommentFooterContext);
    if (!commentFooterContext) {
        throw new Error('CommentComponent must be used within a CommentFooterContextProvider');
    }
    const { toggleReply } = commentFooterContext;
    const [isClickReplyButton, setIsClickReplyButton] = useState<boolean>(true);

    function handleClickReplyComment() {
        if (replyList.length === 0) {
            toggleReply();
        }
        setIsClickReplyButton((prev) => !prev);
    }
    const noReplyComment = replyList.length === 0;

    return (
        <div className="reply-comment-container p-5 py-6 space-y-6 bg-gray-50 rounded-lg border-[1px] ">
            {replyList.map((reply) => {
                const subinfo = {
                    createdAt: reply.createdAt,
                    profileImagePath: reply.user.profileImagePath,
                    nickname: reply.user.nickname,
                };

                return (
                    <React.Fragment key={reply.id}>
                        <ReplyCommentComponent.Wrapper>
                            <ReplyCommentComponent.Subinfo data={subinfo} />
                            <ReplyCommentComponent.Content content={reply.content} />
                            <ReplyCommentComponent.Footer replyList={replyList} />
                        </ReplyCommentComponent.Wrapper>
                    </React.Fragment>
                );
            })}

            {noReplyComment ? (
                <CreateComment
                    handleClickReplyComment={handleClickReplyComment}
                    createAPI={createReplyCommentAPI}
                    parentId={parentCommentId}
                />
            ) : (
                <div>
                    <button
                        className="border-[1px] p-2 w-full bg-white"
                        hidden={!isClickReplyButton}
                        onClick={handleClickReplyComment}
                    >
                        답글 작성하기
                    </button>
                    <div hidden={isClickReplyButton}>
                        <CreateComment
                            handleClickReplyComment={handleClickReplyComment}
                            createAPI={createReplyCommentAPI}
                            parentId={parentCommentId}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
interface CommentWrapperProps {
    children: ReactNode;
}

ReplyCommentComponent.Wrapper = function Wrapper({ children }: CommentWrapperProps) {
    return <div className="reply-comment-wrapper min-h-[200px] border-b-[1px] ">{children}</div>;
};

interface CommentSubinfoProps {
    data: {
        createdAt: string;
        nickname: string;
        profileImagePath: string;
    };
}

ReplyCommentComponent.Subinfo = function Subinfo({ data }: CommentSubinfoProps) {
    const { createdAt, nickname, profileImagePath } = data;
    const imageSrc = createProfileImageSrc(profileImagePath);
    return (
        <div className="reply-comment-subinfo-header mb-6 flex justify-between items-center">
            <div className="profile items-center space-x-2 flex">
                <div className="reply-comment-subinfo-header-profile">
                    <img className="rounded-full w-[3.375rem] h-[3.375rem]" src={imageSrc}></img>
                </div>
                <div className="reply-comment-subinfo-header-info space-y-2">
                    <div className="username font-bold">{nickname}</div>
                    <div className="date text-[14px] leading-3 text-gray-500">
                        {dateConvert(createdAt, FORMAT.YYYYMMDD_HHMM_KR)}
                    </div>
                </div>
            </div>
            <div className="reply-comment-subinfo-header-action flex w-[10%] justify-between text-[14px] text-gray-500">
                <div>수정</div>
                <div>삭제</div>
            </div>
        </div>
    );
};

interface CommentContentProps {
    content: string;
}

ReplyCommentComponent.Content = function Content({ content }: CommentContentProps) {
    return <div className="reply-comment-content text-lg min-h-[70px] mb-6">{content}</div>;
};

interface CommentFooterProps {
    replyList?: ReplyList[];
}

ReplyCommentComponent.Footer = function Footer({ replyList }: CommentFooterProps) {
    return <></>;
};

export { ReplyCommentComponent };
