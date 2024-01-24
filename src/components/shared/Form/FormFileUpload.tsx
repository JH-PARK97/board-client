import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Button, ButtonProps } from '@mui/material';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

interface customButtonProps extends ButtonProps {
    content: string;
}

export default function InputFileUpload({ size, content }: customButtonProps) {
    return (
        <Button size={size}>
            {content}
            <VisuallyHiddenInput type="file" />
        </Button>
    );
}
