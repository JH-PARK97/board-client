import React, { useEffect, useMemo, useState } from 'react';

// components
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/system';
import { CssBaseline, FormHelperText } from '@mui/material';
import { FormFileUpload, FormInput, FormRadioGroup, FormSelect } from '../shared/Form/index';

// form & type
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { schemaStrapi as SignUpSchema } from '../../api/user/create/user.validate';
import type { StrapiSignUpBodySchema } from '../../api/user/create/user.validate';

// fetch
import { createUserSTRAPI } from '../../api/user/create/user.api';
import { AxiosError } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import ImagePreview from '../shared/ImagePreview';
import { getRandomAvatar } from '../../utils/utils';

const defaultTheme = createTheme();

export default function SignUp() {
    const [imageUrl, setImageUrl] = useState<string>('');
    const avatars = useMemo(() => {
        return getRandomAvatar();
    }, []);

    const navigator = useNavigate();
    const location = useLocation();
    const email = location?.state?.email;

    const defaultValues: StrapiSignUpBodySchema = useMemo(() => {
        return {
            email: email ? email : '',
            username: '',
            password: '',
            gender: '',
            phoneNumber: '',
            profileImage: undefined,
        };
    }, [email]);
    const methods = useForm<StrapiSignUpBodySchema>({
        mode: 'onChange',
        resolver: zodResolver(SignUpSchema),
        defaultValues,
    });

    const {
        control,
        setError,
        formState: { errors },
        handleSubmit,
    } = methods;

    const onSubmit: SubmitHandler<StrapiSignUpBodySchema> = async (data) => {
        console.log(data);
        try {
            if (!data.profileImage) {
                data.profileImage = avatars;
            }

            const resp : any = await createUserSTRAPI(data);
            if (!resp) return null;
   
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
                if (error.request.status === 400) {
                    setError('email', { message: '중복된 이메일입니다.' }, { shouldFocus: true });
                }
            } else {
                console.error('error : ', error);
            }
        }
    };

    const handleFileUpload = (url: string) => {
        setImageUrl(url);
    };

    return (
        <FormProvider {...methods}>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            회원 가입
                        </Typography>
                        <form method="post" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <div
                                        className="profile-image-wrapper"
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            justifyItems: 'center',
                                            flexDirection: 'column-reverse',
                                        }}
                                    >
                                        <FormFileUpload content="업로드" onUpload={handleFileUpload} />
                                        <ImagePreview
                                            height={150}
                                            width={150}
                                            imageUrl={imageUrl ? imageUrl : avatars}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormInput
                                        fullWidth
                                        name="email"
                                        control={control}
                                        label="이메일"
                                        disabled={!!email}
                                    />
                                    {errors.email && <FormHelperText error>{errors?.email?.message}</FormHelperText>}
                                </Grid>

                                <Grid item xs={12}>
                                    <FormInput fullWidth name="username" control={control} label="닉네임" />
                                    {errors.username && (
                                        <FormHelperText error>{errors?.username?.message}</FormHelperText>
                                    )}
                                </Grid>

                                <Grid item xs={12}>
                                    <FormInput
                                        fullWidth
                                        name="password"
                                        control={control}
                                        label="비밀번호"
                                        type={'password'}
                                    />
                                    {errors.password && (
                                        <FormHelperText error>{errors?.password?.message}</FormHelperText>
                                    )}
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
                                    <FormInput fullWidth name="phoneNumber" control={control} label="전화번호" />
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
                                    <Link href="/signin" variant="body2">
                                        이미 계정이 있으신가요?
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Container>
            </ThemeProvider>
        </FormProvider>
    );
}
