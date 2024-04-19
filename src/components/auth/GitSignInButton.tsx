import React from 'react';
import Button from '@mui/material/Button';

export default function GitSignInButton() {
    const githubConfig = {
        gitClientId: import.meta.env.VITE_GITHUB_CLIENT_ID,
        gitRedirUrl: import.meta.env.VITE_GITHUB_CALLBACK_URL,
        gitAuthUrl: import.meta.env.VITE_GITHUB_AUTH_URL,
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
