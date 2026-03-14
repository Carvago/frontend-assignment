import {object, string} from 'yup';

export const todoSchema = object({
  title: string().required('Task name is required'),
  description: string().optional(),
});

export type TodoFormErrors = {
  title?: string;
};
