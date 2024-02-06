import { Post } from '../client';
import { SignInBodySchema } from './login.validate';
import { UserItem } from './login.type';

export default async function loginAPI(body: SignInBodySchema) {
    const { data } = await Post<UserItem>('login', body);
    return data;
}
