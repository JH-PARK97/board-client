import React, { useContext } from 'react';
import { ReplyList } from '@/api/comment/get/comment.type';
import { createProfileImageSrc, dateConvert, FORMAT, getUser } from '@/utils/utils';
import { CreateComment } from './Comment';

import useToggle from '@/hooks/useToggle';

import createReplyAPI from '@/api/reply/create/reply.api';
import updateReplyAPI from '@/api/reply/update/reply.api';
import deleteReplyAPI from '@/api/reply/delete/reply.api';
import useModal from '@/hooks/useModal';
import { Modal } from '../modal';
import { CommentListContext } from '../../pages/Post/Detail/CommentList';

interface ReplyComponentProps {
    replyList: ReplyList[];
    parentCommentId: number;
    toggleReplyCreate: () => void;
}

function ReplyComponent({ replyList = [], parentCommentId, toggleReplyCreate }: ReplyComponentProps) {
    const { id } = getUser();
    const noReply = replyList.length === 0;

    return (
        <div className="reply-comment-container p-5 py-6 space-y-6 bg-gray-50 rounded-lg border-[1px] ">
            {replyList.map((reply) => {
                const { userId } = reply;
                const isWriter = id === userId;
                return (
                    <ReplyListItem isWriter={isWriter} parentCommentId={parentCommentId} key={reply.id} reply={reply} />
                );
            })}
            <CreateReply noReply={noReply} parentCommentId={parentCommentId} toggleReplyCreate={toggleReplyCreate} />
        </div>
    );
}

interface ReplyListItemProps {
    reply: ReplyList;
    parentCommentId: number;
    isWriter: boolean;
}

function ReplyListItem({ reply, parentCommentId, isWriter }: ReplyListItemProps) {
    const [isEdit, setIsEdit] = useToggle(true);
    const subinfo = {
        createdAt: reply.createdAt,
        profileImagePath: reply.user.profileImagePath,
        nickname: reply.user.nickname,
    };

    return (
        <div className="reply-comment-wrapper min-h-[200px] border-b-[1px] ">
            <ReplyComponent.Subinfo
                reply={reply}
                handleClickReplyModifyButton={setIsEdit}
                data={subinfo}
                isWriter={isWriter}
            />
            {isEdit ? (
                <div className="reply-comment-content text-lg min-h-[70px] mb-6">{reply.content}</div>
            ) : (
                <CreateComment
                    replyId={reply.id}
                    handleClickModifyButton={setIsEdit}
                    createAPI={updateReplyAPI}
                    parentId={parentCommentId}
                    defaultValue={reply.content}
                />
            )}
            <ReplyComponent.Footer replyList={reply} />
        </div>
    );
}

interface ReplySubinfoProps {
    data: {
        createdAt: string;
        nickname: string;
        profileImagePath: string;
    };
    handleClickReplyModifyButton: () => void;
    reply: ReplyList;
    isWriter: boolean;
}

ReplyComponent.Subinfo = function Subinfo({ reply, data, handleClickReplyModifyButton, isWriter }: ReplySubinfoProps) {
    const commentContext = useContext(CommentListContext);
    if (!commentContext) return null;
    const { fetchCommentList } = commentContext;
    const { createdAt, nickname, profileImagePath } = data;
    const imageSrc = createProfileImageSrc(profileImagePath);
    const { isModalOpen, openModal, closeModal } = useModal();

    const handleClickReplyDeleteButton = async () => {
        const resp = await deleteReplyAPI(reply.commentId, reply.id);
        if (resp.resultCd === 200) {
            fetchCommentList();
            closeModal();
        }
        if (resp.resultCd === 401) {
            console.log(resp.resultMsg);
            closeModal();
        }
    };

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

            {isWriter && (
                <div className="reply-comment-subinfo-header-action flex w-[10%] justify-between text-[14px] text-gray-500">
                    <div onClick={handleClickReplyModifyButton}>수정</div>
                    <div onClick={openModal}>삭제</div>
                    <Modal
                        isOpen={isModalOpen}
                        onCancel={closeModal}
                        cancel="취소"
                        content="답글을 삭제 하시겠습니까?"
                        title="삭제"
                        onConfirm={handleClickReplyDeleteButton}
                        removeDimmed
                    />
                </div>
            )}
        </div>
    );
};

interface ReplyFooterProps {
    replyList?: ReplyList;
}

ReplyComponent.Footer = function Footer({ replyList }: ReplyFooterProps) {
    return <></>;
};

interface CreateReplyProps {
    noReply: boolean;
    parentCommentId: number;
    toggleReplyCreate: () => void;
}
function CreateReply({ parentCommentId, noReply, toggleReplyCreate }: CreateReplyProps) {
    const [isClickReplyButton, setIsClickReplyButton] = useToggle(true);

    function handleClickReply() {
        if (noReply) {
            toggleReplyCreate();
        }
        setIsClickReplyButton();
    }

    return noReply ? (
        <CreateComment handleClickReply={handleClickReply} createAPI={createReplyAPI} parentId={parentCommentId} />
    ) : (
        <div>
            <button
                className="border-[1px] p-2 w-full bg-white"
                hidden={!isClickReplyButton}
                onClick={handleClickReply}
            >
                답글 작성하기
            </button>
            <div hidden={isClickReplyButton}>
                <CreateComment
                    handleClickReply={handleClickReply}
                    createAPI={createReplyAPI}
                    parentId={parentCommentId}
                />
            </div>
        </div>
    );
}

export { ReplyComponent };
