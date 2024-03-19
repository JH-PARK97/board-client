import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';

export default function Github() {
    const iscall = useRef(false);
    const [searchParams] = useSearchParams();
    const navigator = useNavigate();
    const { login } = useAuthStore();
    const code = searchParams.get('code');
    const [isSaved, setIsSaved] = useState<boolean>();

    useEffect(() => {
        const authStorage = localStorage.getItem('auth-storage');
        if (authStorage) {
            const authInfo = JSON.parse(authStorage);
            setIsSaved(authInfo.state.isSaved);
        }
    }, []);

    const loginGithub = async () => {
        const res = await axios.get(`http://localhost:8080/callback/github?code=${code}`);
        if (res.data.resultCd === 200) {
            localStorage.setItem('accessToken', res.data.token);
            login(res.data.data, isSaved ?? false);
            return true
        }
        return false;
    };
    useEffect(() => {
        async function call() {
            if (!iscall.current) {
                iscall.current = true;
                const ok = await loginGithub();
                if (ok) {
                    navigator('/home', { replace: true });
                    iscall.current = false;

                }
            }
        }
        if (code) {
            call();
        }
    }, [code]);

    return <div>hello</div>;
}
