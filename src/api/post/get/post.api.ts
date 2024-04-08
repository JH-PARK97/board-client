import { Get } from '../../client';
// import { CreatePostBodySchema } from './post.validate';
// import { createPostItem } from './post.type';

export default async function getPostAPI() {
    const { data } = await Get('post');
    return data;
}
