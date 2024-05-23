import React, { ReactNode, createContext, useState } from 'react';

import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { Editor, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';

interface TiptapContextProviderProps {
    children: ReactNode;
}

interface TiptapContextType {
    editor: Editor | null;
    content: string;
    setContent: (content: string) => void;
}
export const TiptapContext = createContext<TiptapContextType>({
    editor: null,
    content: '',
    setContent: () => {},
});

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

function EditorProvider({ children }: TiptapContextProviderProps) {
    const [content, setContent] = useState<string>('');

    const editor = useEditor({
        extensions,
        editorProps: {
            attributes: {
                class: 'focus:outline-none max-h-[700px] h-[700px]',
            },
        },

        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            setContent(html);
        },
        content,
    });

    return <TiptapContext.Provider value={{ content, editor, setContent }}>{children}</TiptapContext.Provider>;
}

export default EditorProvider;
