import { Put } from '../../client';
import { UpdatePostItem } from './post.type';
import { UpdatePostBodySchema } from './post.validate';

export default async function updatePostAPI(id: string, args: UpdatePostBodySchema) {
    const { data } = await Put<UpdatePostItem>(`post/${id}`, args);
    return data;
}
