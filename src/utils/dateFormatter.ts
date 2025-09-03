const formatter = new Intl.DateTimeFormat('cs-CZ', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export function formatCzechDate(date: Date | string | number): string {
  const dateObj = typeof date === 'object' ? date : new Date(date);

  if (isNaN(dateObj.getTime())) {
    console.error('Invalid date', date);
  }

  return formatter.format(dateObj);
}
