import React from 'react';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';

export default function GitSignInButton() {
    // const navigate = useNavigate();
    const githubConfig = {
        gitClientId: process.env.REACT_APP_GITHUB_CLIENT_ID,
        gitRedirUrl: process.env.REACT_APP_GITHUB_CALLBACK_URL,
        gitAuthUrl: process.env.REACT_APP_GITHUB_AUTH_URL,
    };
    const { gitAuthUrl, gitClientId, gitRedirUrl } = githubConfig;

    const handleGitLoginButton = () => {
        location.href = `${gitAuthUrl}?client_id=${gitClientId}&redirect_uri=${gitRedirUrl}&scope=user:email`;
    };

    return (
        <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mb: 2 }}
            style={{ backgroundColor: '#272e33' }}
            onClick={handleGitLoginButton}
        >
            깃허브 로그인

        </Button>
    );
}
