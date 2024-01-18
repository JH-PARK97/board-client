import React, { useMemo } from 'react';

// components
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useForm, SubmitHandler } from 'react-hook-form';
import { SignInBodySchema } from '../../api/auth/login.validate';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema as SignInSchema } from '../../api/auth/login.validate';
import loginAPI from '../../api/auth/login.api';
import { AxiosError } from 'axios';
import { FormInput } from '../shared/Form';
import { FormHelperText } from '@mui/material';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
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
    console.log(errors);

    const onSubmit: SubmitHandler<SignInBodySchema> = async (data) => {
        try {
            console.log(data);
            await loginAPI(data);
        } catch (error) {
            if (error instanceof AxiosError) {
            } else {
                console.error(error);
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
                        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
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
