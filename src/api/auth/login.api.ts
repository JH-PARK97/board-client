import { client, Get, Post } from '../client';
import { SignInBodySchema } from './login.validate';
import { UserItem } from './login.type';

export default async function loginAPI(body: SignInBodySchema) {
    const { data } = await Post<UserItem>('login', body);
    return data;
}

export async function loginSTRAPI(args: SignInBodySchema) {
    const body = {
        identifier: args.email,
        password: args.password,
    };
    try {
        const res = await client.post('auth/local', {
            ...body,
        });
        if (res.status === 200) {
            if (res.data.user) {
                const id = res.data.user.id;
                const { data } = await client.get(`/users-permissions/roles/${id}`);
                const role = data.role.name;
                res.data.user.role = role;
            }
        }
        return res;
    } catch (error) {
        throw error;
    }
}
