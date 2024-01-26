import React, { useRef } from 'react';
import { Button, ButtonProps } from '@mui/material';
import fileUploadAPI from '../../../api/file/upload.api';

interface customButtonProps extends ButtonProps {
    content: string;
}

export default function InputFileUpload({ size, content }: customButtonProps) {
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
            const resp = await fileUploadAPI(file);
            console.log('resp : ', resp);
        }
    };

    return (
        <Button onClick={handleUploadButtonClick}>
            {content}
            <input
                id="fileUpload"
                ref={fileInputRef}
                type="file"
                className="fileUpload"
                hidden
                accept="image/*"
                onChange={(e) => {
                    handleFileChange(e);
                }}
            />
        </Button>
    );
}
