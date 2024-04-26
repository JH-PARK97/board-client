import { client } from '../../client';

export default async function getPostDetailAPI(id: number | string) {
    try {
        const res = await client.get(`post/${id}`);
        return res;
    } catch (error) {
        throw error;
    }
}
