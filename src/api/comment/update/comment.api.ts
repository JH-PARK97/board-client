import { Put } from '../../client';
import { UpdateCommentItem } from './comment.type';
import { UpdateCommentBodySchema } from './comment.validate';

export default async function updateCommentAPI(commentId: number, args: UpdateCommentBodySchema) {
    const { data } = await Put<UpdateCommentItem>(`comment/${commentId}`, args);
    return data;
}
