import { Delete } from '../../client';
import { DeleteCommentItem } from './comment.type';

export default async function deleteCommentAPI(commentId: number | string) {
    try {
        const { data } = await Delete<DeleteCommentItem[]>(`comment/${commentId}`);
        return data;
    } catch (error) {
        throw error;
    }
}
