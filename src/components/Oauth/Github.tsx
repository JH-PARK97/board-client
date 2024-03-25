import { CircularProgress, Container } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';

// let isCall = false;

export default function Github() {
    const iscall = useRef(false);
    const [searchParams] = useSearchParams();
    const navigator = useNavigate();
    const { login, isLogin } = useAuthStore();
    const code = searchParams.get('code');
    const [isSaved, setIsSaved] = useState<boolean>();

    useEffect(() => {
        if (!code) return navigator(-1);

        const authStorage = localStorage.getItem('auth-storage');
        if (authStorage) {
            const authInfo = JSON.parse(authStorage);
            setIsSaved(authInfo.state.isSaved);
        }
    }, []);

    // react의 strictMode에서 useEffect가 2번 실행되기 때문에
    // github Oauth API에서 401 error가 발생하는 이슈 해결 코드
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

    // useEffect(() => {
    //     async function call() {
    //         if (!isCall) {
    //             isCall = true;
    //             const ok = await loginGithub();
    //             if (ok) {
    //                 navigator('/home', { replace: true });
    //             }
    //         }
    //     }
    //     if (code) {
    //         call();
    //     }
    // }, [code]);

    const loginGithub = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/callback/github?code=${code}`);
            if (res.data.resultCd === 200) {
                localStorage.setItem('accessToken', res.data.token);
                login(res.data.data, isSaved ?? false);
                return true;
            }
            return false;
        } catch (error) {
            if (isLogin) {
                navigator('/home');
            } else {
                navigator('/signin');
            }
        }
    };

    return (
        <Container>
            <Box
                sx={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <CircularProgress />
            </Box>
        </Container>
    );
}
