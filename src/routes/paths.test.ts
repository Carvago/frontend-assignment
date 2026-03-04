import {PATHS, editTaskPath} from './paths';

describe('PATHS', () => {
  it('defines all expected route paths', () => {
    expect(PATHS.LOGIN).toBe('/login');
    expect(PATHS.REGISTER).toBe('/register');
    expect(PATHS.OVERVIEW).toBe('/');
    expect(PATHS.NEW_TASK).toBe('/tasks/new');
    expect(PATHS.EDIT_TASK).toBe('/tasks/:id/edit');
  });
});

describe('editTaskPath', () => {
  it('generates the correct edit path for a given id', () => {
    expect(editTaskPath('abc-123')).toBe('/tasks/abc-123/edit');
  });

  it('handles special characters in id', () => {
    expect(editTaskPath('id-with-dashes')).toBe('/tasks/id-with-dashes/edit');
  });

  it('handles uuid-style ids', () => {
    expect(editTaskPath('550e8400-e29b-41d4-a716-446655440000')).toBe(
      '/tasks/550e8400-e29b-41d4-a716-446655440000/edit'
    );
  });
});
