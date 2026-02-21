import {createLoginSchema, createRegisterSchema} from './auth';

const t = (key: string) => key;

describe('createLoginSchema', () => {
  const schema = createLoginSchema(t);

  it('accepts valid username and password', () => {
    const result = schema.safeParse({username: 'alice', password: 'secret123'});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.username).toBe('alice');
      expect(result.data.password).toBe('secret123');
    }
  });

  it('trims username', () => {
    const result = schema.safeParse({username: '  bob  ', password: 'pass'});
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.username).toBe('bob');
  });

  it('rejects empty username', () => {
    const result = schema.safeParse({username: '', password: 'pass'});
    expect(result.success).toBe(false);
  });

  it('rejects empty password', () => {
    const result = schema.safeParse({username: 'alice', password: ''});
    expect(result.success).toBe(false);
  });

  it('returns auth.fieldMandatory for missing username', () => {
    const result = schema.safeParse({username: '', password: 'x'});
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('auth.fieldMandatory');
    }
  });
});

describe('createRegisterSchema', () => {
  const schema = createRegisterSchema(t);

  it('accepts valid credentials when passwords match', () => {
    const result = schema.safeParse({
      username: 'alice',
      password: 'secret123',
      passwordConfirm: 'secret123',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.username).toBe('alice');
      expect(result.data.password).toBe('secret123');
      expect(result.data.passwordConfirm).toBe('secret123');
    }
  });

  it('trims username', () => {
    const result = schema.safeParse({
      username: '  bob  ',
      password: 'pass',
      passwordConfirm: 'pass',
    });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.username).toBe('bob');
  });

  it('rejects when passwords do not match', () => {
    const result = schema.safeParse({
      username: 'alice',
      password: 'secret123',
      passwordConfirm: 'different',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const confirmError = result.error.issues.find((i) => i.path.includes('passwordConfirm'));
      expect(confirmError?.message).toBe('auth.passwordsDoNotMatch');
    }
  });

  it('rejects empty passwordConfirm', () => {
    const result = schema.safeParse({
      username: 'alice',
      password: 'secret',
      passwordConfirm: '',
    });
    expect(result.success).toBe(false);
  });
});
