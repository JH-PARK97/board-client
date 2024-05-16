import { z } from 'zod';

export const schema = z.object({
    content: z.string().min(1, { message: '댓글을 입력해 주세요!' }),
});

export type CreateReplyCommentBodySchema = z.infer<typeof schema>;
