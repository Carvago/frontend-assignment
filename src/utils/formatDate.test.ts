import {formatDate} from './formatDate';

describe('formatDate', () => {
  it('formats date correctly', () => {
    const date = new Date(2023, 10, 20); // 20 November 2023
    expect(formatDate(date)).toBe('20 November 2023');
  });

  it('formats single digit day correctly', () => {
    const date = new Date(2023, 0, 5); // 5 January 2023
    expect(formatDate(date)).toBe('5 January 2023');
  });

  it('formats last day of year correctly', () => {
    const date = new Date(2023, 11, 31); // 31 December 2023
    expect(formatDate(date)).toBe('31 December 2023');
  });

  it('returns different results for different dates', () => {
    const date1 = new Date(2023, 0, 1);
    const date2 = new Date(2024, 0, 1);
    expect(formatDate(date1)).not.toBe(formatDate(date2));
  });
});
