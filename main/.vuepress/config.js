const nav = require('./themeConfig/nav')

module.exports = {
  /* --- FOR DEPLOYEMENT TO GITHUB PAGES--- */
  base: '/documentation/', // The base URL the site will be deployed at.
  /* --- HOME PAGE --- */
  title: 'Beta', // title for the site. prefix for all page titles and displayed in the navbar
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
    logo: 'https://agoric.com/wp-content/themes/agoric_2021_theme/assets/img/logo.svg',
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
          title: 'Documentation Guide',
          path: '/getting-started/',
          collapsible: false,
          children: [
          ]
        },
        {
          title: 'Agoric CLI',
          path: '/guides/agoric-cli/',
          collapsible: false,
          children: [
            '/guides/agoric-cli/commands',
            '/guides/agoric-cli/starting-multiuser-dapps',
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
          title: 'Wallet',
          path: '/guides/wallet/',
          collapsible: false,
          children: [
            '/guides/wallet/',
	    '/guides/wallet/ui',
	    '/guides/wallet/api',		
          ]
        },
        {
          title: 'JavaScript Programming',
          path: '/guides/js-programming/',
          collapsible: false,
          children: [
	    '/guides/js-programming/agoric-js-overview',
	    '/guides/js-programming/ses/',
	    '/guides/js-programming/bigint',
	    '/guides/js-programming/vats',
	    '/guides/js-programming/far',
	    '/guides/js-programming/eventual-send',			
	    '/guides/js-programming/notifiers',	
          ]
        },
        {
          title: 'SES',
          path: '/guides/js-programming/ses/',
          collapsible: false,
          children: [
	    '/guides/js-programming/ses/ses-guide',
	    '/guides/js-programming/ses/ses-reference',
	    '/guides/js-programming/ses/lockdown',
          ]
        },
        {
          title: 'REPL',
          path: '/repl/',
          collapsible: false,
          children: [
	    '/guides/wallet/api',
	    '/repl/timerServices',
            '/repl/board',
	    '/repl/sharingService',
	    '/repl/networking',
	    '/zoe/api/zoe',
	    '/repl/priceAuthority',
	    '/repl/scratch',
          ]
        },
        {
          title: 'Dynamic IBC',
          path: 'https://github.com/Agoric/agoric-sdk/blob/master/packages/SwingSet/docs/networking.md',
          collapsible: false,
          children: [
          ]
        },
        {
          title: 'Chainlink Integration',
          path: '/guides/chainlink-integration.html',
          collapsible: false,
          children: [
          ]
       },
      ],
      '/getting-started/': [
        {
          title: 'Agoric Beta',
          path: '/getting-started/beta.html',
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
          path: '/getting-started/ertp-introduction.html',
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
            '/zoe/api/contract-support/price-authority',
            '/zoe/api/contract-support/ratio-math',
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

    zoeVersion: 'v0.18.1',
    zoeDocsUpdated: '2021-09-13'


    /* --- SEARCH --- */
    // Comes with built-in search functionality which builds its index from the
    // h1, h2, and h3 headers
    // Disable search by uncommenting the following line:
    // search: false
    // Cusotmize how many suggestions will be shown with:
    // searchMaxSuggestions: <numberOfSuggestions>
  }
}
