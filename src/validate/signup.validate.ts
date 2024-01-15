import { z } from 'zod';

export const schema = z
    .object({
        email: z.string().email('이메일 양식이 올바르지 않습니다.'),
        password: z.string().regex(/^(?=.*\d)(?=.*[a-z])[a-z0-9]{8,20}$/, {
            message: '영문+숫자를 조합하여 8~20자 내외로 입력해 주세요.',
        }),
        passwordConfirm: z.string(),
        age: z
            .string()
            .min(1, '나이를 입력해 주세요.')
            .regex(/^[0-9]+$/, '숫자만 입력 가능합니다.'),
        gender: z.string().min(1, '성별을 선택해 주세요.'),
        phoneNumber: z.string({ required_error: '전화번호를 입력해 주세요' }),
    })
    .superRefine(({ password, passwordConfirm }, ctx) => {
        if (password !== passwordConfirm) {
            ctx.addIssue({
                code: 'custom',
                message: '비밀번호 확인이 일치하지 않습니다.',
                path: ['passwordConfirm'],
            });
        }
    });
export type SignUpBodySchema = z.infer<typeof schema>;
