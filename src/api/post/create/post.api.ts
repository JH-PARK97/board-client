import { Post } from '../../client';
import { CreatePostItem } from './post.type';
import { CreatePostBodySchema } from './post.validate';

export default async function createPostAPI(args: CreatePostBodySchema) {
    const { data } = await Post<CreatePostItem>('post', args);
    return data;
}
