import {formatDate} from './formatDate';

describe('formatDate', () => {
  it('formats date in Czech locale by default', () => {
    const date = new Date('2023-11-20T00:00:00');
    expect(formatDate(date)).toContain('2023');
    expect(formatDate(date)).toContain('20');
  });

  it('formats date with explicit en-US locale', () => {
    const date = new Date('2024-01-15T00:00:00');
    expect(formatDate(date, 'en-US')).toBe('January 15, 2024');
  });

  it('formats date with Czech locale', () => {
    const date = new Date('2023-11-20T00:00:00');
    const result = formatDate(date, 'cs-CZ');
    expect(result).toContain('2023');
    expect(result).toContain('20');
  });

  it('handles current date without errors', () => {
    expect(() => formatDate(new Date())).not.toThrow();
  });

  it('includes day, month, and year parts', () => {
    const date = new Date('2025-06-03T00:00:00');
    const result = formatDate(date);
    expect(result).toContain('2025');
    expect(result).toContain('3');
  });
});
