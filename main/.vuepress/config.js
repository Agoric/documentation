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
    logo:
      'https://agoric.com/wp-content/themes/agoric_2021_theme/assets/img/logo.svg',
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
      '/conceptual/': [
          {
            title: 'Getting Started',
            path: '/conceptual/getting-started/',
            collapsible: false,
            children: [
              '/conceptual/getting-started/',
              '/conceptual/getting-started/start-a-project.html',
              '/conceptual/getting-started/deploying.html',
            ],
          },
        {
          title: 'Agoric CLI',
          path: '/conceptual/agoric-cli/',
          collapsible: false,
          children: [
            '/conceptual/agoric-cli/',
          ],
        },
        {
          title: 'JavaScript Framework',
          path: '/conceptual/js-programming/',
          collapsible: false,
          children: [
            '/conceptual/js-programming/',
            '/conceptual/js-programming/hardened-js',
            '/conceptual/js-programming/eventual-send',
            '/conceptual/js-programming/far',
            '/conceptual/js-programming/notifiers',
          ],
        },
        {
          title: 'Wallet',
          path: '/conceptual/wallet/',
          collapsible: false,
          children: [
            '/conceptual/wallet/',
            '/conceptual/wallet/ui',
          ],
        },
        {
          title: 'ERTP',
          path: '/conceptual/ertp/',
          collapsible: false,
          children: [
            '/conceptual/ertp/',
            '/conceptual/ertp/amounts',
            '/conceptual/ertp/amount-math',
            '/conceptual/ertp/issuers-and-mints',
            '/conceptual/ertp/purses-and-payments',
          ],
        },
        {
            title: 'Zoe',
            path: '/conceptual/zoe/',
            collapsible: false,
            children: [
              '/conceptual/zoe/',
              '/conceptual/zoe/offer-enforcement',
              '/conceptual/zoe/offer-safety',
              '/conceptual/zoe/proposal',
              '/conceptual/zoe/contract-requirements',
              '/conceptual/zoe/price-authority',
            ],
        },
          {
              title: 'Deployed Zoe Contracts',
              path: '/conceptual/zoe/actual-contracts/',
              collapsible: false,
              children: [
                '/conceptual/zoe/actual-contracts/',
                '/conceptual/zoe/actual-contracts/PSM',
            ],
        },
        {
            title: 'Example Zoe Contracts',
            path: '/conceptual/zoe/contracts/',
            collapsible: false,
            children: [
              '/conceptual/zoe/contracts/',
              '/conceptual/zoe/contracts/oracle',
              '/conceptual/zoe/contracts/vault',
              '/conceptual/zoe/contracts/loan',
              '/conceptual/zoe/contracts/fundedCallSpread',
              '/conceptual/zoe/contracts/pricedCallSpread',
              '/conceptual/zoe/contracts/covered-call',
              '/conceptual/zoe/contracts/otc-desk',
              '/conceptual/zoe/contracts/constantProductAMM',
              '/conceptual/zoe/contracts/sell-items',
              '/conceptual/zoe/contracts/atomic-swap',
              '/conceptual/zoe/contracts/barter-exchange',
              '/conceptual/zoe/contracts/second-price-auction',
              '/conceptual/zoe/contracts/simple-exchange',
              '/conceptual/zoe/contracts/escrow-to-vote',
              '/conceptual/zoe/contracts/mint-payments',
              '/conceptual/zoe/contracts/mint-and-sell-nfts',
              '/conceptual/zoe/contracts/use-obj-example',
              '/conceptual/zoe/contracts/automatic-refund',
            ],
        },
        {
           title: 'Agoric Dapps',
           path: '/conceptual/dapps/',
           collapsible: false,
           children: [
             '/conceptual/dapps/',
             '/conceptual/dapps/dapp-templates',
             '/conceptual/dapps/starting-multiuser-dapps',
           ],
        },
        {
            title: 'Agoric Platform',
            path: '/conceptual/platform/',
            collapsible: false,
            children: [],
        },
        {
            title: 'Chainlink Integration',
            path: '/conceptual/chainlink-integration',
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
              '/reference/ertp-api/displayInfo',
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
            '/reference/zoe-api/zoe-contract-facet',
            '/reference/zoe-api/zoe-helpers',
            '/reference/zoe-api/contract-support/price-authority',
            '/reference/zoe-api/contract-support/ratio-math',
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
