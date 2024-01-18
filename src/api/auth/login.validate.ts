import { z } from 'zod';

export const schema = z.object({
    email: z.string().email('이메일 양식이 올바르지 않습니다.'),
    password: z.string().regex(/^(?=.*\d)(?=.*[a-z])[a-z0-9]{8,20}$/, {
        message: '영문+숫자를 조합하여 8~20자 내외로 입력해 주세요.',
    }),
});

export type SignInBodySchema = z.infer<typeof schema>;
