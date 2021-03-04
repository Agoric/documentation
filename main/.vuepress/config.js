const nav = require('./themeConfig/nav')

module.exports = {
  /* --- FOR DEPLOYEMENT TO GITHUB PAGES--- */
  base: '/documentation/', // The base URL the site will be deployed at.
  /* --- HOME PAGE --- */
  title: 'Alpha', // title for the site. prefix for all page titles and displayed in the navbar
  description: 'Build, deploy and operate dApps and DeFi markets.', // desc for the site; rendered as a <meta> tag in the page HTML
  // Extra tags to inject into the page HTML <head>. You can specify each tag in the form of [tagName, { attrName: attrValue }, innerHTML?].
  head: [
    ['link', { rel: 'icon', href: '/favicon-full.ico' }],
    ['style', { type: 'text/css'}, `
    .two-col-table td {
        width: 50%;
    }
    .two-col-table table {
        table-layout: fixed;
    }`],
    ['script', { src: 'https://www.googletagmanager.com/gtag/js?id=UA-118217811-1' }],
    ['script', {}, "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-118217811-1'); "],
    ["script",
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
   }, 1000) `
    ]
  ],

  plugins: ['check-md'],

  /* --- DEFAULT THEME CONFIG --- */
  themeConfig: {
    sidebarDepth: 2,
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
      '/glossary/': [
        {
          title: 'Glossary',
          path: '/glossary/',
          collapsible: false,
          children: [
          ]
        },
        ],      
      '/platform/': [
        {
          title: 'Platform',
          path: '/platform/',
          collapsible: false,
          children: [
          ]
        },
        ],  
      '/guides/': [
        {
          title: 'Documentation Guide',
          path: '/getting-started/',
          collapsible: false,
          children: [
          ]
        },
        {
          title: 'Agoric CLI',
          path: '/guides/agoric-cli',
          collapsible: false,
          children: [
          ]
        },
        {
          title: 'Wallet',
          path: '/guides/wallet',
          collapsible: false,
          children: [
          ]
        },
        {
          title: 'Agoric JavaScript Programming',
          path: '/guides/js-programming',
          collapsible: false,
          children: [
          ]
        },
      ],
      '/getting-started/': [
        {
          title: 'Agoric Alpha',
          path: '/getting-started/alpha.html',
          collapsible: false,
          children: [
          ]
        },
        {
          title: 'Documentation Guide',
          path: '/getting-started/',
          collapsible: false,
          children: [
          ]
        },
        {
          title: 'Before Using Agoric',
          path: '/getting-started/before-using-agoric.html',
          collapsible: false,
          children: [
          ]
        },
        {
          title: 'Starting A Project',
          path: '/getting-started/start-a-project.html',
          collapsible: false,
          children: [
          ]
        },
        {
          title: 'Development Cycle',
          path: '/getting-started/development-cycle.html',
          collapsible: false,
          children: [
          ]
        },
        {
          title: 'Deploying Smart Contracts',
          path: '/getting-started/deploying.html',
          collapsible: false,
          children: [
          ]
        },
        {
          title: 'ERTP Introduction',
          path: '/getting-started/ertp-introduction.md',
          collapsible: false,
          children: [
          ]
        },
        {
          title: 'Zoe Introduction',
          path: '/getting-started/intro-zoe.md',
          collapsible: false,
          children: [
          ]
        },
        {
          title: 'Agoric CLI Guide',
          path: '/guides/agoric-cli/',
          collapsible: false,
          children: [
          ]
        },
      ],
      '/ertp/': [
        {
          title: 'ERTP Introduction',
          path: '/getting-started/ertp-introduction.md',
          collapsible: false,
          children: [
          ]
        },
        {
          title: 'ERTP Guide',
          path: '/ertp/guide/',
          collapsible: false,
          children: [
            '/ertp/guide/',
            '/ertp/guide/amounts',
            '/ertp/guide/amount-math',
            '/ertp/guide/issuers-and-mints',
            '/ertp/guide/purses-and-payments',
          ]
        },
        {
          title: 'ERTP API',
          path: '/ertp/api/',
          collapsible: false,
          children: [
            '/ertp/api/issuer',
            '/ertp/api/mint',
            '/ertp/api/brand',
            '/ertp/api/purse',
            '/ertp/api/payment',
            '/ertp/api/amount-math',
          ]
        }
      ],
      '/zoe/': [
        {
          title: 'Zoe Introduction',
          path: '/getting-started/intro-zoe.md',
          collapsible: false,
          children: [
          ]
        },
        {
          title: 'Zoe Guide',
          path: '/zoe/guide/',
          collapsible: false,
          children: [
            '/zoe/guide/',
            '/zoe/guide/offer-safety',
            '/zoe/guide/proposal',
            '/zoe/guide/contract-requirements',
            '/zoe/guide/price-authority'
          ]
        },
        {
          title: 'Zoe Contracts',
          path: '/zoe/guide/contracts/',
          collapsible: false,
          children: [
            '/zoe/guide/contracts/automatic-refund',
            '/zoe/guide/contracts/atomic-swap',
            '/zoe/guide/contracts/autoswap',
            '/zoe/guide/contracts/barter-exchange',
            '/zoe/guide/contracts/covered-call',
            '/zoe/guide/contracts/escrow-to-vote',
            '/zoe/guide/contracts/fundedCallSpread',
            '/zoe/guide/contracts/loan',
            '/zoe/guide/contracts/mint-and-sell-nfts',
            '/zoe/guide/contracts/mint-payments',
            '/zoe/guide/contracts/multipoolAutoswap',
            '/zoe/guide/contracts/oracle',
            '/zoe/guide/contracts/otc-desk',
            '/zoe/guide/contracts/pricedCallSpread',
            '/zoe/guide/contracts/second-price-auction',
            '/zoe/guide/contracts/sell-items',
            '/zoe/guide/contracts/simple-exchange',
            '/zoe/guide/contracts/use-obj-example',
          ]
        },
        {
          title: 'Zoe API',
          path: '/zoe/api/',
          collapsible: false,
          children: [
            '/zoe/api/zoe',
            '/zoe/api/zoe-contract-facet',
            '/zoe/api/zoe-helpers',
            '/zoe/api/price-authority',
          ],
        },
        {
          title: 'Zoe Roadmap',
          path: '/zoe/roadmap/'
        }
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

    zoeVersion: 'Alpha Release v0.11.0',
    zoeDocsUpdated: '2021-02-01'


    /* --- SEARCH --- */
    // Comes with built-in search functionality which builds its index from the
    // h1, h2, and h3 headers
    // Disable search by uncommenting the following line:
    // search: false
    // Cusotmize how many suggestions will be shown with:
    // searchMaxSuggestions: <numberOfSuggestions>
  }
}
