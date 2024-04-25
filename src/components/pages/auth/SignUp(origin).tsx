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
import { FormFileUpload, FormInput, FormRadioGroup, FormSelect } from '../../shared/Form/index';

// form & type
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { schema as SignUpSchema } from '../../../api/user/create/user.validate';
import type { SignUpBodySchema } from '../../../api/user/create/user.validate';

// fetch
import createUserAPI from '../../../api/user/create/user.api';
import { AxiosError } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import ImagePreview from '../../shared/ImagePreview';
import { getRandomAvatar } from '../../../utils/utils';

const ageOptions = Array.from({ length: 100 }, (_, index) => ({
    value: (index + 1).toString(),
    label: (index + 1).toString(),
}));

const defaultTheme = createTheme();

export default function SignUp() {
    const [imageUrl, setImageUrl] = useState<string>('');
    const avatars = useMemo(() => {
        return getRandomAvatar();
    }, []);

    const navigator = useNavigate();
    const location = useLocation();
    const email = location?.state?.email;

    const defaultValues: SignUpBodySchema = useMemo(() => {
        return {
            email: email ? email : '',
            nickname: '',
            password: '',
            passwordConfirm: '',
            age: '',
            gender: '',
            phoneNumber: '',
            profile: undefined,
        };
    }, [email]);
    const methods = useForm<SignUpBodySchema>({
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

    const onSubmit: SubmitHandler<SignUpBodySchema> = async (data) => {
        try {
            if (!data.profile) {
                data.profile = avatars;
            }
            const resp = await createUserAPI(data);

            if (!resp) return null;
            if (resp.resultCd === 200) {
                navigator('/signin');
            }
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
                if (error.request.status === 409) {
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
                                    <FormInput fullWidth name="nickname" control={control} label="닉네임" />
                                    {errors.nickname && (
                                        <FormHelperText error>{errors?.nickname?.message}</FormHelperText>
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

                                <Grid item xs={12}>
                                    <FormInput
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
                                    <FormSelect
                                        formControlProps={{ fullWidth: true }}
                                        inputLabel="나이"
                                        control={control}
                                        name={'age'}
                                        selectItem={ageOptions.map((option) => ({
                                            value: option.value,
                                            children: option.label,
                                        }))}
                                    />
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
