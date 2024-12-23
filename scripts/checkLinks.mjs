import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const extractLinks = content => {
  const noSingleLineComments = content.replace(/\/\/.*$/gm, '');
  const noComments = noSingleLineComments.replace(/\/\*[\s\S]*?\*\//g, '');
  const linkRegex = /link:\s*(['"])([^'"]+)\1/g;
  const links = [];
  let match;
  while ((match = linkRegex.exec(noComments)) !== null) {
    links.push(match[2]);
  }
  return links;
};

const fileExists = filePath => {
  try {
    return fs.existsSync(filePath);
  } catch (err) {
    return false;
  }
};

const checkLink = link => {
  if (link.startsWith('http')) {
    return true;
  }

  const basePath = path.join(__dirname, '../main');
  const cleanLink = link.replace(/^\//, '').replace(/\/$/, '');

  // Check for index.md in directory
  const indexPath = path.join(basePath, cleanLink, 'index.md');
  if (fileExists(indexPath)) {
    return true;
  }

  // Check for .md file
  const mdPath = path.join(basePath, `${cleanLink}.md`);
  if (fileExists(mdPath)) {
    return true;
  }

  return false;
};

const navContent = fs.readFileSync(
  path.join(__dirname, '../main/.vitepress/themeConfig/nav.js'),
  'utf8',
);
const configContent = fs.readFileSync(
  path.join(__dirname, '../main/.vitepress/config.mjs'),
  'utf8',
);

const navLinks = extractLinks(navContent);
const configLinks = extractLinks(configContent);
const allLinks = [...new Set([...navLinks, ...configLinks])];

const deadLinks = allLinks.filter(link => !checkLink(link));

if (deadLinks.length > 0) {
  console.error('Dead links found:');
  deadLinks.forEach(link => console.error(link));
  process.exit(1);
} else {
  console.log('All links are valid.');
}
