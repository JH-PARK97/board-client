import React, { ReactNode, useState } from 'react';
import { ReplyList } from '@/api/comment/get/comment.type';
import { createProfileImageSrc, dateConvert, FORMAT } from '@/utils/utils';
import ReplyComment from '../post/detail/ReplyComment';

interface ReplyCommentComponentProps {
    replyList: ReplyList[];
}

function ReplyCommentComponent({ replyList = [] }: ReplyCommentComponentProps) {
    return (
        <div>
            {replyList.map((reply) => {
                const subinfo = {
                    createdAt: reply.createdAt,
                    profileImagePath: reply.user.profileImagePath,
                    nickname: reply.user.nickname,
                };

                return (
                    <div key={reply.id} className="reply-comment-container">
                        <ReplyCommentComponent.Wrapper>
                            <ReplyCommentComponent.Subinfo data={subinfo} />
                            <ReplyCommentComponent.Content content={reply.content} />
                            <ReplyCommentComponent.Footer replyList={replyList} />
                        </ReplyCommentComponent.Wrapper>
                    </div>
                );
            })}
        </div>
    );
}
interface CommentWrapperProps {
    children: ReactNode;
}

ReplyCommentComponent.Wrapper = function Wrapper({ children }: CommentWrapperProps) {
    return (
        <div className="reply-comment-wrapper min-h-[200px] p-5 py-6 space-y-6 -mt-[1px] bg-gray-50 rounded-lg border-[1px]">
            {children}
        </div>
    );
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
        <div className="reply-comment-subinfo-header flex justify-between items-center">
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
            <div className="reply-comment-subinfo-header-action flex w-[10%] justify-between ">
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
    return <div className="reply-comment-content text-lg min-h-[80px]">{content}</div>;
};

interface CommentFooterProps {
    replyList?: ReplyList[];
}

ReplyCommentComponent.Footer = function Footer({ replyList }: CommentFooterProps) {
    const [watchMoreReply, setWatchMoreReply] = useState(false);
    function handleClickButton() {
        setWatchMoreReply((prev) => !prev);
    }

    return (
        <>
            <div className="reply-comment-footer">
                <button onClick={handleClickButton}>답글</button>
            </div>
        </>
    );
};

export { ReplyCommentComponent };
