import {promises as fs} from 'fs';
import glob from 'glob';
import util from 'util';

const globPromise = util.promisify(glob);

const extractJsSnippets = (markdownContent) => {
  const pattern = /```(?:js|javascript)\n([\s\S]*?)```/g;
  const matches = [];
  let match;
  while ((match = pattern.exec(markdownContent)) !== null) {
    const startLine = markdownContent.slice(0, match.index).split('\n').length;
    matches.push({
      content: match[1],
      start: match.index,
      end: match.index + match[0].length,
      startLine: startLine,
      language: match[0].startsWith('```javascript') ? 'javascript' : 'js'
    });
  }
  return matches;
};

const checkSemicolonsAndEllipsis = (code, startLine) => {
  const lines = code.split('\n');
  const issues = [];
  let openBrackets = 0;
  let openParens = 0;
  let openSquareBrackets = 0;
  let inMultiLineComment = false;

  const isJSDocOrComment = (line) => {
    return line.trim().startsWith('*') ||
      line.trim().startsWith('/**') ||
      line.trim().startsWith('*/') ||
      line.trim().startsWith('//');
  };

  const isStatementEnd = (line, nextLine) => {
    const strippedLine = line.replace(/\/\/.*$/, '').trim();
    const strippedNextLine = nextLine ? nextLine.replace(/\/\/.*$/, '').trim() : '';
    return strippedLine &&
      !strippedLine.endsWith('{') &&
      !strippedLine.endsWith('}') &&
      !strippedLine.endsWith(':') &&
      !strippedLine.endsWith(',') &&
      !strippedLine.endsWith('(') &&
      !strippedLine.endsWith('.') &&
      !strippedLine.endsWith('?') &&
      !strippedLine.endsWith('=') &&
      !strippedLine.endsWith('&&') &&
      !strippedLine.endsWith('||') &&
      !strippedLine.endsWith('=>') &&
      !strippedLine.startsWith('else') &&
      !strippedLine.startsWith('catch') &&
      !strippedLine.startsWith('finally') &&
      !strippedNextLine.trim().startsWith('.') &&
      !strippedNextLine.trim().startsWith('(') &&
      !strippedNextLine.trim().startsWith('.then') &&
      !strippedNextLine.trim().startsWith('.catch') &&
      !strippedNextLine.trim().startsWith('.finally') &&
      openBrackets === 0 &&
      openParens === 0 &&
      openSquareBrackets === 0;
  };

  const shouldHaveSemicolon = (line, nextLine) => {
    const strippedLine = line.replace(/\/\/.*$/, '').trim();
    return (strippedLine.startsWith('const ') ||
      strippedLine.startsWith('let ') ||
      strippedLine.startsWith('var ') ||
      strippedLine.includes('=') ||
      /\bawait\b/.test(strippedLine) ||
      (/^[a-zA-Z_$][a-zA-Z0-9_$]*(\.[a-zA-Z_$][a-zA-Z0-9_$]*)*$/.test(strippedLine) && !strippedLine.endsWith('.')) ||
      (/^[a-zA-Z_$][a-zA-Z0-9_$]*\[[0-9]+\]$/.test(strippedLine))) &&
      isStatementEnd(line, nextLine);
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const nextLine = i < lines.length - 1 ? lines[i + 1] : null;

    if (line.includes('/*')) inMultiLineComment = true;
    if (line.includes('*/')) {
      inMultiLineComment = false;
      continue;
    }
    if (inMultiLineComment || isJSDocOrComment(line)) continue;

    openBrackets += (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
    openParens += (line.match(/\(/g) || []).length - (line.match(/\)/g) || []).length;
    openSquareBrackets += (line.match(/\[/g) || []).length - (line.match(/\]/g) || []).length;

    const codeWithoutComment = line.replace(/\/\/.*$/, '').trim();

    // Check for standalone '...'
    if (codeWithoutComment === '...') {
      issues.push({
        line: startLine + i,
        original: line.trim(),
        fixed: '// ...',
        type: 'ellipsis'
      });
    } else if (shouldHaveSemicolon(line, nextLine) && !codeWithoutComment.endsWith(';')) {
      issues.push({
        line: startLine + i,
        original: line.trim(),
        fixed: `${codeWithoutComment};${line.includes('//') ? ' ' + line.split('//')[1] : ''}`,
        type: 'semicolon'
      });
    }
  }

  return issues;
};


const lintMarkdownFile = async (filePath, fix = false) => {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const jsSnippets = extractJsSnippets(content);
    let fixedContent = content;
    const allIssues = [];

    for (let i = jsSnippets.length - 1; i >= 0; i--) {
      const snippet = jsSnippets[i];
      const issues = checkSemicolonsAndEllipsis(snippet.content, snippet.startLine);
      allIssues.push(...issues.map(issue => ({ ...issue, snippet: i + 1 })));

      if (fix) {
        const fixedLines = snippet.content.split('\n');
        issues.forEach(issue => {
          const lineIndex = issue.line - snippet.startLine;
          fixedLines[lineIndex] = issue.fixed;
        });
        const fixedSnippet = fixedLines.join('\n');
        fixedContent = fixedContent.slice(0, snippet.start) +
          '```js\n' + fixedSnippet + '```' +
          fixedContent.slice(snippet.end);
      }
    }

    // Count ```javascript instances
    const javascriptCount = (content.match(/```javascript/g) || []).length;

    // Replace all ```javascript with ```js
    if (fix) {
      fixedContent = fixedContent.replace(/```javascript/g, '```js');
    }

    if (fix && (allIssues.length > 0 || content !== fixedContent)) {
      await fs.writeFile(filePath, fixedContent, 'utf8');
    }

    return {
      filePath,
      issues: allIssues,
      fixedContent: fix ? fixedContent : null,
      javascriptCount: javascriptCount
    };
  } catch (error) {
    console.error(`Error processing file ${filePath}: ${error.message}`);
    return { filePath, issues: [], error: error.message };
  }
};
const processFiles = async (globPattern, fix = false) => {
  try {
    const files = await globPromise(globPattern);
    if (files.length === 0) {
      console.error('No files found matching the pattern.');
      process.exit(1);
    }

    let totalIssues = 0;
    let totalJavascriptInstances = 0;
    let hasErrors = false;

    for (const file of files) {
      const { issues, error, javascriptCount } = await lintMarkdownFile(file, fix);
      if (error) {
        console.error(`\nError in file ${file}:`);
        console.error(error);
        hasErrors = true;
      } else {
        if (issues.length > 0) {
          console.error(`\nFound ${issues.length} error(s) in ${file}:`);
          issues.forEach(issue => {
            console.error(`\nSnippet ${issue.snippet}, Line ${issue.line}:`);
            console.error(`Original: ${issue.original}`);
            console.error(`${fix ? 'Fixed:    ' : 'Suggested:'} ${issue.fixed}`);
          });
          totalIssues += issues.length;
          hasErrors = true;
        }
        if (javascriptCount > 0) {
          console.error(`\nFound ${javascriptCount} instance(s) of \`\`\`javascript in ${file}`);
          totalJavascriptInstances += javascriptCount;
          hasErrors = true;
        }
      }
    }

    if (totalIssues > 0 || totalJavascriptInstances > 0) {
      console.error(`\nTotal errors found: ${totalIssues}`);
      console.error(`Total \`\`\`javascript instances found: ${totalJavascriptInstances}`);
      if (fix) {
        console.log("All matching files have been updated with the necessary changes.");
      } else {
        console.error("Run with --fix to automatically fix these errors and replace \`\`\`javascript with \`\`\`js.");
      }
    } else {
      console.log("No errors found in any of the matching files.");
    }

    if (hasErrors && !fix) {
      process.exit(1);
    }
  } catch (error) {
    console.error(`Error processing files: ${error.message}`);
    process.exit(1);
  }
};

const main = async () => {
  if (process.argv.length < 3 || process.argv.length > 4) {
    console.error("Usage: node linter.js <glob_pattern> [--fix]");
    process.exit(1);
  }

  const globPattern = process.argv[2];
  const fix = process.argv.includes('--fix');

  await processFiles(globPattern, fix);
};

main().catch(error => {
  console.error(`Unhandled error: ${error.message}`);
  process.exit(1);
});
