export function getErrorMessage(error: Error | null, customMessage?: string) {
  if (!error) {
    return null;
  }
  return error?.message || customMessage || 'Something went wrong. Please try again.';
}
