import { Post } from '../../client';
import { CreateCommentItem } from './comment.type';
import { CreateCommentBodySchema } from './comment.validate';

export default async function createPostAPI(id: string | number, args: CreateCommentBodySchema) {
    const { data } = await Post<CreateCommentItem>(`comment/${id}`, args);
    return data;
}
