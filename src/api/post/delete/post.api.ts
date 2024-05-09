import { client } from '../../client';

export default async function deletePostAPI(id: number | string) {
    try {
        const { data } = await client.delete(`post/${id}`);
        return data;
    } catch (error) {
        throw error;
    }
}
