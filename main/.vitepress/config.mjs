import { nav } from './themeConfig/nav.js';
import { rewrites } from './themeConfig/rewrites.js';
import { withMermaid } from "vitepress-plugin-mermaid";

export default withMermaid({
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
      '/': [
        {
          text: 'Orchestrate',
          link: '/guides/orchestration/',
          collapsed: true,
          items: [
            {
              text: 'Key Concepts and APIs',
              link: '/guides/orchestration/key-concepts',
            },
            {
              text: 'Contract Walkthroughs',
              link: '/guides/orchestration/contract-walkthroughs/',
              items: [
                {
                  text: 'Send Anywhere Example',
                  link: '/guides/orchestration/contract-walkthroughs/send-anywhere',
                },
                {
                  text: 'Cross-Chain Unbond Example',
                  link: '/guides/orchestration/contract-walkthroughs/cross-chain-unbond',
                }
              ]
            },
            {
              text: 'Example Orchestration DApp',
              link: '/guides/orchestration/orchestration-basics/',
              items: [
                {
                  text: 'Installation and Deployment',
                  link: '/guides/orchestration/orchestration-basics/installation',
                },
                {
                  text: 'Orca Contract walkthrough',
                  link: '/guides/orchestration/orchestration-basics/contract',
                },
                {
                  text: 'UI Walkthrough',
                  link: '/guides/orchestration/orchestration-basics/ui',
                }
              ]
            },
            {
              text: 'How Orchestration Works',
              link: '/guides/orchestration/how-orch-works',
            },
          ]
        },
        {
          text: 'Build',
          collapsed: true,
          items: [
            {
              text: 'Getting Started',
              link: '/guides/getting-started/',
              items: [
                {
                  text: 'Takeaway 1: Starting a Local Chain',
                  link:
                    '/guides/getting-started/explainer-how-to-start-a-local-chain',
                },
                {
                  text: 'Takeaway 2: Deploying a Smart Contract',
                  link:
                    '/guides/getting-started/explainer-deploying-a-smart-contact',
                },
                {
                  text: 'Takeaway 3: Making an Offer',
                  link:
                    '/guides/getting-started/explainer-how-to-make-an-offer',
                },
              ],
            },
            {
              text: 'Smart Contract Basics',
              link: '/guides/zoe/contract-basics',
              collapsed: true,
              items: [
                {
                  text: 'Hello World Smart Contract',
                  link: '/guides/zoe/contract-hello',
                },
                {
                  text: 'State Smart Contract',
                  link: '/guides/zoe/contract-state',
                },
                {
                  text: 'Access Control Smart Contract',
                  link: '/guides/zoe/contract-access-control',
                },
                {
                  text: 'Complete Contract Walk-Through',
                  link: '/guides/zoe/contract-walkthru',
                },
                {
                  text: 'Contract Upgrade',
                  link: '/guides/zoe/contract-upgrade',
                },
                { text: 'Contract Governance', link: '/guides/governance/' },
              ],
            },

            {
              text: 'UI Component Library',
              link: '/guides/UIComponentLibrary/',
            },
            {
              text: 'Building Client Dapps',
              link: '/guides/getting-started/contract-rpc',
            },
            {
              text: 'Permissioned Contract Deployment',
              ariaLabel: 'Permissioned Contract Deployment',
              link: '/guides/coreeval/',
              collapsed: true,
              items: [
                {
                  text: 'Write Code to Deploy a Contract',
                  link: '/guides/coreeval/proposal',
                },
                {
                  text: 'Declare Required Capabilities',
                  link: '/guides/coreeval/permissions',
                },
                {
                  text: 'Submit Transactions',
                  link: '/guides/coreeval/local-testnet',
                },
              ],
            },
            {
              text: 'Integrating with Agoric Network',
              link: '/guides/integration/chain-integration',
              collapsed: true,
              items: [
                {
                  text: 'Name Services: agoricNames, namesByAddress, board',
                  link: '/guides/integration/name-services',
                },
                {
                  text: 'SubQuery Indexing',
                  link: '/guides/subquery-indexing',
                },
              ],
            },
            {
              text: 'Agoric CLI',
              link: '/guides/agoric-cli/',
              collapsed: true,
              items: [
                { text: 'Agoric CLI Reference', link: '/guides/agoric-cli/' },
                {
                  text: 'Using agd to make queries and transactions',
                  link: '/guides/agoric-cli/agd-query-tx',
                },
              ],
            },
            {
                text: 'Agoric API Reference',
                link: 'https://agoric-sdk.pages.dev/'
            },
            {
                text: 'Endo API Reference',
                link: 'https://endojs.github.io/endo/'
            },

            {
              text: 'ERTP API',
              link: '/reference/ertp-api/',
              collapsed: true,
              items: [
                { text: 'ERTP API', link: '/reference/ertp-api/' },
                { text: 'Issuer Object', link: '/reference/ertp-api/issuer' },
                { text: 'Mint Object', link: '/reference/ertp-api/mint' },
                { text: 'Brand Object', link: '/reference/ertp-api/brand' },
                { text: 'Purse Object', link: '/reference/ertp-api/purse' },
                {
                  text: 'Payment Object',
                  link: '/reference/ertp-api/payment',
                },
                {
                  text: 'AmountMath Object',
                  link: '/reference/ertp-api/amount-math',
                },
                {
                  text: 'ERTP Data Types',
                  link: '/reference/ertp-api/ertp-data-types',
                },
              ],
            },
            {
              text: 'Zoe API',
              link: '/reference/zoe-api/',
              collapsed: true,
              items: [
                { text: 'Zoe API', link: '/reference/zoe-api/' },
                { text: 'Zoe Service', link: '/reference/zoe-api/zoe' },
                {
                  text: 'UserSeat Object',
                  link: '/reference/zoe-api/user-seat',
                },
                {
                  text: 'Zoe Contract Facet (ZCF)',
                  link: '/reference/zoe-api/zoe-contract-facet',
                },
                { text: 'ZCFSeat Object', link: '/reference/zoe-api/zcfseat' },
                { text: 'ZCFMint Object', link: '/reference/zoe-api/zcfmint' },
                {
                  text: 'ZoeHelper Functions',
                  link: '/reference/zoe-api/zoe-helpers',
                },
                {
                  text: 'Ratio Math Functions',
                  link: '/reference/zoe-api/ratio-math',
                },
                {
                  text: 'Zoe Data Types',
                  link: '/reference/zoe-api/zoe-data-types',
                },
              ],
            },
            {
              text: 'Example Zoe Contracts',
              ariaLabel: 'Example Zoe Contracts',
              link: '/guides/zoe/contracts/',
              collapsed: true,
              items: [
                {
                  text: 'Example Zoe Contracts',
                  link: '/guides/zoe/contracts/',
                },
                {
                  text: 'Oracle Query Contract',
                  link: '/guides/zoe/contracts/oracle',
                },
                {
                  text: 'Vault Contract',
                  link: '/guides/zoe/contracts/vault',
                },
                { text: 'Loan Contract', link: '/guides/zoe/contracts/loan' },
                {
                  text: 'Funded Call Spread Contract',
                  link: '/guides/zoe/contracts/fundedCallSpread',
                },
                {
                  text: 'Priced Call Spread Contract',
                  link: '/guides/zoe/contracts/pricedCallSpread',
                },
                {
                  text: 'Covered Call Contract',
                  link: '/guides/zoe/contracts/covered-call',
                },
                {
                  text: 'OTC Desk Contract',
                  link: '/guides/zoe/contracts/otc-desk',
                },
                {
                  text: 'ConstantProduct AMM Contract',
                  link: '/guides/zoe/contracts/constantProductAMM',
                },
                {
                  text: 'Sell Items Contract',
                  link: '/guides/zoe/contracts/sell-items',
                },
                {
                  text: 'Atomic Swap Contract',
                  link: '/guides/zoe/contracts/atomic-swap',
                },
                {
                  text: 'Barter Exchange Contract',
                  link: '/guides/zoe/contracts/barter-exchange',
                },
                {
                  text: 'Second-Price Auction Contract',
                  link: '/guides/zoe/contracts/second-price-auction',
                },
                {
                  text: 'Simple Exchange Contract',
                  link: '/guides/zoe/contracts/simple-exchange',
                },
                {
                  text: 'Escrow To Vote Contract',
                  link: '/guides/zoe/contracts/escrow-to-vote',
                },
                {
                  text: 'Mint Payments Contract',
                  link: '/guides/zoe/contracts/mint-payments',
                },
                {
                  text: 'Mint and Sell NFTs Contract',
                  link: '/guides/zoe/contracts/mint-and-sell-nfts',
                },
                {
                  text: 'Use Object Contract',
                  link: '/guides/zoe/contracts/use-obj-example',
                },
                {
                  text: 'Automatic Refund Contract',
                  link: '/guides/zoe/contracts/automatic-refund',
                },
              ],
            },
            {
              text: 'End-to-End Testing',
              ariaLabel: 'End-to-End Testing',
              link: '/e2e-testing',
            },
          ],
        },
        {
          text: 'Learn',
          collapsed: true,
          items: [
            {
              text: 'What is Agoric?',
              link: '/what-is-agoric',
            },
            {
              text: 'Agoric Platform',
              link: '/guides/platform/',
              collapsed: true,
              items: [],
            },
            {
              text: 'Zoe Smart Contract Framework',
              link: '/guides/zoe/',
            },
            {
              text: 'ERTP',
              ariaLabel: 'ERTP',
              link: '/guides/ertp/',
              collapsed: true,
              items: [
                {
                  text: 'Amounts, Values, and Brands',
                  link: '/guides/ertp/amounts',
                },
                { text: 'AmountMath', link: '/guides/ertp/amount-math' },
                {
                  text: 'Issuers and  Mints',
                  link: '/guides/ertp/issuers-and-mints',
                },
                {
                  text: 'Purses and Payments',
                  link: '/guides/ertp/purses-and-payments',
                },
              ],
            },
            {
              text: 'JavaScript Framework',
              ariaLabel: 'JavaScript Framework',
              link: '/guides/js-programming/',
            },

            {
              text: 'Deployed Zoe Contracts',
              ariaLabel: 'Deployed Zoe Contracts',
              link: '/guides/zoe/actual-contracts/',
              collapsed: true,
              items: [
                {
                  text: 'PSM Contract',
                  link: '/guides/zoe/actual-contracts/PSM',
                },
                {
                  text: 'PriceAuthority Object',
                  link: '/reference/zoe-api/price-authority',
                },
              ],
            },

            {
              text: 'Glossary',
              ariaLabel: 'Glossary Menu',
              link: '/glossary/',
            },

            {
              text: 'Papers',
              ariaLabel: 'Papers Page Link',
              link: 'https://agoric.com/papers/',
            },
          ],
        },
        {
          text: 'Tutorials',
          link: '/guides/getting-started/tutorial/',
          collapsed: true,
          items: [
            {
              text: 'dapp-agoric-basics',
              link: '/guides/getting-started/tutorial-dapp-agoric-basics',
              items: [
                {
                  text: 'Takeaway 1: Sell Concert Tickets Contract Overview',
                  link:
                    '/guides/getting-started/sell-concert-tickets-contract-explainer',
                },

                {
                  text: 'Takeaway 2: Swaparoo Contract Overview',
                  link:
                    '/guides/getting-started/swaparoo-how-to-swap-assets-explainer',
                },

                {
                  text:
                    'Takeaway 3: Sending Invitation Payments using an Address',
                  link:
                    '/guides/getting-started/swaparoo-making-a-payment-explainer',
                },
              ],
            },

            {
              text: 'UI Tutorial',
              link: '/guides/getting-started/ui-tutorial/',
              items: [
                {
                  text: '1. Starting',
                  link: '/guides/getting-started/ui-tutorial/starting',
                },
                {
                  text: '2. Agoric Provider',
                  link: '/guides/getting-started/ui-tutorial/agoric-provider',
                },
                {
                  text: '3. Connect Wallet',
                  link: '/guides/getting-started/ui-tutorial/connect-wallet',
                },
                {
                  text: '4. Querying Vstorage',
                  link: '/guides/getting-started/ui-tutorial/querying-vstorage',
                },
                {
                  text: '5. Making an Offer',
                  link: '/guides/getting-started/ui-tutorial/making-an-offer',
                },
                {
                  text: '6. Conclusion',
                  link: '/guides/getting-started/ui-tutorial/conclusion',
                },
              ],
            },
          ],
        },
        {
          text: 'Support',
          collapsed: true,
          items: [
            {
              text: 'Agoric',
              ariaLabel: 'Agoric Homepage Link',
              link: 'https://agoric.com/',
            },
            {
              text: 'Discord',
              link: 'https://agoric.com/discord',
            },
            {
              text: 'Discussions (Q&A)',
              link: 'https://github.com/Agoric/agoric-sdk/discussions',
            },
            {
              text: 'Office Hours',
              link: 'https://github.com/Agoric/agoric-sdk/wiki/Office-Hours',
            },
            {
              text: 'Twitter',
              link: 'https://twitter.com/agoric',
            },
            {
              text: 'YouTube',
              ariaLabel: 'Agoric YouTube Channel Page Link',
              link: 'https://www.youtube.com/channel/UCpY91oQLh_Lp0mitdZ5bYWg/',
            },
            {
              text: 'Github',
              ariaLabel: 'Agoric Github Link',
              link: 'https://github.com/Agoric/',
            },
          ],
        },
      ],
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
  // optionally, you can pass MermaidConfig
  mermaid: {
  // refer https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults for options
  },
  // optionally set additional config for plugin itself with MermaidPluginConfig
  mermaidPlugin: {
  //  class: "mermaid my-class", // set additional css classes for parent container 
  },

});
