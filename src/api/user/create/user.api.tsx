import { client } from '../../client';

export default async function createUserAPI(body: any) {
    const { age, email, gender, password, phoneNumber } = body;
    const { data } = await client.post('/user', {
        age: Number(age),
        email,
        gender,
        password,
        phoneNumber,
    });
    return data;
}
