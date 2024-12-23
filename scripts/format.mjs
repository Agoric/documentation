import { exec } from 'child_process';

exec(
  'node scripts/markdown-js-snippets-linter.mjs "main/**/*.md" && prettier --check "**/*.md" --config .prettierrc.json',
  (err, stdout, stderr) => {
    if (err) {
      const modifiedStderr = stderr.replace(
        'Run Prettier with --write to fix',
        'Run `yarn format` to fix',
      );
      console.warn(modifiedStderr);
      process.exit(1);
    }
  },
);
