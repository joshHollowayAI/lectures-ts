import { expect, test } from 'vitest';
import { sum, init } from './lib';
import * as math from 'mathjs';


test('sum matches mathjs sum', () => {

  const N = 10;
  let input = init(N);

  let summed = sum(input);
  let summedGold = math.sum(input);

  expect(summed).toBe(summedGold);
});