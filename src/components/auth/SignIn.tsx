import React, { useMemo } from 'react';

// components
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormInput } from '../shared/Form';
import { FormHelperText } from '@mui/material';

// validation
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInBodySchema } from 'src/api/auth/login.validate';
import { schema as SignInSchema } from 'src/api/auth/login.validate';

// api
import loginAPI from 'src/api/auth/login.api';
import { AxiosError } from 'axios';
import { instance } from '../../api/client';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>
            {new Date().getFullYear()}
        </Typography>
    );
}

const defaultTheme = createTheme();

export default function SignIn() {
    const defaultValues = useMemo(() => {
        return {
            email: '',
            password: '',
        };
    }, []);

    const {
        handleSubmit,
        control,
        watch,
        setError,
        formState: { errors },
    } = useForm<SignInBodySchema>({
        resolver: zodResolver(SignInSchema),
        defaultValues,
    });

    const onSubmit: SubmitHandler<SignInBodySchema> = async (data) => {
        try {
            const resp = await loginAPI(data);
            console.log(resp);

            // console.log(resp?.data);
        } catch (error) {
            if (error instanceof AxiosError) {
            } else {
                console.error('error : ', error);
            }
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
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
                        <Grid container spacing={2}>
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
                        {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="아이디 기억하기" /> */}
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            로그인
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    비밀번호를 잊으셨나요?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    계정이 없으신가요?
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Box>

                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
