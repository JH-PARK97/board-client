import { EditorProvider } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';
import EditorToolBar from './EditorToolBar';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';

const extensions = [
    StarterKit,
    Underline,
    Placeholder.configure({
        emptyEditorClass: 'is-editor-empty',
        placeholder: 'Write something...',
    }),
];

const content = '';

const Tiptap = () => {
    return (
        <>
            <EditorProvider
                editorProps={{
                    attributes: {
                        class: 'focus:outline-none',
                    },
                }}
                extensions={extensions}
                slotBefore={<EditorToolBar />}
                content={content}
            >
                <></>
            </EditorProvider>
        </>
    );
};

export default Tiptap;
