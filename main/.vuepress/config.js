const nav = require('./themeConfig/nav')

module.exports = {
  /* --- FOR DEPLOYEMENT TO GITHUB PAGES--- */
  base: '/Documentation/', // The base URL the site will be deployed at.
  /* --- HOME PAGE --- */
  title: 'Agoric Documentation', // title for the site. prefix for all page titles and displayed in the navbar
  description: 'Secure smart contracts', // desc for the site; rendered as a <meta> tag in the page HTML

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
      '/ertp/': [
        {
          title: 'ERTP Guide',
          path: '/ertp/guide/',
          collapsable: false,
          sideBarDepth: 3,
          children: [
            '/ertp/guide/',
            '/ertp/guide/getting-started',
            '/ertp/guide/assays',
            '/ertp/guide/default-configuration',
            '/ertp/guide/contract-hosts',
            '/ertp/guide/gotchas'
          ]
        },
        {
          title: 'ERTP API',
          path: '/ertp/api/',
          collapsable: false,
          sideBarDepth: 3,
          children: [
            '/ertp/api/',
            '/ertp/api/mint',
            {
              title: 'UnitOps',
              path: '/ertp/api/unitOps'
            }
          ]
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
            '/zoe/guide/offer-safety'
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
            '/zoe/guide/contracts/public-swap'
          ]
        },
        {
          title: 'Zoe API',
          path: '/zoe/api/',
          collapsable: false
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
