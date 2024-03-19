import React, { useEffect, useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';

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
    const { isLogin, logout } = useAuthStore();
    const [isSaved, setIsSaved] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        const authStorage = localStorage.getItem('auth-storage');
        if (authStorage) {
            const authInfo = JSON.parse(authStorage);
            setIsSaved(authInfo.state.isSaved);
            setEmail(authInfo?.state?.user?.email);
        }
    }, []);

    const handleSigninButton = () => {
        if (isLogin) {
            logout(isSaved, email);
        } else {
            navigate('/signin');
        }
    };

    const handleCreatePostButton = () => {
        navigate('/post/create');
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
        </React.Fragment>
    );
}
