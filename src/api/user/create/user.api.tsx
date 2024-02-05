import { Post } from '../../client';
import { SignUpBodySchema } from './user.validate';

type SignUpBodyData = {
    email: string;
    password: string;
    passwordConfirm: string;
    gender: string;
    phoneNumber: string;
    age: number;
};

export default async function createUserAPI(args: SignUpBodySchema) {
    try {
        const formData = new FormData();
        const { age, email, gender, password, passwordConfirm, phoneNumber, profile } = args;

        const body: SignUpBodyData = {
            email,
            password,
            passwordConfirm,
            gender,
            phoneNumber,
            age: Number(age),
        };

        // const blob = new Blob([JSON.stringify(body)], {
        //     type: 'application/json',
        // });
        // formData.append('signUp', blob);
        
        const stringfyBody = JSON.stringify(body);
        formData.append('signUp', stringfyBody);

        if (profile) formData.append('profile', profile || '');

        const { data } = await Post('user', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        return data;
    } catch (e) {
        console.error(e);
    }
}
