import React, { useEffect, useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CreateIcon from '@mui/icons-material/Create';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/auth';
import { useModalStore } from '../../../store/modal';
import Modal from '../Modal/Modal';
import ModalPortal from '../Modal/MordalPortal';

interface HeaderProps {
    title: string;
}

export default function Header(props: HeaderProps) {
    const { title } = props;
    const navigate = useNavigate();
    const { isLogin, logout, subscribeAccessToken } = useAuthStore();
    const { toggleModal } = useModalStore();
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
            // navigate로 route를 해줘야 react-router-dom의 loader가 실행되기 때문에 사용
            navigate('/home');
        } else {
            navigate('/signin');
        }
    };

    const handleCreatePostButton = () => {
        if (!isLogin) {
            toggleModal();
        } else {
            navigate('/post/create');
        }
    };

    return (
        <React.Fragment>
            <Toolbar className="border-solid border" sx={{ boxShadow: 'inherit' }}>
                <Typography
                    className="cursor-pointer"
                    onClick={() => navigate('/home')}
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="left"
                    noWrap
                    sx={{ flex: 1 }}
                >
                    {title}
                </Typography>
                <IconButton onClick={handleCreatePostButton}>
                    <CreateIcon />
                </IconButton>
                <Button onClick={handleSigninButton} variant="outlined" size="small">
                    {isLogin ? '로그아웃' : '로그인'}
                </Button>
            </Toolbar>

            <ModalPortal>
                <Modal removeDimmed>
                    <Modal.Title>알림</Modal.Title>
                    <Modal.Content>
                        <p>로그인 후 이용해 주세요 !</p>
                    </Modal.Content>
                    <Modal.Footer>
                        <Modal.Button onClick={toggleModal}>확인</Modal.Button>
                    </Modal.Footer>
                </Modal>
            </ModalPortal>
        </React.Fragment>
    );
}
