// Prints every npm script in package.json with its description from commands.mjs.
import { readFileSync } from 'node:fs';
import help from './commands.mjs';

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const scripts = pkg.scripts ?? {};

const c = (code) => (s) => `\x1b[${code}m${s}\x1b[0m`;
const bold = c('1');
const dim = c('2');
const cyan = c('36');
const green = c('32');
const yellow = c('33');
const magenta = c('35');
const red = c('31');

const width = Math.max(...Object.keys(scripts).map((name) => name.length));

console.log();
console.log(bold(magenta('  ★ Available commands ★')));
console.log(dim('  ─────────────────────────────────────────────'));

for (const name of Object.keys(scripts)) {
  const entry = help[name];
  const desc = typeof entry === 'string' ? entry : entry?.description;
  console.log(`  ${green('npm run')} ${bold(cyan(name.padEnd(width)))}  ${desc ? yellow(desc) : red('(no description)')}`);

  const subs = Object.entries(entry?.subcommands ?? {});
  const subWidth = Math.max(0, ...subs.map(([sub]) => sub.length));
  for (const [sub, subDesc] of subs) {
    console.log(`      ${dim('↳')} ${magenta(sub.padEnd(subWidth))}  ${dim(subDesc)}`);
  }
}

console.log();
console.log(dim('  Add a description for a command in scripts/commands.mjs.'));
console.log();
