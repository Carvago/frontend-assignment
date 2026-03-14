import {object, string} from 'yup';

import {getValidationErrors} from './getValidationErrors';

const schema = object({
  username: string().required('Username is required').min(3, 'Username too short'),
  password: string().required('Password is required'),
});

describe('getValidationErrors', () => {
  it('returns null when all fields are valid', async () => {
    const result = await getValidationErrors(schema, {username: 'john', password: 'secret'});
    expect(result).toBeNull();
  });

  it('returns errors when required fields are missing', async () => {
    const result = await getValidationErrors(schema, {username: '', password: ''});
    expect(result).toMatchObject({
      password: 'Password is required',
    });
    expect(result?.username).toBeDefined();
  });

  it('returns all errors at once when multiple fields are invalid', async () => {
    const result = await getValidationErrors(schema, {username: '', password: ''});
    expect(result).not.toBeNull();
    expect(Object.keys(result!)).toHaveLength(2);
  });

  it('returns field-specific error message', async () => {
    const result = await getValidationErrors(schema, {username: 'ab', password: 'secret'});
    expect(result).toEqual({username: 'Username too short'});
  });
});
