const nav = require('./themeConfig/nav');

module.exports = {
  /* --- FOR DEPLOYMENT TO GITHUB PAGES--- */
  base: '/', // The base URL the site will be deployed at.
  /* --- HOME PAGE --- */
  title: 'Documentation', // title for the site. prefix for all page titles and displayed in the navbar
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
    logo: '/logo.svg',
    /* --- NAVBAR (top) --- */
    nav,
    /* --- SIDEBAR --- */
    // This configuration displays different sidebars for different sections of
    // content. Pages must be organized into directories for each desired
    // section

    // NOTES:
    // Internal links: Must have a corresponding folder with a README.md file
    // Links must be absolute with trailing slash '/guide/'
    // Trailing slash implies it is looking for a .md file
    sidebar: {
      '/guides/': [
        {
          title: 'Getting Started',
          path: '/guides/getting-started/',
          collapsible: false,
          children: [
            '/guides/getting-started/',
            '/guides/getting-started/contract-rpc.html',
            '/guides/getting-started/deploying.html',
          ],
        },
        {
          title: 'Zoe',
          path: '/guides/zoe/',
          collapsible: false,
          children: [
            '/guides/zoe/contract-basics.html',
            '/guides/zoe/',
            '/guides/zoe/contract-upgrade.html',
          ],
        },
        {
          title: 'Agoric CLI',
          path: '/guides/agoric-cli/',
          collapsible: false,
          children: [
            '/guides/agoric-cli/',
            '/guides/agoric-cli/agd-query-tx.html',
          ],
        },
        {
          title: 'JavaScript Framework',
          path: '/guides/js-programming/',
          collapsible: false,
          children: [
            '/guides/js-programming/',
            '/guides/js-programming/hardened-js.html',
            '/guides/js-programming/eventual-send.html',
            '/guides/js-programming/far.html',
            '/guides/js-programming/notifiers.html',
          ],
        },
        {
          title: 'Wallet',
          path: '/guides/wallet/',
          collapsible: false,
          children: ['/guides/wallet/', '/guides/wallet/ui'],
        },
        {
          title: 'ERTP',
          path: '/guides/ertp/',
          collapsible: false,
          children: [
            '/guides/ertp/',
            '/guides/ertp/amounts.html',
            '/guides/ertp/amount-math.html',
            '/guides/ertp/issuers-and-mints.html',
            '/guides/ertp/purses-and-payments.html',
          ],
        },
        {
          title: 'Permissioned Contract Deployment',
          path: '/guides/coreeval/',
          collapsible: false,
          children: [
            '/guides/coreeval/',
            '/guides/coreeval/permissions.html',
            '/guides/coreeval/proposal.html',
            '/guides/coreeval/local-testnet.html',
          ],
        },
        {
          title: 'Example Zoe Contracts',
          path: '/guides/zoe/contracts/',
          collapsible: false,
          children: [
            '/guides/zoe/contracts/',
            '/guides/zoe/contracts/oracle.html',
            '/guides/zoe/contracts/vault.html',
            '/guides/zoe/contracts/loan.html',
            '/guides/zoe/contracts/fundedCallSpread.html',
            '/guides/zoe/contracts/pricedCallSpread.html',
            '/guides/zoe/contracts/covered-call.html',
            '/guides/zoe/contracts/otc-desk.html',
            '/guides/zoe/contracts/constantProductAMM.html',
            '/guides/zoe/contracts/sell-items.html',
            '/guides/zoe/contracts/atomic-swap.html',
            '/guides/zoe/contracts/barter-exchange.html',
            '/guides/zoe/contracts/second-price-auction.html',
            '/guides/zoe/contracts/simple-exchange.html',
            '/guides/zoe/contracts/escrow-to-vote.html',
            '/guides/zoe/contracts/mint-payments.html',
            '/guides/zoe/contracts/mint-and-sell-nfts.html',
            '/guides/zoe/contracts/use-obj-example.html',
            '/guides/zoe/contracts/automatic-refund.html',
          ],
        },
        {
          title: 'Deployed Zoe Contracts',
          path: '/guides/zoe/actual-contracts/',
          collapsible: false,
          children: [
            '/guides/zoe/actual-contracts/',
            '/guides/zoe/actual-contracts/PSM.html',
          ],
        },
        {
          title: 'Agoric Dapps',
          path: '/guides/dapps/',
          collapsible: false,
          children: [
            '/guides/dapps/',
            '/guides/dapps/dapp-templates.html',
            '/guides/dapps/starting-multiuser-dapps.html',
            '/guides/getting-started/deploying.html',
            '/guides/getting-started/contract-rpc.html',
          ],
        },
        {
          title: 'Agoric Platform',
          path: '/guides/platform/',
          collapsible: false,
          children: [],
        },
        {
          title: 'Chainlink Integration',
          path: '/guides/chainlink-integration.html',
          collapsible: false,
          children: [],
        },
        {
          title: 'SubQuery Indexing',
          path: '/guides/subquery-indexing.html',
          collapsible: false,
          children: [],
        },
      ],
      '/reference/': [
        {
          title: 'Wallet API',
          path: '/reference/wallet-api.html',
          collapsible: false,
          children: [],
        },
        {
          title: 'ERTP API',
          path: '/reference/ertp-api/',
          collapsible: false,
          children: [
            '/reference/ertp-api/',
            '/reference/ertp-api/issuer.html',
            '/reference/ertp-api/mint.html',
            '/reference/ertp-api/brand.html',
            '/reference/ertp-api/purse.html',
            '/reference/ertp-api/payment.html',
            '/reference/ertp-api/amount-math.html',
            '/reference/ertp-api/ertp-data-types.html',
          ],
        },
        {
          title: 'REPL API',
          path: '/reference/repl/',
          collapsible: false,
          children: [
            '/reference/repl/',
            '/reference/repl/timerServices.html',
            '/reference/repl/board.html',
            '/reference/repl/networking.html',
            '/reference/repl/priceAuthority.html',
            '/reference/repl/scratch.html',
          ],
        },
        {
          title: 'Zoe API',
          path: '/reference/zoe-api/',
          collapsible: false,
          children: [
            '/reference/zoe-api/',
            '/reference/zoe-api/zoe.html',
            '/reference/zoe-api/user-seat.html',
            '/reference/zoe-api/zoe-contract-facet.html',
            '/reference/zoe-api/zcfseat.html',
            '/reference/zoe-api/zcfmint.html',
            '/reference/zoe-api/price-authority.html',
            '/reference/zoe-api/zoe-helpers.html',
            '/reference/zoe-api/ratio-math.html',
            '/reference/zoe-api/zoe-data-types.html',
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
};
