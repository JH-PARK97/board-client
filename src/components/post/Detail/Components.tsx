import React, { ReactNode, useContext } from 'react';

import { EditorContent, useEditor } from '@tiptap/react';
import Image from '@tiptap/extension-image';
import StarterKit from '@tiptap/starter-kit';

import { dateConvert, dateFormat, FORMAT } from '../../../utils/utils';

import { PostDetailContext } from './DetailPost';
import { useNavigate, useParams } from 'react-router-dom';

export default function DetailPost() {
    const postDetail = useContext(PostDetailContext);
    const navigator = useNavigate();
    const params = useParams();
    const { id } = params;

    if (!postDetail) return null;

    const subInfo = { writer: postDetail?.user?.nickname, createdAt: postDetail?.createdAt };

    console.log(postDetail);
    function handleModifyClick() {
        navigator(`/post/edit/${id}`);
    }

    return (
        <div className="m-auto w-[40%]">
            <DetailPost.Title>{postDetail?.title}</DetailPost.Title>
            <DetailPost.SubInfo onModifyClick={handleModifyClick} data={subInfo} />
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
    data: {
        writer: string;
        createdAt: string;
    };
    onModifyClick: () => void;
}

DetailPost.SubInfo = function Subinfo({ data, onModifyClick }: DetailPostSubInfoProps) {
    return (
        <div className="detailpost-subinfo mb-5 flex justify-between">
            <div className="detailpost-subinfo-left">
                <span className="writer font-semibold">{data.writer} </span>
                <span className="separator">·</span>
                <span className="createdAt text-gray-500">{dateConvert(data.createdAt, FORMAT.YYYYMMDD_KR)} </span>
            </div>
            <div className="detailpost-subinfo-right flex justify-between text-gray-500 w-[10%]">
                <button onClick={onModifyClick}>수정</button>
                <button>삭제</button>
            </div>
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
