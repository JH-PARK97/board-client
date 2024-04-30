import { Editor, EditorProvider } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import React from 'react';
import EditorToolBar from './EditorToolBar';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';

interface TipTapProps {
    getContent: (value: string) => void;
}

const extensions = [
    StarterKit,
    Underline,
    Placeholder.configure({
        emptyEditorClass: 'is-editor-empty',
        placeholder: 'Write something...',
    }),
    Image.configure({
        inline: true,
    }),
];

const content = '';

const Tiptap = ({ getContent }: TipTapProps) => {
    return (
        <>
            <EditorProvider
                editorProps={{
                    attributes: {
                        class: 'focus:outline-none max-h-[700px] h-[700px]',
                    },
                }}
                extensions={extensions}
                slotBefore={<EditorToolBar />}
                content={content}
                onUpdate={(value) => {
                    const content = value.editor.getHTML();
                    console.log(content);
                    getContent(content);
                }}
            >
                <></>
            </EditorProvider>
        </>
    );
};

export default Tiptap;
