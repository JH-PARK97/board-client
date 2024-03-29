import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Outlet } from 'react-router-dom';
import { height } from '@mui/system';

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
            <Outlet />

            <div
                style={{
                    marginTop: 30,
                    width: '100%',
                    height: 50,
                }}
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
