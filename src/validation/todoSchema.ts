import {object, string} from 'yup';
import type {TFunction} from 'i18next';

export const todoSchema = (t: TFunction) => object({
  title: string().trim().required(t('validation.required.taskName')),
  description: string().optional(),
});
