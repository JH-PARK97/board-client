import { client } from '../../client';

export default async function getUserPostAPI(userId: string, queryString?: string) {
    try {
        const { data } = await client.get(`user/${userId}?${queryString}`);
        return data;
    } catch (error) {
        throw error;
    }
}
