import { defineConfig } from 'vitepress'
import { nav } from './themeConfig/nav.js';

export default defineConfig({
  /* --- FOR DEPLOYMENT TO GITHUB PAGES--- */
  base: '/', // The base URL the site will be deployed at.
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

    if (location.hash && location.hash !== '#') {
      // Once content has loaded, re-navigate to the page target
      // without triggering interfering router/history/scroll logic.
      const hash = location.hash;
      fixups.set(['main'], _elems => {
        const stopPropagation = evt => {
          evt.stopImmediatePropagation();

          const props = {};
          const proto = Object.getPrototypeOf(evt);
          const propSource = proto === Event.prototype ? {} : proto;
          for (const name of Object.getOwnPropertyNames(propSource)) {
            if (name !== 'constructor') props[name] = evt[name];
          }
          console.log('suppress', evt.type, { __proto__: evt, ...props });
        };
        const stopEvents = types => {
          const restorers = types.map(type => {
            window.addEventListener(type, stopPropagation, true);
            return () => window.removeEventListener(type, stopPropagation, true);
          });
          const passEvents = () => {
            // Run and drop references to all restore functions.
            while (restorers.length > 0) restorers.pop()();
          };
          return passEvents;
        };

        // Navigate to the page itself as a blank slate.
        const passStateEvents = stopEvents(['hashchange', 'popstate']);
        const passScrollEvents = stopEvents(['scroll']);
        location.replace('#');

        // Restore state-change events, then navigate back to the target.
        passStateEvents();
        try {
          const target = document.getElementById(decodeURIComponent(hash.slice(1)));
          if (target && target.innerHTML.trim() === '') {
            document.documentElement.classList.add('scrollingToTarget');
            target.scrollIntoView({ behavior: 'instant' });
            document.documentElement.classList.remove('scrollingToTarget');
          }
        } catch (err) {
          console.warn(err);
        }
        location.replace(hash);

        // Restore scroll events and create a new history entry to be overridden
        // if the initial target lacks a TOC entry to highlight.
        passScrollEvents();
        history.pushState(null, '', hash);
      });
    }

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

  plugins: [
    'check-md',
    [
      '@vuepress/last-updated',
      {
        dateOptions: {
          dateStyle: 'medium',
          timeStyle: 'long',
          timeZone: 'Etc/UTC',
        },
      },
    ],
  ],

  /* --- DEFAULT THEME CONFIG --- */
  themeConfig: {
    sidebarDepth: 1,
    lastUpdated: 'Last Updated',
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
      '/guides/': [
        {
          text: 'Getting Started',
          link: '/guides/getting-started/',
          collapsed: true,
          items: [
            { text: 'Getting Started', link: '/guides/getting-started/' },
            {
              text: 'Smart Wallet Dapp Architecture',
              link: '/guides/getting-started/contract-rpc.html',
            },
            {
              text: 'Deploying Smart Contracts',
              link: '/guides/getting-started/deploying.html',
            },
          ],
        },
        {
          text: 'Zoe',
          link: '/guides/zoe/',
          collapsed: true,
          items: [
            {
              text: 'Smart Contract Basics',
              link: '/guides/zoe/contract-basics.html',
            },
            { text: 'Zoe Overview', link: '/guides/zoe/' },
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
              link: '/guides/agoric-cli/agd-query-tx.html',
            },
          ],
        },
        {
          text: 'JavaScript Framework',
          link: '/guides/js-programming/',
          collapsed: true,
          items: [
            {
              text: 'JavaScript Framework for Secure Distributed Computing',
              link: '/guides/js-programming/',
            },
            {
              text: 'Hardened JavaScript',
              link: '/guides/js-programming/hardened-js.html',
            },
            {
              text: 'Eventual Send with E()',
              link: '/guides/js-programming/eventual-send.html',
            },
            {
              text: 'Far(), Remotable, and Marshaling',
              link: '/guides/js-programming/far.html',
            },
            {
              text: 'Notifiers and Subscriptions',
              link: '/guides/js-programming/notifiers.html',
            },
          ],
        },
        {
          text: 'Wallet',
          link: '/guides/wallet/',
          collapsed: true,
          items: [
            { text: 'Agoric Wallet', link: '/guides/wallet/' },
            { text: 'Wallet UI', link: '/guides/wallet/ui' },
          ],
        },
        {
          text: 'ERTP',
          link: '/guides/ertp/',
          collapsed: true,
          items: [
            { text: 'ERTP Overview', link: '/guides/ertp/' },
            {
              text: 'Amounts, Values, and Brands',
              link: '/guides/ertp/amounts.html',
            },
            { text: 'AmountMath', link: '/guides/ertp/amount-math.html' },
            {
              text: 'Issuers and  Mints',
              link: '/guides/ertp/issuers-and-mints.html',
            },
            {
              text: 'Purses and Payments',
              link: '/guides/ertp/purses-and-payments.html',
            },
          ],
        },
        {
          text: 'Permissioned Contract Deployment',
          link: '/guides/coreeval/',
          collapsed: true,
          items: [
            {
              text: 'Permissioned Contract Deployment',
              link: '/guides/coreeval/',
            },
            {
              text: 'Declaring Required Capabilities',
              link: '/guides/coreeval/permissions.html',
            },
            {
              text: 'Code the Proposal',
              link: '/guides/coreeval/proposal.html',
            },
            {
              text: 'Deploy a Governance Proposal to a Local Testnet',
              link: '/guides/coreeval/local-testnet.html',
            },
          ],
        },
        {
          text: 'Example Zoe Contracts',
          link: '/guides/zoe/contracts/',
          collapsed: true,
          items: [
            { text: 'Example Zoe Contracts', link: '/guides/zoe/contracts/' },
            {
              text: 'Oracle Query Contract',
              link: '/guides/zoe/contracts/oracle.html',
            },
            {
              text: 'Vault Contract',
              link: '/guides/zoe/contracts/vault.html',
            },
            { text: 'Loan Contract', link: '/guides/zoe/contracts/loan.html' },
            {
              text: 'Funded Call Spread Contract',
              link: '/guides/zoe/contracts/fundedCallSpread.html',
            },
            {
              text: 'Priced Call Spread Contract',
              link: '/guides/zoe/contracts/pricedCallSpread.html',
            },
            {
              text: 'Covered Call Contract',
              link: '/guides/zoe/contracts/covered-call.html',
            },
            {
              text: 'OTC Desk Contract',
              link: '/guides/zoe/contracts/otc-desk.html',
            },
            {
              text: 'ConstantProduct AMM Contract',
              link: '/guides/zoe/contracts/constantProductAMM.html',
            },
            {
              text: 'Sell Items Contract',
              link: '/guides/zoe/contracts/sell-items.html',
            },
            {
              text: 'Atomic Swap Contract',
              link: '/guides/zoe/contracts/atomic-swap.html',
            },
            {
              text: 'Barter Exchange Contract',
              link: '/guides/zoe/contracts/barter-exchange.html',
            },
            {
              text: 'Second-Price Auction Contract',
              link: '/guides/zoe/contracts/second-price-auction.html',
            },
            {
              text: 'Simple Exchange Contract',
              link: '/guides/zoe/contracts/simple-exchange.html',
            },
            {
              text: 'Escrow To Vote Contract',
              link: '/guides/zoe/contracts/escrow-to-vote.html',
            },
            {
              text: 'Mint Payments Contract',
              link: '/guides/zoe/contracts/mint-payments.html',
            },
            {
              text: 'Mint and Sell NFTs Contract',
              link: '/guides/zoe/contracts/mint-and-sell-nfts.html',
            },
            {
              text: 'Use Object Contract',
              link: '/guides/zoe/contracts/use-obj-example.html',
            },
            {
              text: 'Automatic Refund Contract',
              link: '/guides/zoe/contracts/automatic-refund.html',
            },
          ],
        },
        {
          text: 'Deployed Zoe Contracts',
          link: '/guides/zoe/actual-contracts/',
          collapsed: true,
          items: [
            {
              text: 'Deployed Zoe Contracts',
              link: '/guides/zoe/actual-contracts/',
            },
            {
              text: 'PSM Contract',
              link: '/guides/zoe/actual-contracts/PSM.html',
            },
          ],
        },
        {
          text: 'Agoric Dapps',
          link: '/guides/dapps/',
          collapsed: true,
          items: [
            { text: 'Agoric Dapps', link: '/guides/dapps/' },
            {
              text: 'Dapp Templates',
              link: '/guides/dapps/dapp-templates.html',
            },
            {
              text: 'Starting Multiuser Dapps',
              link: '/guides/dapps/starting-multiuser-dapps.html',
            },
            {
              text: 'Deploying Smart Contracts',
              link: '/guides/getting-started/deploying.html',
            },
            {
              text: 'Smart Wallet Dapp Architecture',
              link: '/guides/getting-started/contract-rpc.html',
            },
          ],
        },
        {
          text: 'Agoric Platform',
          link: '/guides/platform/',
          collapsed: true,
          items: [],
        },
        {
          text: 'Chainlink Integration',
          link: '/guides/chainlink-integration.html',
          collapsed: true,
          items: [],
        },
        {
          text: 'SubQuery Indexing',
          link: '/guides/subquery-indexing.html',
          collapsed: true,
          items: [],
        },
      ],
      '/reference/': [
        {
          text: 'Wallet API',
          link: '/reference/wallet-api.html',
          collapsed: true,
          items: [],
        },
        {
          text: 'ERTP API',
          link: '/reference/ertp-api/',
          collapsed: true,
          items: [
            { text: 'ERTP API', link: '/reference/ertp-api/' },
            { text: 'Issuer Object', link: '/reference/ertp-api/issuer.html' },
            { text: 'Mint Object', link: '/reference/ertp-api/mint.html' },
            { text: 'Brand Object', link: '/reference/ertp-api/brand.html' },
            { text: 'Purse Object', link: '/reference/ertp-api/purse.html' },
            {
              text: 'Payment Object',
              link: '/reference/ertp-api/payment.html',
            },
            {
              text: 'AmountMath Object',
              link: '/reference/ertp-api/amount-math.html',
            },
            {
              text: 'ERTP Data Types',
              link: '/reference/ertp-api/ertp-data-types.html',
            },
          ],
        },
        {
          text: 'REPL API',
          link: '/reference/repl/',
          collapsed: true,
          items: [
            { text: 'Agoric REPL', link: '/reference/repl/' },
            {
              text: 'Timer Services',
              link: '/reference/repl/timerServices.html',
            },
            { text: 'The Agoric Board', link: '/reference/repl/board.html' },
            { text: 'Network API', link: '/reference/repl/networking.html' },
            {
              text: 'Price Authority',
              link: '/reference/repl/priceAuthority.html',
            },
            { text: 'Scratch', link: '/reference/repl/scratch.html' },
          ],
        },
        {
          text: 'Zoe API',
          link: '/reference/zoe-api/',
          collapsed: true,
          items: [
            { text: 'Zoe API', link: '/reference/zoe-api/' },
            { text: 'Zoe Service', link: '/reference/zoe-api/zoe.html' },
            {
              text: 'UserSeat Object',
              link: '/reference/zoe-api/user-seat.html',
            },
            {
              text: 'Zoe Contract Facet',
              link: '/reference/zoe-api/zoe-contract-facet.html',
            },
            { text: 'ZCFSeat Object', link: '/reference/zoe-api/zcfseat.html' },
            { text: 'ZCFMint Object', link: '/reference/zoe-api/zcfmint.html' },
            {
              text: 'PriceAuthority Object',
              link: '/reference/zoe-api/price-authority.html',
            },
            {
              text: 'ZoeHelper Functions',
              link: '/reference/zoe-api/zoe-helpers.html',
            },
            {
              text: 'Ratio Math Functions',
              link: '/reference/zoe-api/ratio-math.html',
            },
            {
              text: 'Zoe Data Types',
              link: '/reference/zoe-api/zoe-data-types.html',
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
    // defaults to false, set to true to enable
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: 'Help us improve this page!',

    zoeVersion: 'v0.24.0',
    zoeDocsUpdated: 'August 25, 2022',

    /* --- SEARCH --- */
    // Comes with built-in search functionality which builds its index from the
    // h1, h2, and h3 headers
    // Disable search by uncommenting the following line:
    // search: false
    // Customize how many suggestions will be shown with:
    // searchMaxSuggestions: <numberOfSuggestions>
  },
});
