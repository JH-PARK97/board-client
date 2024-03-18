import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function GitSignInButton() {
    const githubConfig = {
        gitClientId: process.env.REACT_APP_GITHUB_CLIENT_ID,
        gitRedirUrl: process.env.REACT_APP_GITHUB_CALLBACK_URL,
        gitAuthUrl: process.env.REACT_APP_GITHUB_AUTH_URL,
    };
    const { gitAuthUrl, gitClientId, gitRedirUrl } = githubConfig;

    return (
        <Button type="button" fullWidth variant="contained" sx={{ mb: 2 }} style={{ backgroundColor: '#272e33' }}>
            <Link
                style={{ textDecorationLine: 'none', color: '#ffffff' }}
                to={`${gitAuthUrl}?client_id=${gitClientId}&redirect_uri=${gitRedirUrl}&scope=user:email`}
            >
                깃허브 로그인
            </Link>
        </Button>
    );
}
