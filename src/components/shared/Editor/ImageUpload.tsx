import Image from '@tiptap/extension-image';
import { Editor } from '@tiptap/react';
import React, { useRef } from 'react';
import fileUploadAPI from '../../../api/file/upload.api';

import * as Icons from './Icons';

export default function ImageUpload({ editor }: { editor: Editor }) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return null;
        const file = e?.target?.files[0];

        if (file) {
            const resp = await fileUploadAPI(file);
            if (!resp) return null;
            const filename = resp.file.filename;
            const imgSrc = `${import.meta.env.VITE_API_URL}/images/${filename}`;

            editor.chain().focus().setImage({ src: imgSrc }).run();
        }
    };

    return (
        <button type="button" onClick={handleImageUpload}>
            <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={handleFileChange} />
            <Icons.FileUpload />
        </button>
    );
}
