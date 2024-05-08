import React, { useContext } from 'react';

import { EditorContent } from '@tiptap/react';
import EditorToolBar from './EditorToolBar';

import { TiptapContext } from './EditorProvider';


const Tiptap = () => {
    const { editor } = useContext(TiptapContext);

    return (
        <>
            <EditorToolBar />
            <EditorContent editor={editor} />
        </>
    );
};

export default Tiptap;
