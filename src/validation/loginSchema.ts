import {object, string} from 'yup';
import type {TFunction} from 'i18next';

export const loginSchema = (t: TFunction) => object({
  username: string().required(t('validation.required.username')),
  password: string().required(t('validation.required.password')),
});
