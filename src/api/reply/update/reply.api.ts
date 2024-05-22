import { Put } from '../../client';
import { UpdateReplyItem } from './reply.type';
import { UpdateReplyBodySchema } from './reply.validate';

export default async function updateReplyAPI(commentId: number, args: UpdateReplyBodySchema, replyId?: number) {
    if (replyId === undefined) {
        throw new Error('replyId is required for updating a reply');
    }
    const { data } = await Put<UpdateReplyItem>(`reply/parentId/${commentId}/replyId/${replyId}`, args);
    return data;
}
