import { useCurrentEditor } from '@tiptap/react';

import React from 'react';
import * as Icons from './Icons';

export default function EditorToolBar() {
    const { editor } = useCurrentEditor();

    if (!editor) {
        return null;
    }

    return (
        <>
            <div className="editor-toolbar flex justify-center border-b-[1px] mb-2">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    className={editor.isActive('undo') ? 'menu-button is-active' : 'menu-button'}
                >
                    <Icons.RotateLeft />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    className={editor.isActive('redo') ? 'menu-button is-active' : 'menu-button'}
                >
                    <Icons.RotateRight />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().toggleBold()}
                    className={editor.isActive('bold') ? 'menu-button is-active' : 'menu-button'}
                >
                    <Icons.Bold />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    disabled={!editor.can().toggleUnderline()}
                    className={editor.isActive('underline') ? 'menu-button is-active' : 'menu-button'}
                >
                    <Icons.Underline />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().toggleItalic()}
                    className={editor.isActive('italic') ? 'menu-button is-active' : 'menu-button'}
                >
                    <Icons.Italic />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={!editor.can().toggleStrike()}
                    className={editor.isActive('strike') ? 'menu-button is-active' : 'menu-button'}
                >
                    <Icons.Strikethrough />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={!editor.can().toggleCode()}
                    className={editor.isActive('code') ? 'menu-button is-active' : 'menu-button'}
                >
                    <Icons.Code />
                </button>
            </div>
        </>
    );
}
