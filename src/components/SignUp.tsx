import React, { useMemo } from 'react';

// Components
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
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
import createUserAPI from '../api/user/create/user';
import { FormRadioGroup } from './shared/Form/FormRadioGroup';

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
            password: '',
            passwordConfirm: '',
            age: '',
            gender: '',
            phoneNumber: '',
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
    const onSubmit: SubmitHandler<SignUpBodySchema> = async (data) => {
        try {
            const res = await createUserAPI(data);
            console.log('res : ', res);
        } catch (e) {
            console.error(e as Error);
        }
    };

    console.log(watch());
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
                        회원 가입
                    </Typography>

                    <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: 30 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormInputText fullWidth name="email" control={control} label="이메일" />
                                {errors.email && <FormHelperText error>{errors?.email?.message}</FormHelperText>}
                            </Grid>

                            <Grid item xs={12}>
                                <FormInputText
                                    fullWidth
                                    name="password"
                                    control={control}
                                    label="비밀번호"
                                    type={'password'}
                                />
                                {errors.password && <FormHelperText error>{errors?.password?.message}</FormHelperText>}
                            </Grid>

                            <Grid item xs={12}>
                                <FormInputText
                                    fullWidth
                                    name="passwordConfirm"
                                    control={control}
                                    label="비밀번호 확인 "
                                    type={'password'}
                                />
                                {errors.passwordConfirm && (
                                    <FormHelperText error>{errors?.passwordConfirm?.message}</FormHelperText>
                                )}
                            </Grid>

                            <Grid item xs={6}>
                                <FormInputText name="age" control={control} label="나이" />
                                {errors.age && <FormHelperText error>{errors?.age?.message}</FormHelperText>}
                            </Grid>
                            <Grid item xs={6}>
                                <FormRadioGroup
                                    control={control}
                                    name={'gender'}
                                    group={[
                                        { value: 'male', label: '남자' },
                                        { value: 'female', label: '여자' },
                                    ]}
                                    groupLabel={'성별'}
                                />

                                {errors.gender && <FormHelperText error>{errors?.gender?.message}</FormHelperText>}
                            </Grid>
                            <Grid item xs={12}>
                                <FormInputText fullWidth name="phoneNumber" control={control} label="전화번호" />
                                {errors.phoneNumber && (
                                    <FormHelperText error>{errors?.phoneNumber?.message}</FormHelperText>
                                )}
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            회원가입
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/Home" variant="body2">
                                    이미 계정이 있으신가요?
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
