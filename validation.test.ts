import { expect, test } from 'vitest';
import { isValidTitle } from './validation.ts';

test('accepts a normal title', () => {
  expect(isValidTitle('Buy groceries')).toBe(true);
});

test('rejects a title that is only space', () => {
  expect(isValidTitle('    ')).toBe(false);
  expect(isValidTitle('')).toBe(false);
});

test('rejects anything that is not a string', () => {
  expect(isValidTitle(67)).toBe(false);
  expect(isValidTitle(undefined)).toBe(false);
});