import { client } from '../../client';

export default async function getPostDetailAPI(id: number | string) {
    try {
        const { data } = await client.get(`post/${id}`);
        return data;
    } catch (error) {
        throw error;
    }
}
