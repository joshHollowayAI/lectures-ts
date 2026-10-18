import { styleText as style } from 'node:util';

type Color = 'red' | 'yellow' | 'blue' | 'green';


export function logStatus(message: string, color: Color) {
  const time = style(color, new Date().toLocaleTimeString());
  console.log(time, style([color, 'bold'], message))
}

export function logError(message: string, error: Error) {
  const time = style('gray', new Date().toLocaleTimeString(), { stream: process.stderr });
  console.error(time, style(['red', 'bold'], message, { stream: process.stderr }), error);
}