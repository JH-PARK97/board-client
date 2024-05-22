import { Delete } from '../../client';
import { DeleteReplyItem } from './reply.type';

export default async function deleteReplyAPI(commentId: number, replyId: number) {
    const { data } = await Delete<DeleteReplyItem>(`reply/parentId/${commentId}/replyId/${replyId}`);
    return data;
}
