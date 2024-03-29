import { CircularProgress, Container } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { useModalStore } from '../../store/modal';
// import Modal from '../shared/Modal/Modal';
import Modal from '../shared/Modal/Modal';
import ModalPortal from '../shared/Modal/MordalPortal';

// let isCall = false;

export default function Github() {
    const iscall = useRef(false);

    const { login, isLogin } = useAuthStore();
    const { toggleModal } = useModalStore();

    const [searchParams] = useSearchParams();
    const navigator = useNavigate();
    const [isSaved, setIsSaved] = useState<boolean>();
    const [loading, setLoading] = useState<boolean>(true);
    const [email, setEmail] = useState<string | null>(null);
    const code = searchParams.get('code');

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

            setLoading(false);
            if (res.data.resultCd === 200) {
                localStorage.setItem('accessToken', res.data.token);
                login(res.data, isSaved ?? false);
                return true;
            } else if (res.data.resultCd === 401) {
                const email = res.data.email;
                setEmail(email);
                toggleModal();
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

    const handleConfirmButton = () => {
        toggleModal();
        navigator('/signup', { state: { email } });
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
                {loading && <CircularProgress />}
                <ModalPortal>
                    <Modal>
                        <Modal.Title hiddenCloseButton={true}>알림</Modal.Title>
                        <Modal.Content>
                            <p>계정이 존재하지 않습니다.</p>
                            <p>회원가입 페이지로 이동합니다.</p>
                        </Modal.Content>
                        <Modal.Footer>
                            <Modal.Button onClick={handleConfirmButton}>확인</Modal.Button>
                        </Modal.Footer>
                    </Modal>
                </ModalPortal>
            </Box>
        </Container>
    );
}
