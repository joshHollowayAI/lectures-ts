import { graph } from './graph.js';
import { init } from './lib.js';

const N = 10;
let input = init(N);
const f = (x: number) => 2 * x;
let output = input.map(x => f(x));

graph(input, output);