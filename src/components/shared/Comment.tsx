import React, { ReactNode, useEffect, useState } from 'react';
import { CommentList, ReplyList } from '@/api/comment/get/comment.type';
import { createProfileImageSrc, dateConvert, FORMAT } from '@/utils/utils';
import ReplyComment from '../post/detail/ReplyComment';
import { ReplyCommentComponent } from './ReplyComment';

interface CommentComponentProps {
    commentList: CommentList[];
}

function CommentComponent({ commentList }: CommentComponentProps) {
    return (
        <div>
            {commentList.map((comment) => {
                const subinfo = {
                    createdAt: comment.createdAt,
                    profileImagePath: comment.user.profileImagePath,
                    nickname: comment.user.nickname,
                };
                let replyList: ReplyList[] = [];

                // comment.reply가 배열일 때만 replyList에 할당
                if (Array.isArray(comment.reply)) {
                    replyList = comment.reply;
                }
                return (
                    <div key={comment.id} className="comment-container">
                        <CommentComponent.Wrapper>
                            <CommentComponent.Subinfo data={subinfo} />
                            <CommentComponent.Content content={comment.content} />
                            <CommentComponent.Footer replyList={replyList}>
                                <ReplyComment replyList={replyList} />
                            </CommentComponent.Footer>
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

CommentComponent.Content = function Content({ content }: CommentContentProps) {
    return <div className="comment-content text-lg min-h-[80px]">{content}</div>;
};

interface CommentFooterProps {
    replyList?: ReplyList[];
    children: ReactNode;
}

CommentComponent.Footer = function Footer({ replyList = [], children }: CommentFooterProps) {
    const [watchMoreReply, setWatchMoreReply] = useState(true);
    console.log(watchMoreReply);
    function handleClickButton() {
        setWatchMoreReply((prev) => !prev);
    }
    return (
        <>
            <div className="comment-footer">
                {replyList.length === 0 ? (
                    <button>답글달기</button>
                ) : (
                    <button onClick={handleClickButton}>{`${
                        watchMoreReply ? `${replyList?.length}개의 답글` : `숨기기`
                    }`}</button>
                )}
            </div>
            <div hidden={watchMoreReply}>{children}</div>
        </>
    );
};

export { CommentComponent };
