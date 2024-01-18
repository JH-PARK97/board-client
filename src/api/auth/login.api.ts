import { instance } from '../client';

export default async function loginAPI(body: any) {
    const { email, password } = body;
    const { data } = await instance.post('/login', {
        email,
        password,
    });
    return data;
}
