import { init, sum } from './lib.js';
const N = 10;
let input = init(N);

let summed = sum(input);

console.log('input: ', input);
console.log('summed: ', summed);