import React, { useEffect, useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CreateIcon from '@mui/icons-material/Create';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { useModalStore } from '../../store/modal';
// import ModalPortal from '../shared/Modal/MordalPortal';
import Modal from '../shared/Modal/Modal';

interface HeaderProps {
    sections: ReadonlyArray<{
        title: string;
        url: string;
    }>;
    title: string;
}

export default function Header(props: HeaderProps) {
    const { sections, title } = props;
    const navigate = useNavigate();
    const { isLogin, logout, subscribeAccessToken } = useAuthStore();
    const { isModalOpen, openModal, closeModal } = useModalStore();
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
            openModal();
        } else {
            navigate('/post/create');
        }
    };

    const onConfirm = () => {
        closeModal();
        navigate('/signin');
    };

    return (
        <React.Fragment>
            <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Button size="small">Subscribe</Button>
                <Typography component="h2" variant="h5" color="inherit" align="center" noWrap sx={{ flex: 1 }}>
                    {title}
                </Typography>
                <IconButton onClick={handleCreatePostButton}>
                    <CreateIcon />
                </IconButton>
                <Button onClick={handleSigninButton} variant="outlined" size="small">
                    {isLogin ? '로그아웃' : '로그인'}
                </Button>
            </Toolbar>
            <Toolbar component="nav" variant="dense" sx={{ justifyContent: 'space-between', overflowX: 'auto' }}>
                {sections.map((section) => (
                    <Link
                        color="inherit"
                        noWrap
                        key={section.title}
                        variant="body2"
                        href={section.url}
                        sx={{ p: 1, flexShrink: 0 }}
                    >
                        {section.title}
                    </Link>
                ))}
            </Toolbar>
            {isModalOpen &&
                // <ModalPortal>
                //     <Modal
                //         title="알림"
                //         content={
                //             <div>
                //                 <p>로그인된 유저만 접근 가능합니다.</p>
                //             </div>
                //         }
                //         onConfirm={onConfirm}
                //         onClose={closeModal}
                //     />
                // </ModalPortal>
                null}
        </React.Fragment>
    );
}
