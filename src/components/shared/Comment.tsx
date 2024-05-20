import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { CommentList, ReplyList } from '@/api/comment/get/comment.type';
import { createProfileImageSrc, dateConvert, FORMAT, getUser } from '@/utils/utils';
import { ReplyCommentComponent } from './ReplyComment';
import { useForm } from 'react-hook-form';
import { CommentListContext } from '../post/detail/Comment';
import updateCommentAPI from '../../api/comment/update/comment.api';
import deleteCommentAPI from '../../api/comment/delete/comment.api';
import ModalPortal from './Modal/MordalPortal';
import Modal from './Modal/Modal';
import { useModalStore } from '../../store/modal';

interface CommentComponentProps {
    commentList: CommentList[];
}
function CommentComponent({ commentList }: CommentComponentProps) {
    const { id } = getUser();

    return (
        <div>
            {commentList.map((comment) => {
                const { userId } = comment;
                const isWriter = id === userId;
                return <CommentListItem key={comment.id} comment={comment} isWriter={isWriter} />;
            })}
        </div>
    );
}
interface CommentListItemProps {
    comment: CommentList;
    isWriter: boolean;
}
function CommentListItem({ comment, isWriter }: CommentListItemProps) {
    const [isEdit, setIsEdit] = useState<boolean>(true);

    const handleClickModifyButton = () => {
        setIsEdit((prev) => !prev);
    };

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
        <div className="comment-container">
            <div className="comment-wrapper min-h-[200px] py-6 space-y-6 border-b-[1px]">
                <CommentComponent.Subinfo
                    commentId={comment.id}
                    data={subinfo}
                    handleClickModifyButton={handleClickModifyButton}
                    isWriter={isWriter}
                />

                {isEdit ? (
                    <div className="comment-content text-lg min-h-[80px]">{comment.content}</div>
                ) : (
                    <CreateComment
                        handleClickModifyButton={handleClickModifyButton}
                        createAPI={updateCommentAPI}
                        parentId={comment.id}
                        defaultValue={comment.content}
                    />
                )}
                <CommentComponent.Footer
                    parentCommentId={comment.id}
                    replyList={replyList}
                    replyCount={replyCount}
                    handleClickModifyButton={handleClickModifyButton}
                />
            </div>
        </div>
    );
}

interface CommentSubinfoProps {
    data: {
        createdAt: string;
        nickname: string;
        profileImagePath: string;
    };
    handleClickModifyButton: () => void;
    isWriter: boolean;
    commentId: number;
}

CommentComponent.Subinfo = function Subinfo({
    data,
    handleClickModifyButton,
    isWriter,
    commentId,
}: CommentSubinfoProps) {
    const commentContext = useContext(CommentListContext);
    if (!commentContext) return null;
    const { fetchCommentList } = commentContext;
    const { createdAt, nickname, profileImagePath } = data;
    const imageSrc = createProfileImageSrc(profileImagePath);
    const { closeModal, openModal } = useModalStore();
    const handleClickDeleteButton = async () => {
        const resp = await deleteCommentAPI(commentId);
        console.log(resp);
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
            {isWriter && (
                <div className="comment-subinfo-header-action flex w-[10%] justify-between date text-[14px] text-gray-500">
                    <div onClick={handleClickModifyButton}>수정</div>
                    <div onClick={openModal}>삭제</div>
                    <ModalPortal>
                        <Modal
                            content="댓글을 삭제 하시겠습니까?"
                            title="삭제"
                            onConfirm={handleClickDeleteButton}
                            removeDimmed
                        />
                    </ModalPortal>
                </div>
            )}
        </div>
    );
};

interface CommentContentProps {
    content: string;
    commentId: number;
    isEdit: boolean;
    handleClickModifyButton: () => void;
}

CommentComponent.Content = function Content({
    content,
    isEdit,
    commentId,
    handleClickModifyButton,
}: CommentContentProps) {
    return (
        <>
            {isEdit ? (
                <div className="comment-content text-lg min-h-[80px]">{content}</div>
            ) : (
                <CreateComment
                    handleClickModifyButton={handleClickModifyButton}
                    createAPI={updateCommentAPI}
                    parentId={commentId}
                    defaultValue={content}
                />
            )}
        </>
    );
};

interface CommentFooterProps {
    replyCount?: number;
    parentCommentId: number;
    replyList: ReplyList[];
    handleClickModifyButton: () => void;
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
    defaultValue?: string;
    handleClickModifyButton?: () => void;
}
function CreateComment({
    parentId,
    createAPI,
    handleClickReplyComment,
    defaultValue,
    handleClickModifyButton,
}: CreateCommentProps) {
    const commentContext = useContext(CommentListContext);
    if (!commentContext) return null;
    const { fetchCommentList } = commentContext;
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            content: defaultValue,
        },
    });

    // handleClickReplyComment의 타입이 함수가 아닌 경우 = 댓글 작성하는 경우 (답글X)
    const isEdit = typeof handleClickReplyComment !== 'function';

    const onSubmit = async (input: any) => {
        try {
            const resp = await createAPI(parentId, input);
            if (resp.resultCd === 200) {
                setValue('content', '');
                await fetchCommentList();
            }

            // 댓글 수정인 경우
            else if (resp.resultCd === 401) {
                console.log('본인 댓글만 수정 가능');
                return;
            }
            if (parentId) {
                handleClickModifyButton?.();
            }
        } catch (e) {
            console.error(e);
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
