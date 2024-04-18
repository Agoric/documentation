import { generateSidebar } from 'vitepress-sidebar';

export const apiSidebar = generateSidebar([
  {
    documentRootPath: 'main',
    scanStartPath: 'api',
    resolvePath: '/api/',
    useTitleFromFileHeading: true,
    // hyphenToSpace: true,
    useFolderTitleFromIndexFile: true,
    // excludeFiles: ['mutable-quote.md'],
  },
])['/api/'];
