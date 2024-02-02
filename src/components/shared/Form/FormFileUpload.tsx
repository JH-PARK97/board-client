import React, { useEffect, useRef, useState } from 'react';
import { Button, ButtonProps } from '@mui/material';
import fileUploadAPI from '../../../api/file/upload.api';
import { useAsyncFn } from 'react-use';
import { useFormContext } from 'react-hook-form';

interface customButtonProps extends ButtonProps {
    content: string;
    onUpload: (url: string) => void;
}

export default function FormFileUpload({ content, onUpload }: customButtonProps) {
    const { register, setValue } = useFormContext();
    const [, doFetch] = useAsyncFn(async (file: File) => {
        const resp = await fileUploadAPI(file);
        return resp;
    }, []);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return null;
        const file = e?.target?.files[0];

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (reader.result) {
                    onUpload(reader.result?.toString());
                }
            };
            doFetch(file);
            setValue('profile', file);
        }
    };

    return (
        <Button onClick={handleUploadButtonClick}>
            {content}
            <input
                {...register('profile')}
                id="fileUpload"
                ref={fileInputRef}
                type="file"
                className="fileUpload"
                hidden
                accept="image/*"
                onChange={handleFileChange}
            />
        </Button>
    );
}
