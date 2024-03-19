import { useEditor, EditorContent, EditorProvider } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';
import EditorToolBar from './EditorToolBar';

const extensions = [StarterKit];

const content = '<p>Hello World!</p>';

const Tiptap = () => {
    const editor = useEditor({
        extensions,
        content,
    });

    return (
        <>
            <EditorProvider extensions={extensions} slotBefore={<EditorToolBar />} content={content}>
                {''}
            </EditorProvider>
        </>
    );
};

export default Tiptap;
