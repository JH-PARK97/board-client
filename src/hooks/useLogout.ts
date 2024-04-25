import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

export default function useLogout() {
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
            subscribeAccessToken(authInfo.state.isSaved, authInfo?.state?.user?.email);
        }
    }, [subscribeAccessToken]);

    const handleLogout = () => {
        if (isLogin) {
            logout(isSaved, email);
            navigate('/signin');
        }
    };
    return handleLogout;
}
