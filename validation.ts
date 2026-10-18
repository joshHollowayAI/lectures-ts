export function isValidTitle(title: unknown): boolean {
  return typeof title === 'string' && title.trim() !== '';
}