import { z } from 'zod';

export const schema = z.object({
    title: z.string().min(1, { message: '제목을 입력해 주세요!' }),
    content: z.string().min(1, { message: '내용을 입력해 주세요!' }),
    category: z.string().min(1, { message: '카테고리를 선택해 주세요' }),
});

export type UpdatePostBodySchema = z.infer<typeof schema>;
