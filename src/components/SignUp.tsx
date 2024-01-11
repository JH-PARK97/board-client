import React, { useMemo } from 'react';

// Components
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormInputText } from './shared/Form/FormInput';
import { Container } from '@mui/system';
import { CssBaseline, FormHelperText } from '@mui/material';

// form & type
import { useForm, SubmitHandler } from 'react-hook-form';
import { schema as SignUpSchema } from '../validate/signup.validate';
import { zodResolver } from '@hookform/resolvers/zod';
import type { SignUpBodySchema } from '../validate/signup.validate';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

export default function SignUp() {
    const defaultValues = useMemo(() => {
        return {
            email: '',
            userId: '',
            userPw: '',
            userPwConfirm: '',
        };
    }, []);
    const {
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<SignUpBodySchema>({
        defaultValues,
        resolver: zodResolver(SignUpSchema),
    });
    const onSubmit: SubmitHandler<SignUpBodySchema> = (data) => {
        console.log(data);
    };
    console.log('errors : ', errors);

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
                        Sign up
                    </Typography>

                    <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: 30 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormInputText fullWidth name="email" control={control} label="Email" />
                                <FormHelperText error>{errors.email && <p>{errors.email.message}</p>}</FormHelperText>
                            </Grid>

                            <Grid item xs={12}>
                                <FormInputText fullWidth name="userId" control={control} label="ID" />
                                <FormHelperText error>{errors.userId && <p>{errors.userId.message}</p>}</FormHelperText>
                            </Grid>
                            <Grid item xs={12}>
                                <FormInputText
                                    fullWidth
                                    name="userPw"
                                    control={control}
                                    label="Password"
                                    type={'password'}
                                />
                                <FormHelperText error>{errors.userPw && <p>{errors.userPw.message}</p>}</FormHelperText>
                            </Grid>
                            <Grid item xs={12}>
                                <FormInputText
                                    fullWidth
                                    name="userPwConfirm"
                                    control={control}
                                    label="Password Confirm"
                                    type={'password'}
                                />
                                <FormHelperText error>
                                    {errors.userPwConfirm && <p>{errors.userPwConfirm.message}</p>}
                                </FormHelperText>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/Home" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}
