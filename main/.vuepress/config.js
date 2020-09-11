const nav = require('./themeConfig/nav')

module.exports = {
  /* --- FOR DEPLOYEMENT TO GITHUB PAGES--- */
  base: '/documentation/', // The base URL the site will be deployed at.
  /* --- HOME PAGE --- */
  title: 'Documentation', // title for the site. prefix for all page titles and displayed in the navbar
  description: 'Secure smart contracts', // desc for the site; rendered as a <meta> tag in the page HTML
  // Extra tags to inject into the page HTML <head>. You can specify each tag in the form of [tagName, { attrName: attrValue }, innerHTML?].
  head: [
    ['link', { rel: 'icon', href: '/favicon-full.ico' }],
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

  /* --- DEFAULT THEME CONFIG --- */
  themeConfig: {
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
      '/getting-started/': [
         {
          title: 'Documentation Guide',
          path: '/getting-started/',
          collapsable: false,
          sideBarDepth: 3,
          children: [
          ]
         },       
         {
          title: 'Before Using Agoric',
          path: '/getting-started/before-using-agoric.html',
          collapsable: false,
          sideBarDepth: 3,
          children: [
          ]
	       },
         {
          title: 'Starting A Project',
          path: '/getting-started/start-a-project.html',
          collapsable: false,
          sideBarDepth: 3,
          children: [
          ]
        },
        {
          title: 'Development Cycle',
          path: '/getting-started/development-cycle.html',
          collapsable: false,
          sideBarDepth: 3,
          children: [
          ]
        },
        {
          title: 'Deploying Smart Contracts',
          path: '/getting-started/deploying.html',
          collapsable: false,
          sideBarDepth: 3,
          children: [
          ]
        },
         {
          title: 'ERTP Introduction',
          path: '/getting-started/ertp-introduction.html',
          collapsable: false,
          sideBarDepth: 3,
          children: [
          ]
         },
         {
          title: 'Zoe Introduction',
          path: '/getting-started/intro-zoe.html',
          collapsable: false,
          sideBarDepth: 3,
          children: [
          ]
         },      
         {
          title: 'Agoric CLI Guide',
          path: '/getting-started/agoric-cli-guide.html',
          collapsable: false,
          sideBarDepth: 3,
          children: [
          ]
	       },
        ],
      '/ertp/': [
         {
          title: 'ERTP Introduction',
          path: '/getting-started/ertp-introduction.html',
          collapsable: false,
          sideBarDepth: 3,
          children: [
          ]
	 },
         {
          title: 'ERTP Guide',
          path: '/ertp/guide/',
          collapsable: false,
          sideBarDepth: 3,
          children: [
            '/ertp/guide/',
            '/ertp/guide/issuer',
            '/ertp/guide/brand',
            '/ertp/guide/amounts',
            '/ertp/guide/amount-math',
            '/ertp/guide/math-helpers',
            '/ertp/guide/other-concepts'
          ]
        },
        {
          title: 'ERTP API',
          path: '/ertp/api/',
          collapsable: false,
          sideBarDepth: 3,
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
          path: '/getting-started/intro-zoe.html',
          collapsable: false,
          sideBarDepth: 3,
          children: [
          ]
        },  
        {
          title: 'Zoe Guide',
          path: '/zoe/guide/',
          collapsable: false,
          sideBarDepth: 5,
          children: [
            '/zoe/guide/',
            '/zoe/guide/offer-safety',
            '/zoe/guide/proposal',
            '/zoe/guide/contract-requirements'
          ]
        },  
        {
          title: 'Zoe Contracts',
          path: '/zoe/guide/contracts/',
          collapsable: false,
          sideBarDepth: 3,
          children: [
            '/zoe/guide/contracts/atomic-swap',
            '/zoe/guide/contracts/autoswap',
            '/zoe/guide/contracts/covered-call',
            '/zoe/guide/contracts/second-price-auction',
            '/zoe/guide/contracts/simple-exchange'
          ]
        },
        {
          title: 'Zoe API',
          path: '/zoe/api/',
          collapsable: false,
          sideBarDepth: 3,
          children: [
            '/zoe/api/zoe',
            '/zoe/api/zoe-contract-facet',
            '/zoe/api/zoe-helpers'
          ],
        },
        {
          title: 'Zoe Roadmap',
          path: '/zoe/roadmap/'
        }
      ],
    },

    zoeVersion: 'Alpha Release Candidate v0.8.1',
    zoeDocsUpdated: '10-SEP-2020'


    /* --- SEARCH --- */
    // Comes with built-in search functionality which builds its index from the
    // h1, h2, and h3 headers
    // Disable search by uncommenting the following line:
    // search: false
    // Cusotmize how many suggestions will be shown with:
    // searchMaxSuggestions: <numberOfSuggestions>
  }
}
