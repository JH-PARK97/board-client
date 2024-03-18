import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();
    const handleBackButton = () => {
        navigate('/home', { replace: true });
    };
    return (
        <div style={{ backgroundColor: 'lightgray', height: '100vh' }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="h1" style={{ color: 'white' }}>
                    404
                </Typography>
                <Typography variant="h6" style={{ color: 'white' }}>
                    The page you’re looking for doesn’t exist.
                </Typography>
                <Button onClick={handleBackButton} style={{ width: 'fit-content' }} variant="contained">
                    홈으로
                </Button>
            </div>
        </div>
    );
}
