import { Editor, useCurrentEditor } from '@tiptap/react';

import React from 'react';

export default function EditorToolBar() {
    const { editor } = useCurrentEditor();

    if (!editor) {
        return null;
    }

    return (
        <>
            <div className="editor-toolbar flex justify-center">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'is-active bg-slate-200' : ''}
                >
                    Bold
                </button>
            </div>
        </>
    );
}
