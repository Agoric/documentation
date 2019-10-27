module.exports = {
  /* --- FOR DEPLOYEMENT TO GITHUB PAGES--- */
  base: '/Documentation/', // The base URL the site will be deployed at.
  /* --- HOME PAGE --- */
  title: 'Agoric Documentation', // title for the site. prefix for all page titles and displayed in the navbar
  description: 'Secure smart contracts', // desc for the site; rendered as a <meta> tag in the page HTML

  /* --- DEFAULT THEME CONFIG --- */
  // NOTES:
  // Internal links: Must have a corresponding folder with a README.md file
  // Links must be absolute with trailing slash '/guide/'
  // Trailing slash implies it is looking for a .md file
  themeConfig: {
    /* --- NAVBAR (top) --- */
    nav: [
      {
        text: 'ERTP',
        ariaLabel: 'ERTP Menu',
        items: [
          { text: 'Guide', link: '/ertp/guide/' },
          { text: 'API', link: '/ertp/api/' }
        ]
      },
      {
        text: 'Zoe',
        ariaLabel: 'Zoe Menu',
        items: [
          { text: 'Guide', link: '/zoe/guide/' },
          { text: 'API', link: '/zoe/api/' }
        ],
      },
      { text: 'Agoric', link: 'https://agoric.com/' },
      { text: 'Github', link: 'https://github.com/Agoric/ERTP' }
    ],

    /* --- SIDEBAR --- */
    // This configuration displays different sidebars for different sections of
    // content. Pages must be organized into directories for each desired
    // section
    sidebar: {
      '/ertp/': [
        {
          title: 'ERTP Guide',
          path: '/guide/', // /ertp/guide/
          children: [
            ['/guide/', 'ERTP'], // [link, title]
            '/guide/getting-started', // default, gets title from header
            { // usees an object to assign everything, including children
              title: 'Concepts',
              path: '/guide/issuers/',
              collapsable: false,
              children: [
                '/guide/issuers',
                '/guide/mint',
                '/guide/contract-hosts'
              ]
            }
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
