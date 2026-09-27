import { graph } from './graph.js';
import { init } from './lib.js';
const N = 10;
// let input = [0,1,2,3,4,5,6,7,8,9];
let input = init(N);
// function f(x: number) {
//   return 2 * x;
// }
const f = (x) => 2 * x;
// let output: number[] = [];
// for (let i = 0; i < input.length; i++) {
//   output[i] = f( input[i] );
// }
let output = input.map(x => f(x));
graph(input, output);
