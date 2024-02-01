import React, { useState } from 'react';

interface ImagePreviewProps {
    imageUrl: string;
    height: number;
    width: number;
}
export default function ImagePreview({ imageUrl, height, width }: ImagePreviewProps) {
    return <img src={imageUrl} alt="profile_image_filed" height={height} width={width} />;
}
