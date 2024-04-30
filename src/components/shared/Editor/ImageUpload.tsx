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
            const src = window.URL.createObjectURL(file);
            editor.chain().focus().setImage({ src: src }).run();
            const resp = await fileUploadAPI(file);
            const local = 'http://localhost:8080/';
            const path = local + resp?.filePath;
            console.log(path);
        }
    };

    return (
        <button type="button" onClick={handleImageUpload}>
            <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={handleFileChange} />
            <Icons.FileUpload />
        </button>
    );
}
