/**
 * Formats a Date into a human-readable localized string.
 * @example formatDate(new Date('2023-11-20')) // "November 20, 2023"
 * @example formatDate(new Date('2023-11-20'), 'cs-CZ') // "20. listopadu 2023"
 */
export const formatDate = (date: Date, locale = 'cs-CZ'): string =>
  new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
