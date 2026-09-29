#!/usr/bin/env node
/**
 * check-doc-excerpts.mjs
 *
 * Provenance checker for inline code examples in the documentation.
 *
 * Two ways exist to put a code example on a documentation page:
 *
 *  1. VitePress transclusion, `<<< @/../snippets/<file>#<region>`. The page
 *     never holds a copy, so the example cannot drift from its source. This
 *     is the preferred form and this script only checks that the target file
 *     and region resolve.
 *
 *  2. A literal fenced code block. Necessary where transclusion does not work
 *     (a fence nested inside a list item or a container directive) or where
 *     the Markdown source should stay readable on its own. A literal fence
 *     can drift, so it carries an invisible provenance annotation naming the
 *     file and region it was excerpted from:
 *
 *         <!-- excerpt: snippets/js-programming/test-exo.js#counterInterface -->
 *         ```js
 *         ...the exact text of that region...
 *         ```
 *
 *     This script then enforces three things about it:
 *       a. the named file and region exist;
 *       b. the fence text equals the region text, ignoring the common
 *          indentation each side carries from its own surroundings;
 *       c. the named file is exercised by the AVA suite, either because it is
 *          itself a test file AVA collects or because some test file reaches
 *          it through a chain of static imports.
 *
 * A fence that genuinely cannot be excerpted from running code (deliberately
 * broken code shown as a hazard, configuration for a tool this repository
 * does not depend on) opts out explicitly, with a reason:
 *
 *     <!-- excerpt-exempt: deliberately incorrect code, described as such in
 *          the surrounding prose -->
 *
 * Coverage is enforced one directory at a time, through `enforcedRoots`
 * below. Inside an enforced root every JavaScript or TypeScript fence must be
 * annotated or exempt. Outside one, unannotated fences are reported as
 * remaining work but do not fail the run, so the convention can be adopted
 * page by page rather than in a single sweep.
 *
 * Usage:
 *   node scripts/check-doc-excerpts.mjs            # check
 *   node scripts/check-doc-excerpts.mjs --verbose  # also list every excerpt
 */

import { promises as fs } from 'fs';
import path from 'path';
import util from 'util';
import glob from 'glob';

const globPromise = util.promisify(glob);

/**
 * Documentation directories where every JavaScript or TypeScript fence must
 * carry an `excerpt:` or `excerpt-exempt:` annotation. Add a directory here
 * once all of its fences have been converted.
 */
const enforcedRoots = [];

/** Fence languages whose contents are expected to be real, runnable code. */
const checkedLanguages = new Set([
  'js',
  'javascript',
  'jsx',
  'ts',
  'typescript',
  'tsx',
]);

/** Globs AVA collects as test files, mirroring the `ava.files` setting. */
const avaTestGlobs = ['snippets/**/test-*.js'];

const repositoryRoot = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  '..',
);

const resolveInRepository = relativePath =>
  path.resolve(repositoryRoot, relativePath);

const relativeToRepository = absolutePath =>
  path.relative(repositoryRoot, absolutePath).split(path.sep).join('/');

const readFileCache = new Map();

const readRepositoryFile = async relativePath => {
  if (!readFileCache.has(relativePath)) {
    readFileCache.set(
      relativePath,
      fs.readFile(resolveInRepository(relativePath), 'utf8').catch(() => null),
    );
  }
  return readFileCache.get(relativePath);
};

/**
 * Remove the indentation every non-blank line shares, and drop leading and
 * trailing blank lines. Both a Markdown fence nested in a list item and a
 * `#region` nested in a test function carry indentation that belongs to their
 * surroundings rather than to the example, so neither side's indentation is
 * meaningful for the comparison.
 *
 * @param {string} text
 * @returns {string[]} the normalized lines
 */
const normalizeBlock = text => {
  const lines = text.split('\n').map(line => line.replace(/\s+$/, ''));
  while (lines.length > 0 && lines[0] === '') lines.shift();
  while (lines.length > 0 && lines[lines.length - 1] === '') lines.pop();
  const indents = lines
    .filter(line => line !== '')
    .map(line => line.match(/^[ \t]*/)[0].length);
  const commonIndent = indents.length > 0 ? Math.min(...indents) : 0;
  return lines.map(line => line.slice(commonIndent));
};

/**
 * Collect the fenced code blocks of a Markdown document, together with the
 * provenance annotation (if any) that immediately precedes each one.
 *
 * @param {string} markdown
 * @returns {Array<{language: string, body: string, openLine: number,
 *   annotation: {kind: string, value: string, line: number} | undefined}>}
 */
const collectFences = markdown => {
  const lines = markdown.split('\n');
  const fences = [];
  let index = 0;
  while (index < lines.length) {
    const open = lines[index].match(/^([ \t]*)(`{3,}|~{3,})([^\s`]*)[^\n]*$/);
    if (!open) {
      index += 1;
      continue;
    }
    const [, indent, delimiter, info] = open;
    const openLine = index;
    let end = index + 1;
    const closeExpression = new RegExp(
      `^[ \\t]*${delimiter[0] === '`' ? '`' : '~'}{${delimiter.length},}[ \\t]*$`,
    );
    while (end < lines.length && !closeExpression.test(lines[end])) {
      end += 1;
    }
    const body = lines.slice(openLine + 1, end).join('\n');

    // Walk back over blank lines to the nearest preceding non-blank line and
    // read a provenance annotation off it if one is there.
    let look = openLine - 1;
    while (look >= 0 && lines[look].trim() === '') look -= 1;
    let annotation;
    if (look >= 0) {
      const excerpt = lines[look].match(/^[ \t]*<!--\s*excerpt:\s*(\S+)\s*-->/);
      const exempt = lines[look].match(
        /^[ \t]*<!--\s*excerpt-exempt:\s*([\s\S]*?)\s*-->/,
      );
      if (excerpt) {
        annotation = { kind: 'excerpt', value: excerpt[1], line: look + 1 };
      } else if (exempt) {
        annotation = { kind: 'exempt', value: exempt[1], line: look + 1 };
      }
    }

    fences.push({
      language: info.toLowerCase(),
      body,
      indent,
      openLine: openLine + 1,
      annotation,
    });
    index = end + 1;
  }
  return fences;
};

/**
 * Extract a named `#region` from a source file.
 *
 * @param {string} source
 * @param {string} region
 * @returns {string[] | undefined} the normalized region lines, or undefined
 *   when the region is not delimited in the source
 */
const extractRegion = (source, region) => {
  const lines = source.split('\n');
  const startExpression = new RegExp(
    `^[ \\t]*(?://|/\\*)\\s*#region\\s+${region}\\s*(?:\\*/)?\\s*$`,
  );
  const endExpression = new RegExp(
    `^[ \\t]*(?://|/\\*)\\s*#endregion\\s+${region}\\s*(?:\\*/)?\\s*$`,
  );
  const start = lines.findIndex(line => startExpression.test(line));
  if (start < 0) return undefined;
  const end = lines.findIndex(
    (line, at) => at > start && endExpression.test(line),
  );
  if (end < 0) return undefined;
  return normalizeBlock(lines.slice(start + 1, end).join('\n'));
};

/**
 * Compute the set of snippet files the AVA suite exercises: the test files
 * AVA collects, plus everything those files reach through relative static
 * imports, transitively.
 *
 * @returns {Promise<Set<string>>} repository-relative paths
 */
const collectTestExercisedFiles = async () => {
  const entryPoints = (
    await Promise.all(
      avaTestGlobs.map(pattern => globPromise(pattern, { cwd: repositoryRoot })),
    )
  ).flat();
  const exercised = new Set();
  const pending = [...entryPoints];
  while (pending.length > 0) {
    const current = pending.pop();
    if (exercised.has(current)) continue;
    exercised.add(current);
    const source = await readRepositoryFile(current);
    if (source === null) continue;
    const specifiers = [
      // Static imports and re-exports.
      ...source.matchAll(
        /(?:^|\n)\s*(?:import|export)\b[^;'"`]*?from\s*['"]([^'"]+)['"]/g,
      ),
      ...source.matchAll(/(?:^|\n)\s*import\s*['"]([^'"]+)['"]/g),
      // Files a test reaches by path rather than by import, the way
      // snippets/zoe/contracts/test-bundle-source.js reaches the contract it
      // bundles and snippets/js-programming/test-hardened-js-types.js reaches
      // the lockdown examples it runs in their own Node process.
      ...source.matchAll(/\.resolve\(\s*['"](\.[^'"]+)['"]/g),
      ...source.matchAll(/new URL\(\s*['"](\.[^'"]+)['"]/g),
    ].map(match => match[1]);
    for (const specifier of specifiers) {
      if (!specifier.startsWith('.')) continue;
      const resolved = relativeToRepository(
        path.resolve(resolveInRepository(path.dirname(current)), specifier),
      );
      if (!exercised.has(resolved)) pending.push(resolved);
    }
  }
  return exercised;
};

const main = async () => {
  const verbose = process.argv.includes('--verbose');
  const markdownFiles = (
    await globPromise('main/**/*.md', { cwd: repositoryRoot })
  ).sort();
  const exercisedFiles = await collectTestExercisedFiles();

  /** @type {string[]} */
  const errors = [];
  /** @type {Map<string, number>} */
  const unannotatedByDirectory = new Map();
  let excerptCount = 0;
  let exemptCount = 0;
  let transclusionCount = 0;

  for (const markdownFile of markdownFiles) {
    const markdown = await readRepositoryFile(markdownFile);
    if (markdown === null) continue;
    const enforced = enforcedRoots.some(root => markdownFile.startsWith(root));

    // Preferred form: VitePress transclusion. Only resolvability is checked.
    const transclusions = markdown.matchAll(
      /(?:^|\n)<<<\s*@\/\.\.\/([^\s#{]+)(?:#([^\s{]+))?/g,
    );
    for (const transclusion of transclusions) {
      transclusionCount += 1;
      const [, sourcePath, region] = transclusion;
      const source = await readRepositoryFile(sourcePath);
      if (source === null) {
        errors.push(
          `${markdownFile}: transclusion names a missing file: ${sourcePath}`,
        );
        continue;
      }
      if (region !== undefined && extractRegion(source, region) === undefined) {
        errors.push(
          `${markdownFile}: transclusion names region "${region}", which ${sourcePath} does not delimit`,
        );
      }
    }

    for (const fence of collectFences(markdown)) {
      if (!checkedLanguages.has(fence.language)) continue;
      const location = `${markdownFile}:${fence.openLine}`;

      if (fence.annotation === undefined) {
        if (enforced) {
          errors.push(
            `${location}: fenced ${fence.language} block has no provenance annotation. Add\n` +
              `    <!-- excerpt: snippets/<file>.js#<region> -->\n` +
              `  naming the checked-in, test-exercised source it was excerpted from, or\n` +
              `    <!-- excerpt-exempt: <reason> -->\n` +
              `  if it genuinely cannot be excerpted from running code.`,
          );
        } else {
          const directory = path.posix.dirname(markdownFile);
          unannotatedByDirectory.set(
            directory,
            (unannotatedByDirectory.get(directory) || 0) + 1,
          );
        }
        continue;
      }

      if (fence.annotation.kind === 'exempt') {
        exemptCount += 1;
        if (fence.annotation.value.trim() === '') {
          errors.push(
            `${location}: excerpt-exempt annotation must state a reason.`,
          );
        }
        continue;
      }

      excerptCount += 1;
      const [sourcePath, region] = fence.annotation.value.split('#');
      if (!sourcePath || !region) {
        errors.push(
          `${location}: excerpt annotation must read "<path>#<region>", got "${fence.annotation.value}".`,
        );
        continue;
      }
      const source = await readRepositoryFile(sourcePath);
      if (source === null) {
        errors.push(
          `${location}: excerpt names a missing file: ${sourcePath}`,
        );
        continue;
      }
      if (!exercisedFiles.has(sourcePath)) {
        errors.push(
          `${location}: ${sourcePath} is not exercised by the AVA suite. An excerpt source must ` +
            `either match ${avaTestGlobs.join(' or ')} or be imported, directly or transitively, by a file that does.`,
        );
      }
      const regionLines = extractRegion(source, region);
      if (regionLines === undefined) {
        errors.push(
          `${location}: ${sourcePath} does not delimit a region named "${region}". Wrap the ` +
            `excerpted lines in "// #region ${region}" and "// #endregion ${region}".`,
        );
        continue;
      }
      const fenceLines = normalizeBlock(fence.body);
      if (fenceLines.join('\n') !== regionLines.join('\n')) {
        const width = Math.max(fenceLines.length, regionLines.length);
        const differences = [];
        for (let at = 0; at < width; at += 1) {
          if (fenceLines[at] !== regionLines[at]) {
            differences.push(
              `      line ${at + 1}:\n` +
                `        markdown: ${JSON.stringify(fenceLines[at])}\n` +
                `        ${sourcePath}#${region}: ${JSON.stringify(regionLines[at])}`,
            );
          }
        }
        errors.push(
          `${location}: excerpt has drifted from ${sourcePath}#${region}.\n` +
            `${differences.slice(0, 8).join('\n')}` +
            (differences.length > 8
              ? `\n      ...and ${differences.length - 8} more differing lines`
              : ''),
        );
      } else if (verbose) {
        console.log(`  ok ${location} <- ${sourcePath}#${region}`);
      }
    }
  }

  const unannotatedTotal = [...unannotatedByDirectory.values()].reduce(
    (sum, count) => sum + count,
    0,
  );

  console.log('Documentation code-example provenance');
  console.log(`  transclusions resolved:   ${transclusionCount}`);
  console.log(`  annotated excerpts:       ${excerptCount}`);
  console.log(`  annotated exemptions:     ${exemptCount}`);
  console.log(`  enforced directories:     ${enforcedRoots.join(', ')}`);
  console.log(
    `  unannotated fences outside enforced directories (remaining work): ${unannotatedTotal}`,
  );
  if (verbose && unannotatedTotal > 0) {
    for (const [directory, count] of [...unannotatedByDirectory].sort()) {
      console.log(`    ${count}\t${directory}`);
    }
  }

  if (errors.length > 0) {
    console.error(`\n${errors.length} problem(s) found:\n`);
    for (const error of errors) {
      console.error(`  - ${error}`);
    }
    console.error(
      '\nSee CONTRIBUTING.md "Importing and testing code snippets" for the convention.',
    );
    process.exit(1);
  }
};

main().catch(error => {
  console.error(error);
  process.exit(1);
});
