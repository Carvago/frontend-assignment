import {z} from 'zod';

export type TFunction = (key: string) => string;

export function createNewTaskSchema(t: TFunction) {
  return z.object({
    title: z
      .string()
      .min(1, t('task.fieldMandatory'))
      .transform((s) => s.trim()),
    description: z.string(),
  });
}

export type NewTaskFormValues = z.infer<ReturnType<typeof createNewTaskSchema>>;
