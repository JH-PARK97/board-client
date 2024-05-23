import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

interface FooterProps {
    description: string;
    title?: string;
}

export default function Footer(props: FooterProps) {
    const { description, title } = props;

    return (
        <>
            <div
                className="relative w-full h-12"
               
            >
                <Typography variant="h6" align="center" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
                    {description}
                </Typography>
                <Copyright />
            </div>
        </>
    );
}
