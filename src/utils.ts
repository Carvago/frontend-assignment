export function formatDashboardDate(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function displayName(username: string): string {
  if (!username) return '';
  return username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
}
