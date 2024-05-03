import React, { useMemo, useState } from 'react';

// components
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormInput } from '../../shared/Form';
import { Checkbox, FormControlLabel, FormHelperText } from '@mui/material';
import GitSignInButton from './GitSignInButton';

// validation
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInBodySchema } from 'src/api/auth/login.validate';
import { schema as SignInSchema } from '../../../api/auth/login.validate';

// api
import { loginSTRAPI } from '../../../api/auth/login.api';

import { AxiosError } from 'axios';

// hooks
import {  useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/auth';

const defaultTheme = createTheme();

export default function SignIn() {
    const { login } = useAuthStore();

    // 아이디 기억 체크박스
    const [idSave, setIdSave] = useState<boolean>(false);

    const navigator = useNavigate();

    const {
        handleSubmit,
        control,
        setError,
        formState: { errors },
    } = useForm<SignInBodySchema>({
        mode:'onChange',
        resolver: zodResolver(SignInSchema),
        defaultValues: useMemo(() => {
            let email = '';
            const authStorage = localStorage.getItem('auth-storage');
            if (authStorage) {
                const authInfo = JSON.parse(authStorage);
                if (authInfo.state.isSaved) {
                    email = authInfo.state.email;
                } else {
                    email = '';
                }

                setIdSave(authInfo.state.isSaved);
            }
            return {
                email: email || '',
                password: '',
            };
        }, []),
    });

    const onSubmit: SubmitHandler<SignInBodySchema> = async (data) => {
        try {
            const resp: any = await loginSTRAPI(data);
            if (resp.status === 200 && resp.data.jwt) {
                localStorage.setItem('accessToken', resp.data.jwt);
                login(resp.data.user, idSave);
                navigator('/home');
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorCd = error?.response?.data?.error?.status;

                if (errorCd === 400) {
                    setError('password', { message: '이메일 또는 비밀번호를 확인해 주세요.' });
                }
            } else {
                console.log('error: ', error);
            }
        }
    };

    const handleIdSave = () => {
        setIdSave((prev) => !prev);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <div className="w-full">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        로그인
                    </Typography>

                    <form className="login-form" onSubmit={handleSubmit(onSubmit)} style={{ marginTop: 30 }}>
                        <Grid width={450} container spacing={2}>
                            <Grid item xs={12}>
                                <FormInput fullWidth name="email" control={control} label="이메일" />
                                {errors.email && <FormHelperText error>{errors?.email?.message}</FormHelperText>}
                            </Grid>

                            <Grid item xs={12}>
                                <FormInput
                                    fullWidth
                                    name="password"
                                    control={control}
                                    label="비밀번호"
                                    type={'password'}
                                />
                                {errors.password && <FormHelperText error>{errors?.password?.message}</FormHelperText>}
                            </Grid>
                        </Grid>
                        <FormControlLabel
                            control={<Checkbox color="primary" checked={idSave} onChange={handleIdSave} />}
                            label="아이디 기억하기"
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            로그인
                        </Button>
                        <GitSignInButton />
                        <Grid container>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    계정이 없으신가요?
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </div>
        </ThemeProvider>
    );
}
