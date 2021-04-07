/* --- NAVBAR (top) --- */
// NOTES:
// Internal links: Must have a corresponding folder with a README.md file
// Links must be absolute with trailing slash '/guide/'
// Trailing slash implies it is looking for a .md file

module.exports = [
  {
    text: 'Getting Started',
    ariaLabel: 'Getting Started Menu',
    items: [
      {
        text: 'Documentation Guide',
        ariaLabel: 'Documentation Guide Menu',
        link: '/getting-started/',
      },
      {
        text: 'Before Using Agoric',
        ariaLabel: 'Before Using Agoric Menu',
        link: '/getting-started/before-using-agoric',
      },
      {
        text: 'Starting a Project',
        ariaLabel: 'Starting a Project Menu',
        link: '/getting-started/start-a-project',
      },
      {
        text: 'Development Cycle',
        ariaLabel: 'Development Cycle Menu',
        link: '/getting-started/development-cycle',
      },
      {
        text: 'Deploying Smart Contracts',
        ariaLabel: 'Deploying Menu',
        link: '/getting-started/deploying',
      },
      {
        text: 'ERTP Introduction',
        ariaLabel: 'ERTP Introduction Menu',
        link: '/getting-started/ertp-introduction',
      },
      {
        text: 'Zoe Introduction',
        ariaLabel: 'Zoe Introduction Menu',
        link: '/getting-started/intro-zoe',
      },
      {
        text: 'Agoric CLI Guide and API',
        ariaLabel: 'Agoric CLI Guide Menu',
        link: '/guides/agoric-cli/',
      },
      {
        text: 'Agoric Beta',
        ariaLabel: 'Agoric Beta',
        link: '/getting-started/beta',
      },
    ]
  },
  {
    text: 'Guides',
    ariaLabel: 'Guides',
    items: [
      {
        text: 'Documentation',
        ariaLabel: 'Documentation Guide',
        link: '/getting-started/',
      },
      {
        text: 'Agoric CLI Guide and API',
        ariaLabel: 'Agoric CLI Guide and API',
        link: '/guides/agoric-cli/',
      },
      {
        text: 'Agoric Dapps',
        ariaLabel: 'Dapps Guide',
        link: '/dapps/',
      },
      {
        text: 'ERTP',
        ariaLabel: 'ERTP Guide',
        link: '/ertp/guide/'
      },
      {
        text: 'Zoe',
        ariaLabel: 'Zoe Guide',
        link: '/zoe/guide/'
      },
      {
        text: 'Agoric JavaScript Programming',
        ariaLabel: 'Agoric JS Programming',
        link: '/guides/js-programming/',
      },
      {
        text: 'Wallet Guide and API',
        ariaLabel: 'Wallet API Guide and API',
        link: '/guides/wallet/'
      },
      {
        text: 'REPL',
        ariaLabel: 'REPL',
        link: '/repl/',
      },
      {
        text: 'Chainlink Integration',
        ariaLabel: 'Chainlink Integration',
        link: '/guides/chainlink-integration',
      },
      {
        text: 'Dynamic IBC (dIBC)',
        ariaLabel: 'dIBC Guide',
        link: 'https://github.com/Agoric/agoric-sdk/blob/master/packages/SwingSet/docs/networking.md'
      },
    ],
  },
  {
    text: 'Zoe',
    ariaLabel: 'Zoe Menu',
    link: '/zoe/guide',
    items: [
      {
        text: 'Introduction',
        ariaLabel: 'Zoe Introduction Link',
        link: '/getting-started/intro-zoe'
     },
     {
        text: 'Guide',
        ariaLabel: 'Zoe Guide Link',
        link: '/zoe/guide/'
      },
      {
        text: 'Contracts',
        ariaLabel: 'Zoe Contracts Link',
        link: '/zoe/guide/contracts/'
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
    text: 'ERTP', // spaces to add some distance to next link
    ariaLabel: 'ERTP Menu',
    link: '/ertp/guide/',
    items: [
       {
        text: 'Introduction',
        ariaLabel: 'ERTP Introduction Link',
        link: '/getting-started/ertp-introduction/',
      },
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
    text: 'Platform',
    ariaLabel: 'Platform Menu',
    link: '/platform/',
    items: [
       {
        text: 'Agoric Stack',
        ariaLabel: 'Agoric Stack Link',
        link: '/platform/',
      },
    ]
  },
  {
    text: 'Glossary',
    ariaLabel: 'Glossary Menu',
    link: '/glossary/'
  },
  {
    text: 'Learn More',
    ariaLabel: 'Learn More Menu',
    items: [
      {
        text: 'Agoric',
        ariaLabel: 'Agoric Homepage Link',
        link: 'https://agoric.com/'
      },      
      {
        text: 'Papers',
        ariaLabel: 'Papers Page Link',
        link: 'https://agoric.com/papers/'
      },
      {
        text: 'YouTube',
        ariaLabel: 'Agoric YouTube Channel Page Link',
        link: 'https://www.youtube.com/channel/UCpY91oQLh_Lp0mitdZ5bYWg/'
      },     
      {
        text: 'Github',
        ariaLabel: 'Agoric Github Link',
        link: 'https://github.com/Agoric/'
      }
    ]
  },  
]
