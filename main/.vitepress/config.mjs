import { defineConfig } from 'vitepress';
import { nav } from './themeConfig/nav.js';
import { rewrites } from './themeConfig/rewrites.js';
import { generateSidebarConfig, sharedNavigation } from './themeConfig/shared-nav.js';

export default defineConfig({
  /* --- FOR DEPLOYMENT TO GITHUB PAGES--- */
  base: '/', // The base URL the site will be deployed at.
  outDir: '../dist',
  /* --- HOME PAGE --- */
  title: 'Agoric Documentation', // title for the site. prefix for all page titles and displayed in the navbar
  description: 'Build, deploy and operate dApps and DeFi markets.', // desc for the site; rendered as a <meta> tag in the page HTML
  // Extra tags to inject into the page HTML <head>. You can specify each tag in the form of [tagName, { attrName: attrValue }, innerHTML?].
  head: [
    [
      'meta',
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    ['link', { rel: 'icon', href: '/favicon-full.ico' }],
    [
      'style',
      { type: 'text/css' },
      `
    .two-col-table td {
        width: 50%;
    }
    .two-col-table table {
        table-layout: fixed;
    }
    a[href^='#'] {
        font-style: italic;
    }`,
    ],
    [
      'script',
      {
        src: 'https://www.googletagmanager.com/gtag/js?id=UA-118217811-1',
        async: '',
      },
    ],
    [
      'script',
      {},
      "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-118217811-1'); ",
    ],
    [
      'script',
      {},
      `
    /** @type {Map<[...anySelectors: string[]], (elems: (Element | null)[]) => unknown>} */
    const fixups = new Map();

    // Update the "home" link to target agoric.com while intercepting clicks
    // such that those outside of its image continue routing to the root of
    // the documentation site.
    fixups.set(['.home-link', '.logo'], ([homeEl, logoEl]) => {
      if (homeEl) {
        homeEl.setAttribute('href', 'https://agoric.com');
        homeEl.setAttribute('onclick', 'return false;');
      }
      if (logoEl) {
        logoEl.setAttribute('onclick', "document.location='https://agoric.com';return false;");
      }
    });

    // Poll until all fixups trigger by matching at least one element.
    const fixupInterval = setInterval(function() {
      for (const [selectors, fixup] of fixups) {
        const elems = selectors.map(sel => document.querySelector(sel));
        if (elems.some(el => el)) {
          // console.log('fixup', selectors);
          fixups.delete(selectors);
          Promise.resolve(elems).then(fixup);
        }
      }
      if (!fixups.size) {
        clearInterval(fixupInterval);
        // console.log('fixups are done');
      }
    }, 500);
    `,
    ],
  ],
  ignoreDeadLinks: [
    // ignore all localhost links
    /^https?:\/\/localhost/,
    // ignore links that starts with ./packages/*
    /^.\/packages\/*/,
    './MAINTAINERS',
    './CONTRIBUTING',
    './LICENSE',
  ],
  sitemap: {
    hostname: 'https://docs.agoric.com',
  },
  plugins: [],
  /* --- ROUTE REWRITES / REDIRECTS --- */
  rewrites,
  /* --- DEFAULT THEME CONFIG --- */
  themeConfig: {
    sidebarDepth: 1,
    lastUpdated: {
      text: 'Last Updated',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'long',
        timeZone: 'Etc/UTC',
      },
    },
    logo: '/agoric-logo-red.svg',
    /* --- NAVBAR (top) --- */
    nav,
    /* --- SIDEBAR --- */
    // This configuration displays different sidebars for different sections of
    // content. Pages must be organized into directories for each desired
    // section

    // NOTES:
    // Internal links: Must have a corresponding folder with a index.md file
    // Links must be absolute with trailing slash '/guide/'
    // Trailing slash implies it is looking for a .md file
    sidebar: {
      '/': generateSidebarConfig(sharedNavigation),
    },
    docsRepo: 'Agoric/documentation',
    // if your docs are not at the root of the repo:
    docsDir: 'main',
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: 'main',
    // custom text for edit link. Defaults to "Edit this page"
    editLink: {
      pattern: 'https://github.com/Agoric/documentation/edit/main/main/:path',
      text: 'Help us improve this page!',
    },

    zoeVersion: 'v0.24.0',
    zoeDocsUpdated: 'August 25, 2022',

    // https://vitepress.dev/reference/default-theme-search#local-search
    // uses minisearch: https://github.com/lucaong/minisearch/
    search: {
      provider: 'local',
      options: {
        miniSearch: {
          /**
           * @type {Pick<import('minisearch').Options, 'extractField' | 'tokenize' | 'processTerm'>}
           */
          options: {
            /* ... */
          },
          /**
           * @type {import('minisearch').SearchOptions}
           * @default
           * { fuzzy: 0.2, prefix: true, boost: { title: 4, text: 2, titles: 1 } }
           */
          searchOptions: {
            /* ... */
          },
          /**
           * @param {string} src
           * @param {import('vitepress').MarkdownEnv} env
           * @param {import('markdown-it')} md
           */
          // _render(src, env, md) {
          // },
        },
      },
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} Agoric Systems Operating Company. All Rights Reserved.`,
    },
    socialLinks: [
      {
        icon: 'discord',
        ariaLabel: 'Discord',
        link: 'https://agoric.com/discord',
      },
      {
        icon: 'github',
        ariaLabel: 'GitHub',
        link: 'https://github.com/Agoric/agoric-sdk',
      },
      {
        icon: 'twitter',
        ariaLabel: 'Twitter',
        link: 'https://twitter.com/agoric',
      },
      {
        icon: 'youtube',
        ariaLabel: 'YouTube',
        link: 'https://www.youtube.com/@Agoric',
      },
    ],
  },
});
