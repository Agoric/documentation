module.exports = {
  /* --- FOR DEPLOYEMENT TO GITHUB PAGES--- */
  base: '/Documentation/', // name of the repo
  /* --- HOME PAGE --- */
  title: 'ERTP 0.x', // title for the site. prefix for all page titles and displayed in the navbar
  description: 'Electronic Rights Transfer Protocol (ERTP). A smart contract framework for exchanging electronic rights', // desc for the site; rendered as a tag in the page HTML

  /* --- THEME CONFIG --- */
  // NOTES:
  // Internal links: Must have a corresponding folder with a README.md file
  // Links must be absolute with trailing slash '/guide/'
  // Trailing slash implies it is looking for a .md file
  themeConfig: {
    /* --- NAVBAR (top) --- */
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: 'Agoric', link: 'https://agoric.com/' },
      { text: 'Github', link: 'https://github.com/Agoric/ERTP' }
    ],

    /* --- SIDEBAR --- */
    // This configuration displays different sidebars for different sections of
    // content. Pages must be organized into directories for each desired
    // section
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          path: '/guide/',
          collapsable: false,
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
      ],
      '/api/': [
        {
          title: 'API',
          path: '/api/',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            { title: 'Mint', path: '/api/mint' },
            { title: 'DescOps', path: '/api/descOps' },
            { title: '/util', path: '/api/utils' }
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
