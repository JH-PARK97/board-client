import { Post } from '../client';
import { SignInBodySchema } from './login.validate';
import { UserItem } from './login.type';

export default async function loginAPI(body: SignInBodySchema) {
    const { email, password } = body;
    // const { data } = await client.post('/login', {
    //     email,
    //     password,
    // });

    const { data } = await Post<UserItem>('login', { email, password });

    return data;
}
