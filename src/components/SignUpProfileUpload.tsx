import React, { useState } from 'react';
import { FormFileUpload } from './shared/Form';
import ImagePreview from './shared/ImagePreview';

export default function SignUpProfileUpload() {
    const [imageUrl, setImageUrl] = useState<string>('');

    const handleFileUpload = (url: string) => {
        setImageUrl(url);
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column-reverse',
            }}
        >
            <FormFileUpload content="업로드" onUpload={handleFileUpload} />
            <ImagePreview height={100} width={100} imageUrl={imageUrl} />
        </div>
    );
}
