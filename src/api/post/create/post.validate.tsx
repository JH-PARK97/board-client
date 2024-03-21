import { z } from 'zod';

export const schema = z.object({
    title: z.string().min(1, { message: '제목을 입력해 주세요!' }),
    content: z.string().min(100, { message: '내용을 입력해 주세요!' }),
});

export type CreatePostBodySchema = z.infer<typeof schema>;
