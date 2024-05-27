import { client } from '../../client';

export default async function getUserPostAPI(userId: string) {
    try {
        const { data } = await client.get(`user/${userId}`);
        return data;
    } catch (error) {
        throw error;
    }
}
