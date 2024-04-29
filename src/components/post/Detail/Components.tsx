import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { ReactNode, useContext } from 'react';

import { PostDetailContext } from './DetailPost';

export default function DetailPost() {
    const postDetail = useContext(PostDetailContext);
    return (
        <div className="container w-[45%] h-[100%] m-auto">
            <DetailPost.Title>{postDetail?.title}</DetailPost.Title>
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

interface DetailPostContentProps {
    children?: ReactNode;
}

DetailPost.Content = function Content({ children }: DetailPostContentProps) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: `${children}`,
    });
    editor?.setEditable(false);
    return (
        <div className="detailpost-content">
            <EditorContent editor={editor} />
        </div>
    );
};
