import {z} from 'zod';

import type {LoginRequest} from '../types/auth';

const REQUIRED = 'validation.required';

export const loginSchema = z.object({
  username: z.string().trim().min(1, REQUIRED),
  password: z.string().trim().min(1, REQUIRED),
}) satisfies z.ZodType<LoginRequest>;

export const registerSchema = loginSchema;

export const todoFormSchema = z.object({
  title: z.string().trim().min(1, REQUIRED),
  description: z.string().trim(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type TodoFormData = z.infer<typeof todoFormSchema>;
