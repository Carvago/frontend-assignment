import {object, ref, string} from 'yup';

export const registerSchema = object({
  username: string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  password: string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: string()
    .required('Please confirm your password')
    .oneOf([ref('password')], 'Passwords do not match'),
});
