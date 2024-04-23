import { client } from '../../client';
import { createPostItem } from './post.type';

export default async function createPostAPI(args: createPostItem) {
    console.log(args);
    try {
        const res = await client.post(`posts`, { data: { ...args } });
        return res;
    } catch (error) {
        throw error;
    }
}
