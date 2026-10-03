// Descriptions for `npm run help`. Each key matches a script name in package.json.
// Use a string, or { description, subcommands } for commands that take arguments.
export default {
  test: 'Run the unit tests with vitest (watch mode)',
  tsc: 'Compile the TypeScript, then run main.js',
  lesson: {
    description: 'Manage the branch for each video',
    subcommands: {
      'start <slug>': 'Branch video-<n+1>--<slug> off the current video branch',
      reset: 'Throw away everything since the lesson started, stay on the branch',
      scrap: 'Delete the lesson branch and go back to where it started',
      status: 'Show where the lesson started and what changed since',
    },
  },
  help: 'List all commands (this screen)',
};
