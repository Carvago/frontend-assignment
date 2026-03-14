import {ValidationError} from 'yup';
import type {AnyObjectSchema} from 'yup';

export async function getValidationErrors<TErrors extends Record<string, string | undefined>>(
  schema: AnyObjectSchema,
  values: Record<string, unknown>,
): Promise<TErrors | null> {
  try {
    await schema.validate(values, {abortEarly: false});
    return null;
  } catch (err) {
    if (err instanceof ValidationError) {
      const errors = {} as TErrors;
      err.inner.forEach(e => {
        if (e.path) (errors as Record<string, string>)[e.path] = e.message;
      });
      return errors;
    }
    return null;
  }
}
