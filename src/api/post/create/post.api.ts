import { client, Post } from '../../client';
import { createPostItem } from './post.type';

// export default async function createPostAPI(args: createPostItem) {
//     console.log(args);
//     try {
//         const res = await client.post(`post`, { data: { ...args } });
//         return res;
//     } catch (error) {
//         throw error;
//     }
// }

export default async function createPostAPI(args: createPostItem) {
    const { data } = await Post<createPostItem>('post', args);
    return data;
}
