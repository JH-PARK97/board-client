import { z } from 'zod';

export const schema = z
    .object({
        userId: z.string().regex(/^(?=.*\d)(?=.*[a-z])[a-z0-9]{8,20}$/, {
            message: '영문+숫자를 조합하여 8~20자 내외로 입력해 주세요.',
        }),
        email: z.string().email('이메일을 양식이 올바르지 않습니다.'),
        userPw: z.string().regex(/^(?=.*\d)(?=.*[a-z])[a-z0-9]{8,20}$/, {
            message: '영문+숫자를 조합하여 8~20자 내외로 입력해 주세요.',
        }),
        userPwConfirm: z.string(),
    })
    .superRefine(({ userPw, userPwConfirm }, ctx) => {
        if (userPw !== userPwConfirm) {
            ctx.addIssue({
                code: 'custom',
                message: '비밀번호 확인이 일치하지 않습니다.',
                path: ['userPwConfirm'],
            });
        }
    });
export type SignUpBodySchema = z.infer<typeof schema>;
