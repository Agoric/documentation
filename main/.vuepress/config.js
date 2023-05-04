const nav = require('./themeConfig/nav');

module.exports = {
  /* --- FOR DEPLOYMENT TO GITHUB PAGES--- */
  base: '/', // The base URL the site will be deployed at.
  /* --- HOME PAGE --- */
  title: 'Documentation', // title for the site. prefix for all page titles and displayed in the navbar
  description: 'Build, deploy and operate dApps and DeFi markets.', // desc for the site; rendered as a <meta> tag in the page HTML
  // Extra tags to inject into the page HTML <head>. You can specify each tag in the form of [tagName, { attrName: attrValue }, innerHTML?].
  head: [
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
      { src: 'https://www.googletagmanager.com/gtag/js?id=UA-118217811-1' },
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
    const logoUrlChanger = setInterval(function() {
    //Anchor above the logo image
    const homeEls = document.getElementsByClassName("home-link");
    if(homeEls.length > 0) {
      const homeEl = homeEls[0];
      homeEl.setAttribute("href", "https://agoric.com");
      homeEl.setAttribute("onclick", "return false;");
      clearInterval(logoUrlChanger);
    }

    //Actual logo image
    const logoEls = document.getElementsByClassName("logo")
    if(logoEls.length > 0) {
      const logoEl = logoEls[0]
      logoEl.setAttribute("onclick", "document.location='https://agoric.com';return false;");
      clearInterval(logoUrlChanger);
    }
   }, 1000) `,
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
            '/guides/getting-started/start-a-project.html',
            '/guides/getting-started/deploying.html',
            '/guides/getting-started/syncing-up.html',
          ],
        },
        {
          title: 'Agoric CLI',
          path: '/guides/agoric-cli/',
          collapsible: false,
          children: ['/guides/agoric-cli/'],
        },
        {
          title: 'JavaScript Framework',
          path: '/guides/js-programming/',
          collapsible: false,
          children: [
            '/guides/js-programming/',
            '/guides/js-programming/hardened-js',
            '/guides/js-programming/eventual-send',
            '/guides/js-programming/far',
            '/guides/js-programming/notifiers',
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
            '/guides/ertp/amounts',
            '/guides/ertp/amount-math',
            '/guides/ertp/issuers-and-mints',
            '/guides/ertp/purses-and-payments',
          ],
        },
        {
          title: 'Zoe',
          path: '/guides/zoe/',
          collapsible: false,
          children: [
            '/guides/zoe/',
            '/guides/zoe/offer-enforcement',
            '/guides/zoe/offer-safety',
            '/guides/zoe/proposal',
            '/guides/zoe/contract-requirements',
            '/guides/zoe/price-authority',
          ],
        },
        {
          title: 'Deploying to Agoric Testnet',
          path: '/guides/coreeval/',
          collapsible: false,
          children: [
            '/guides/coreeval/',
            '/guides/coreeval/permissions',
            '/guides/coreeval/proposal',
            '/guides/coreeval/local-testnet',
          ],
        },        
        {
          title: 'Example Zoe Contracts',
          path: '/guides/zoe/contracts/',
          collapsible: false,
          children: [
            '/guides/zoe/contracts/',
            '/guides/zoe/contracts/oracle',
            '/guides/zoe/contracts/vault',
            '/guides/zoe/contracts/loan',
            '/guides/zoe/contracts/fundedCallSpread',
            '/guides/zoe/contracts/pricedCallSpread',
            '/guides/zoe/contracts/covered-call',
            '/guides/zoe/contracts/otc-desk',
            '/guides/zoe/contracts/constantProductAMM',
            '/guides/zoe/contracts/sell-items',
            '/guides/zoe/contracts/atomic-swap',
            '/guides/zoe/contracts/barter-exchange',
            '/guides/zoe/contracts/second-price-auction',
            '/guides/zoe/contracts/simple-exchange',
            '/guides/zoe/contracts/escrow-to-vote',
            '/guides/zoe/contracts/mint-payments',
            '/guides/zoe/contracts/mint-and-sell-nfts',
            '/guides/zoe/contracts/use-obj-example',
            '/guides/zoe/contracts/automatic-refund',
          ],
        },
        {
          title: 'Deployed Zoe Contracts',
          path: '/guides/zoe/actual-contracts/',
          collapsible: false,
          children: [
            '/guides/zoe/actual-contracts/',
            '/guides/zoe/actual-contracts/PSM',
          ],
        },
        {
          title: 'Agoric Dapps',
          path: '/guides/dapps/',
          collapsible: false,
          children: [
            '/guides/dapps/',
            '/guides/dapps/dapp-templates',
            '/guides/dapps/starting-multiuser-dapps',
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
          path: '/guides/chainlink-integration',
          collapsible: false,
          children: [],
        },
      ],
      '/reference/': [
        {
          title: 'Wallet API',
          path: '/reference/wallet-api',
          collapsible: false,
          children: [],
        },
        {
          title: 'ERTP API',
          path: '/reference/ertp-api/',
          collapsible: false,
          children: [
            '/reference/ertp-api/',
            '/reference/ertp-api/issuer',
            '/reference/ertp-api/mint',
            '/reference/ertp-api/brand',
            '/reference/ertp-api/purse',
            '/reference/ertp-api/payment',
            '/reference/ertp-api/amount-math',
            '/reference/ertp-api/ertp-data-types',
          ],
        },
        {
          title: 'REPL API',
          path: '/reference/repl/',
          collapsible: false,
          children: [
            '/reference/repl/',
            '/reference/repl/timerServices',
            '/reference/repl/board',
            '/reference/repl/sharingService',
            '/reference/repl/networking',
            '/reference/repl/priceAuthority',
            '/reference/repl/scratch',
          ],
        },
        {
          title: 'Zoe API',
          path: '/reference/zoe-api/',
          collapsible: false,
          children: [
            '/reference/zoe-api/',
            '/reference/zoe-api/zoe',
            '/reference/zoe-api/user-seat',
            '/reference/zoe-api/zoe-contract-facet',
            '/reference/zoe-api/zcfseat',
            '/reference/zoe-api/zcfmint',
            '/reference/zoe-api/price-authority',
            '/reference/zoe-api/zoe-helpers',
            '/reference/zoe-api/ratio-math',
            '/reference/zoe-api/zoe-data-types',
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
