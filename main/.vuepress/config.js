const nav = require('./themeConfig/nav')

module.exports = {
  /* --- FOR DEPLOYEMENT TO GITHUB PAGES--- */
  base: '/documentation/', // The base URL the site will be deployed at.
  /* --- HOME PAGE --- */
  title: 'Agoric Documentation', // title for the site. prefix for all page titles and displayed in the navbar
  description: 'Secure smart contracts', // desc for the site; rendered as a <meta> tag in the page HTML
  // Extra tags to inject into the page HTML <head>. You can specify each tag in the form of [tagName, { attrName: attrValue }, innerHTML?].
  head: [
    ['link', { rel: 'icon', href: '/favicon-full.ico' }]
  ],

  /* --- DEFAULT THEME CONFIG --- */
  themeConfig: {
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
          title: 'Getting Started',
          path: '/getting-started/',
          collapsable: false,
          sideBarDepth: 3,
          children: [
            {
              title: 'Agoric Dev Tools',
              path: '/getting-started/',
              collapsable: false,
              sideBarDepth: 3
            },
          ]
        },
      ],
      '/ertp/': [
        {
          title: 'ERTP Guide',
          path: '/ertp/guide/',
          collapsable: false,
          sideBarDepth: 3,
          children: [
            '/ertp/guide/',
            '/ertp/guide/getting-started',
            '/ertp/guide/issuer',
            '/ertp/guide/brand',
            '/ertp/guide/amounts',
            '/ertp/guide/amount-math',
            '/ertp/guide/math-helpers',
            '/ertp/guide/default-configuration',
            '/ertp/guide/contract-hosts',
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
            '/ertp/api/math-helpers',
            '/ertp/api/contract-hosts'
          ]
        },
        {
          title: 'ERTP Glossary',
          path: '/ertp/glossary/'
        }
      ],

      '/zoe/': [
        {
          title: 'Zoe',
          path: '/zoe/guide/',
          collapsable: false,
          sideBarDepth: 5,
          children: [
            '/zoe/guide/',
            '/zoe/guide/offer-safety',
            '/zoe/guide/offer-rules'
          ]
        },
        {
          title: 'Zoe Contracts',
          path: '/zoe/guide/contracts/autoswap',
          collapsable: false,
          sideBarDepth: 3,
          children: [
            '/zoe/guide/contracts/autoswap',
            '/zoe/guide/contracts/public-auction',
            '/zoe/guide/contracts/atomic-swap',
            '/zoe/guide/contracts/covered-call',
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
            '/zoe/api/structs',
            '/zoe/api/zoe-contract-facet'
          ],
        },
        {
          title: 'Zoe Roadmap',
          path: '/zoe/roadmap/'
        }
      ],

      '/smart-contracts-tutorials/': [
        {
          title: 'Smart Contracts Tutorials',
          path: '/smart-contracts-tutorials/guess37-one',
          collapsable: false,
          sideBarDepth: 3,
          children: [
            '/smart-contracts-tutorials/guess37-one',
            '/smart-contracts-tutorials/guess37-multiple'
          ]
        }
      ]
    }

    /* --- SEARCH --- */
    // Comes with built-in search functionality which builds its index from the
    // h1, h2, and h3 headers
    // Disable search by uncommenting the following line:
    // search: false
    // Cusotmize how many suggestions will be shown with:
    // searchMaxSuggestions: <numberOfSuggestions>
  }
}
