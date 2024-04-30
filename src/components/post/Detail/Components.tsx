import { EditorContent, useEditor } from '@tiptap/react';
import Image from '@tiptap/extension-image';
import StarterKit from '@tiptap/starter-kit';
import React, { ReactNode, useContext } from 'react';
import { dateConvert, dateFormat, FORMAT } from '../../../utils/utils';

import { PostDetailContext } from './DetailPost';

export default function DetailPost() {
    const postDetail = useContext(PostDetailContext);
    if (!postDetail) return null;
    const subInfo = { writer: postDetail?.user?.nickname, createdAt: postDetail?.createdAt };
    return (
        <div className="m-auto w-[60%]">
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
    data: {
        writer: string;
        createdAt: string;
    };
}

DetailPost.SubInfo = function Subinfo({ data }: DetailPostSubInfoProps) {
    console.log(data);
    return (
        <div className="detailpost-subinfo mb-5">
            <span className="writer font-semibold">{data.writer} </span>
            <span className="separator">·</span>
            <span className="createdAt text-gray-500">{dateConvert(data.createdAt, FORMAT.YYYYMMDD_KR)} </span>
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
