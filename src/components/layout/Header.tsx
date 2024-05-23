import React, { useEffect, useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CreateIcon from '@mui/icons-material/Create';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { Modal } from '../modal';
import useToggle from '../../hooks/useToggle';
import useModal from '../../hooks/useModal'; 
import ThemeButton from '../ThemeButton';

interface HeaderProps {
    title: string;
}

export default function Header(props: HeaderProps) {
    const { title } = props;
    const navigate = useNavigate();
    const { isLogin, logout, subscribeAccessToken } = useAuthStore();
    const [isSaved, setIsSaved] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const { closeModal, isModalOpen, openModal } = useModal();

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

    const handleCreatePostButton = () => {
        if (!isLogin) {
            openModal();
        } else {
            navigate('/post/create');
        }
    };

    return (
        <React.Fragment>
            <Toolbar className="border-solid border" sx={{ boxShadow: 'inherit' }}>
                <Typography
                    onClick={() => navigate('/home')}
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="left"
                    noWrap
                    sx={{ flex: 1 }}
                >
                    <p className="cursor-pointer">{title}</p>
                </Typography>
                <IconButton onClick={handleCreatePostButton}>
                    <CreateIcon />
                </IconButton>
                <Button onClick={handleSigninButton} variant="outlined" size="small">
                    {isLogin ? '로그아웃' : '로그인'}
                </Button>
                {/* <ThemeButton /> */}
            </Toolbar>

            <Modal
                content="로그인 후 이용해 주세요!"
                title="알림"
                removeDimmed={true}
                confirm="확인"
                onConfirm={closeModal}
                onCancel={closeModal}
                isOpen={isModalOpen}
            />
        </React.Fragment>
    );
}
