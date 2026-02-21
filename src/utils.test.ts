import {displayName, formatDashboardDate} from './utils';

describe('displayName', () => {
  it('capitalizes first letter and lowercases the rest', () => {
    expect(displayName('alice')).toBe('Alice');
    expect(displayName('BOB')).toBe('Bob');
  });

  it('returns empty string for empty input', () => {
    expect(displayName('')).toBe('');
  });

  it('handles single character', () => {
    expect(displayName('a')).toBe('A');
  });
});

describe('formatDashboardDate', () => {
  it('formats date with day, long month and year for en locale', () => {
    const date = new Date(2023, 10, 20);
    const result = formatDashboardDate(date, 'en');
    expect(result).toMatch(/20/);
    expect(result).toMatch(/November/);
    expect(result).toMatch(/2023/);
  });

  it('uses locale for month name', () => {
    const date = new Date(2023, 10, 20);
    const en = formatDashboardDate(date, 'en');
    const de = formatDashboardDate(date, 'de');
    expect(en).toContain('November');
    expect(de).toMatch(/November|Nov/);
  });
});
