import { Post } from '../../client';
import { CreatePostBodySchema } from './post.validate';
import { createPostItem } from './post.type';

export default async function createPostAPI(body: CreatePostBodySchema) {
    const { data } = await Post<createPostItem>('post', body, {});
    return data;
}
