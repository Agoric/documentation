/* --- NAVBAR (top) --- */
// NOTES:
// Internal links: Must have a corresponding folder with a README.md file
// Links must be absolute with trailing slash '/guide/'
// Trailing slash implies it is looking for a .md file

module.exports = [
  {
    text: 'Getting Started',
    ariaLabel: 'Getting Started Menu',
    link: '/getting-started/',
    items: [
      {
        text: 'Agoric Dev Tools',
        ariaLabel: 'Agoric Dev Tools Menu',
        link: '/getting-started/',
      },
    ]
  },
  {
    text: 'ERTP', // spaces to add some distance to next link
    ariaLabel: 'ERTP Menu',
    link: '/ertp/guide/',
    items: [
      {
        text: 'Guide',
        ariaLabel: 'ERTP Guide Link',
        link: '/ertp/guide/'
      },
      {
        text: 'API',
        ariaLabel: 'ERTP API Link',
        link: '/ertp/api/'
      },
      {
        text: 'Github',
        ariaLabel: 'ERTP Github Link',
        link: 'https://github.com/Agoric/agoric-sdk/tree/master/packages/ERTP'
      }
    ]
  },
  {
    text: 'Zoe',
    ariaLabel: 'Zoe Menu',
    link: '/zoe/guide',
    items: [
      {
        text: 'Guide',
        ariaLabel: 'Zoe Guide Link',
        link: '/zoe/guide/'
      },
      {
        text: 'Contracts',
        ariaLabel: 'Zoe Contracts Link',
        link: '/zoe/guide/contracts/autoswap'
      },
      {
        text: 'API',
        ariaLabel: 'Zoe API',
        link: '/zoe/api/'
      },
      {
        text: 'Github',
        ariaLabel: 'Zoe Github Link',
        link: 'https://github.com/Agoric/agoric-sdk/tree/master/packages/zoe'
      }
    ],
  },
  {
    text: 'Learn More',
    ariaLabel: 'Learn More Menu',
    items: [
      {
        text: 'Contributing',
        ariaLabel: 'Contributing',
        link: '/miscellaneous/contributing'
      },
      {
        text: 'Agoric',
        ariaLabel: 'Agoric Homepage Link',
        link: 'https://agoric.com/'
      }
    ]
  },
  {
    text: 'Github',
    ariaLabel: 'Agoric Github Link',
    link: 'https://github.com/Agoric/'
  }
]
