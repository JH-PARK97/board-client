import { Post } from '../../client';
import { CreateCommentItem } from './comment.type';
import { CreateCommentBodySchema } from './comment.validate';

export default async function createCommentAPI(postId: string | number, args: CreateCommentBodySchema) {
    const { data } = await Post<CreateCommentItem>(`comment/${postId}`, args);
    return data;
}
