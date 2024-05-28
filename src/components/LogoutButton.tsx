import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useAuthStore } from '../store/auth';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
    const navigate = useNavigate();
    const { isLogin, logout, subscribeAccessToken } = useAuthStore();
    const [isSaved, setIsSaved] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    
    useEffect(() => {
        const authStorage = localStorage.getItem('auth-storage');
        if (authStorage) {
            const authInfo = JSON.parse(authStorage);
            setIsSaved(authInfo.state.isSaved);
            setEmail(authInfo?.state?.user?.email);
            subscribeAccessToken(isSaved, email);
        }
    }, [email, isSaved, subscribeAccessToken]);

    const handleSigninButton = () => {
        if (isLogin) {
            logout(isSaved, email);
            // navigate로 route를 해줘야 react-router-dom의 loader가 실행된다.
            navigate('/home');
        } else {
            navigate('/signin');
        }
    };
    return (
        <Button onClick={handleSigninButton} variant="outlined" size="small">
            {isLogin ? '로그아웃' : '로그인'}
        </Button>
    );
}
