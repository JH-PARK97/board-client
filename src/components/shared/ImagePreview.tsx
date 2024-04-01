import React from 'react';

interface ImagePreviewProps {
    imageUrl?: string | null;
    height: number;
    width: number;
}

export default function ImagePreview({ imageUrl, height, width }: ImagePreviewProps) {
    return (
        <>
            <div
                className="image_wrapper"
                style={{
                    height,
                    width,
                }}
            >
                <img
                    src={imageUrl ? imageUrl : ''}
                    alt="profile_image_filed"
                    style={{
                        borderRadius: 100,
                        objectFit: 'fill',
                        width,
                        height,
                    }}
                />
            </div>
        </>
    );
}
