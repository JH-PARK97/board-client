import { Post } from '../../client';
import { CreateReplyItem } from './reply.type';
import { CreateReplyBodySchema } from './reply.validate';

export default async function createReplyAPI(commentId: string | number, args: CreateReplyBodySchema) {
    const { data } = await Post<CreateReplyItem>(`reply/${commentId}`, args);
    return data;
}
