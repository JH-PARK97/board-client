import { Post } from '../client';
import { SignInBodySchema } from './login.validate';
import { UserItem } from './login.type';
import axios from 'axios';

export default async function loginAPI(body: SignInBodySchema) {
    const { data } = await Post<UserItem>('login', body);
    return data;
}

export async function loginSTRAPI(args: SignInBodySchema) {
    const res = axios.post('http://localhost:1337/api/auth/local', {
        identifier: args.email,
        password: args.password,
    });

    return res;
}
