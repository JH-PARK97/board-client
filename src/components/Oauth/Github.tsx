import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';

export default function Github() {
    const [searchParams] = useSearchParams();
    const navigator = useNavigate();
    const { login, isLogin } = useAuthStore();
    const code = searchParams.get('code');

    const loginGithub = async () => {
        const res = await axios.get(`http://localhost:8080/callback/github?code=${code}`);
        console.log(res);
        if (res.data.resultCd === 200) {
            localStorage.setItem('accessToken', res.data.token);
            login(res.data, false);
            navigator('/');
        }
        return;
    };
    useEffect(() => {
        loginGithub();
    }, []);

    return <div>hello</div>;
}
