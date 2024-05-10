import { Get } from '../../client';
import { CommentList } from './comment.type';

export default async function getCommentAPI(id: number | string) {
    try {
        const { data } = await Get<CommentList>(`comment/${id}`);
        return data;
    } catch (error) {
        throw error;
    }
}
