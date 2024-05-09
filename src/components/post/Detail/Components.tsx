import React, { ReactNode, useContext } from 'react';

import { EditorContent, useEditor } from '@tiptap/react';
import Image from '@tiptap/extension-image';
import StarterKit from '@tiptap/starter-kit';

import { dateConvert, FORMAT, getUser } from '@/utils/utils';

import { PostDetailContext } from './DetailPost';
import { useNavigate, useParams } from 'react-router-dom';
import ModalPortal from '../../shared/Modal/MordalPortal';
import Modal from '../../shared/Modal/Modal';
import { useModalStore } from '@/store/modal';
import deletePostAPI from '@/api/post/delete/post.api';

interface SubInfoProps {
    createdAt: string;
    writer: string;
    writerId: number;
    currentUserId: number;
    postId: number;
}
export default function DetailPost() {
    const postDetail = useContext(PostDetailContext);
    const params = useParams();
    const {
        state: {
            user: { id: userId },
        },
    } = getUser();
    const { id } = params;

    if (!postDetail || !id) return null;

    const subInfo: SubInfoProps = {
        writer: postDetail?.user?.nickname,
        writerId: postDetail.userId,
        createdAt: postDetail?.createdAt,
        postId: postDetail.id,
        currentUserId: userId,
    };

    return (
        <div className="m-auto w-[40%]">
            <DetailPost.Title>{postDetail?.title}</DetailPost.Title>
            <DetailPost.SubInfo data={subInfo} />
            <DetailPost.Content>{postDetail?.content}</DetailPost.Content>
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
    const { closeModal, openModal } = useModalStore();
    const { createdAt, currentUserId, postId, writer, writerId } = data;
    const isWriter = currentUserId === writerId;

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
            <ModalPortal>
                <Modal
                    content="게시글을 삭제 하시겠습니까?"
                    title="삭제"
                    onConfirm={() => handleDeleteClick()}
                    onCancel={() => closeModal()}
                    removeDimmed
                />
            </ModalPortal>
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
