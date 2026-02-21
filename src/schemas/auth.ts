import {z} from 'zod';

export type TFunction = (key: string) => string;

export function createLoginSchema(t: TFunction) {
  return z.object({
    username: z
      .string()
      .min(1, t('auth.fieldMandatory'))
      .transform((s) => s.trim()),
    password: z.string().min(1, t('auth.fieldMandatory')),
  });
}

export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>;

export function createRegisterSchema(t: TFunction) {
  return z
    .object({
      username: z
        .string()
        .min(1, t('auth.fieldMandatory'))
        .transform((s) => s.trim()),
      password: z.string().min(1, t('auth.fieldMandatory')),
      passwordConfirm: z.string().min(1, t('auth.fieldMandatory')),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: t('auth.passwordsDoNotMatch'),
      path: ['passwordConfirm'],
    });
}

export type RegisterFormValues = z.infer<ReturnType<typeof createRegisterSchema>>;
