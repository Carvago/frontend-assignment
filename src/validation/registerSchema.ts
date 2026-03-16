import {object, ref, string} from 'yup';
import type {TFunction} from 'i18next';

export const registerSchema = (t: TFunction) => object({
  fullName: string()
    .required(t('validation.required.fullName'))
    .min(2, t('validation.min.fullName'))
    .max(50, t('validation.max.fullName')),
  username: string()
    .required(t('validation.required.username'))
    .min(3, t('validation.min.username')),
  password: string()
    .required(t('validation.required.password'))
    .min(6, t('validation.min.password')),
  confirmPassword: string()
    .required(t('validation.required.confirmPassword'))
    .oneOf([ref('password')], t('validation.passwordMatch')),
});
