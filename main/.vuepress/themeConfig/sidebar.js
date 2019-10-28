/* --- SIDEBAR --- */
// This configuration displays different sidebars for different sections of
// content. Pages must be organized into directories for each desired
// section

// NOTES:
// Internal links: Must have a corresponding folder with a README.md file
// Links must be absolute with trailing slash '/guide/'
// Trailing slash implies it is looking for a .md file
module.exports = {
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
