export function init(N: number) {
  return Array.from({ length: N }, (_, i) => i);
}

export function sum(input: number[]) {
  let accum = 0;
  input.forEach(elem => accum += elem);
  return accum;
}