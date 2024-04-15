import axios from 'axios';
import { Post } from '../../client';
import { SignUpBodySchema, StrapiSignUpBodySchema } from './user.validate';

type SignUpBodyData = {
    email: string;
    nickname: string;
    password: string;
    passwordConfirm: string;
    gender: string;
    phoneNumber: string;
    age: number;
    profile?: string | File;
};

type StrapiSignUpBodyData = {
    email: string;
    username: string;
    password: string;
    gender: string;
    phoneNumber: string;
    profileImage?: string | File;
};

export default async function createUserAPI(args: SignUpBodySchema) {
    const formData = new FormData();
    const { age, email, nickname, gender, password, passwordConfirm, phoneNumber, profile } = args;

    const body: SignUpBodyData = {
        email,
        nickname,
        password,
        passwordConfirm,
        gender,
        phoneNumber,
        age: Number(age),
        profile,
    };

    // const blob = new Blob([JSON.stringify(body)], {
    //     type: 'application/json',
    // });
    // formData.append('signUp', blob);

    const stringifyBody = JSON.stringify(body);

    formData.append('signUp', stringifyBody);

    formData.append('profile', profile || '');

    // console.log('blob : ', await blob.text());
    // console.log('stringifyBody : ', stringifyBody);

    const { data } = await Post('user', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

    return data;
}

export async function createUserSTRAPI(args: StrapiSignUpBodySchema) {
    // const formData = new FormData();
    const { email, gender, password, username, phoneNumber, profileImage } = args;

    // const body: StrapiSignUpBodyData = {
    //     email,
    //     username,
    //     password,
    //     gender,
    //     phoneNumber,
    //     profileImage,
    // };
    // console.log('body', body)

    // const stringifyBody = JSON.stringify(body);

    // formData.append('signUp', stringifyBody);
    // console.log('stringifyBody : ' ,stringifyBody)

    // formData.append('profileIamge', profileImage || '');

    const res = await axios.post(
        'http://localhost:1337/api/auth/local/register',
        {
            email,
            username,
            password,
            gender,
            phoneNumber,
            profileImage,
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    return res;
}
