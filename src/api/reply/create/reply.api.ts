import { Post } from '../../client';
import { CreateReplyCommentItem } from './reply.type';
import { CreateReplyCommentBodySchema } from './reply.validate';

export default async function createReplyCommentAPI(commentId: string | number, args: CreateReplyCommentBodySchema) {
    const { data } = await Post<CreateReplyCommentItem>(`reply/${commentId}`, args);
    return data;
}
