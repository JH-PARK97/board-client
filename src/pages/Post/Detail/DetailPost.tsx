import React, { ReactNode, useContext, useState } from 'react';

import { EditorContent, useEditor } from '@tiptap/react';
import Image from '@tiptap/extension-image';
import StarterKit from '@tiptap/starter-kit';

import { dateConvert, FORMAT, getUser } from '@/utils/utils';

import { useNavigate, useParams } from 'react-router-dom';

import deletePostAPI from '@/api/post/delete/post.api';
import CommentList from './CommentList';
import useModal from '@/hooks/useModal';
import { PostDetailItem } from '@/api/post/detail/post.type';
import { Modal } from '../../../components/modal';

interface SubInfoProps {
    createdAt: string;
    writer: string;
    writerId: number;
    currentUserId?: number;
    postId: number;
}

interface DetailPostProps {
    postInfo: PostDetailItem;
}
export default function DetailPost({ postInfo }: DetailPostProps) {
    const params = useParams();

    const { id: paramsId } = params;
    const id = Number(paramsId);

    const { id: userId } = getUser();

    if (!postInfo || !id) return null;

    const subinfo: SubInfoProps = {
        writer: postInfo?.user?.nickname,
        writerId: postInfo.userId,
        createdAt: postInfo?.createdAt,
        postId: postInfo.id,
        currentUserId: userId,
    };

    return (
        <div className="m-auto w-[50%]">
            <DetailPost.Title>{postInfo?.title}</DetailPost.Title>
            <DetailPost.SubInfo data={subinfo} />
            <DetailPost.Content>{postInfo?.content}</DetailPost.Content>
            <CommentList postId={id} />
        </div>
    );
}

interface DetailPostTitleProps {
    children: ReactNode;
}

DetailPost.Title = function Title({ children }: DetailPostTitleProps) {
    return <div className="detailpost-title text-5xl/normal font-bold mb-5">{children}</div>;
};

interface DetailPostSubInfoProps {
    data: SubInfoProps;
}

DetailPost.SubInfo = function Subinfo({ data }: DetailPostSubInfoProps) {
    const navigator = useNavigate();
    const { createdAt, currentUserId, postId, writer, writerId } = data;
    const isWriter = currentUserId === writerId;

    const { closeModal, isModalOpen, openModal } = useModal();

    function handleModifyClick() {
        navigator(`/post/edit/${postId}`);
    }
    async function handleDeleteClick() {
        await deletePostAPI(postId);
        navigator('/home');
        closeModal();
    }

    return (
        <div className="detailpost-subinfo mb-5 flex justify-between">
            <div className="detailpost-subinfo-left">
                <span className="writer font-semibold">{writer} </span>
                <span className="separator">·</span>
                <span className="createdAt text-gray-500">{dateConvert(createdAt, FORMAT.YYYYMMDD_KR)} </span>
            </div>
            <div className="detailpost-subinfo-right flex justify-between text-gray-500 w-[10%]">
                <button hidden={!isWriter} onClick={handleModifyClick}>
                    수정
                </button>
                <button hidden={!isWriter} onClick={openModal}>
                    삭제
                </button>
            </div>
            <Modal
                content="게시글을 삭제 하시겠습니까?"
                title="삭제"
                onConfirm={() => handleDeleteClick()}
                onCancel={() => closeModal()}
                isOpen={isModalOpen}
                removeDimmed
            />
        </div>
    );
};

interface DetailPostContentProps {
    children?: ReactNode;
}

DetailPost.Content = function Content({ children }: DetailPostContentProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({
                inline: true,
            }),
        ],
        content: `${children}`,
        editorProps: {
            attributes: {
                class: 'focus:outline-none',
            },
        },
    });
    editor?.setEditable(false);
    return (
        <div className="detailpost-content leading-7 min-h-[600px] ">
            <EditorContent editor={editor} />
        </div>
    );
};
