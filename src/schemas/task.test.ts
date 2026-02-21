import {createNewTaskSchema} from './task';

const t = (key: string) => key;

describe('createNewTaskSchema', () => {
  const schema = createNewTaskSchema(t);

  it('accepts valid title and description', () => {
    const result = schema.safeParse({title: 'My task', description: 'Some details'});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.title).toBe('My task');
      expect(result.data.description).toBe('Some details');
    }
  });

  it('trims title', () => {
    const result = schema.safeParse({title: '  Trimmed  ', description: ''});
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.title).toBe('Trimmed');
  });

  it('rejects empty title', () => {
    const result = schema.safeParse({title: '', description: ''});
    expect(result.success).toBe(false);
  });

  it('returns task.fieldMandatory for empty title', () => {
    const result = schema.safeParse({title: '', description: ''});
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('task.fieldMandatory');
    }
  });

  it('accepts empty description', () => {
    const result = schema.safeParse({title: 'Only title', description: ''});
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.description).toBe('');
  });
});
