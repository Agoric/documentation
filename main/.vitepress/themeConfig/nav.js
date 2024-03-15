/* --- NAVBAR (top) --- */
// NOTES:
// Internal links: Must have a corresponding folder with a README.md file
// Links must be absolute with trailing slash '/guide/'
// Trailing slash implies it is looking for a .md file

export const nav = [
  {
    text: 'Getting Started',
    ariaLabel: 'Getting Started Menu',
    items: [
      {
        text: 'Your First Agoric Dapp',
        ariaLabel: 'Your First Agoric Dapp Menu',
        link: '/guides/getting-started/',
      },
      {
        text: 'Smart Wallet Dapp Architecture',
        ariaLabel: 'Smart Wallet Dapp Architecture Menu',
        link: '/guides/getting-started/contract-rpc',
      },
      {
        text: 'Deploying Smart Contracts',
        ariaLabel: 'Deploying Menu',
        link: '/guides/getting-started/deploying',
      },
      {
        text: 'Permissioned Contract Deployment',
        ariaLabel: 'Permissioned Contract Deployment',
        link: '/guides/coreeval/',
      },
    ],
  },
  {
    text: 'Agoric Components',
    ariaLabel: 'Agoric Components Menu',
    items: [
      {
        text: 'Agoric CLI',
        ariaLabel: 'Agoric CLI',
        link: '/guides/agoric-cli/',
      },
      {
        text: 'JavaScript Framework',
        ariaLabel: 'JavaScript Framework',
        link: '/guides/js-programming/',
      },
      {
        text: 'Wallet',
        ariaLabel: 'Wallet',
        link: '/guides/wallet/',
      },
      {
        text: 'ERTP',
        ariaLabel: 'ERTP',
        link: '/guides/ertp/',
      },
      {
        text: 'Zoe',
        ariaLabel: 'Zoe',
        link: '/guides/zoe/',
      },
      {
        text: 'Example Zoe Contracts',
        ariaLabel: 'Example Zoe Contracts',
        link: '/guides/zoe/contracts/',
      },
      {
        text: 'Deployed Zoe Contracts',
        ariaLabel: 'Deployed Zoe Contracts',
        link: '/guides/zoe/actual-contracts/',
      },
      {
        text: 'Agoric Dapps',
        ariaLabel: 'Agoric Dapps',
        link: '/guides/dapps/',
      },
    ],
  },
  {
    text: 'API Reference',
    ariaLabel: 'API Reference Menu',
    items: [
      {
        text: 'Wallet API',
        ariaLabel: 'Wallet API Menu',
        link: '/reference/wallet-api/',
      },
      {
        text: 'ERTP API',
        ariaLabel: 'ERTP API Menu',
        link: '/reference/ertp-api/',
      },
      {
        text: 'REPL API',
        ariaLabel: 'REPL API Menu',
        link: '/reference/repl/',
      },
      {
        text: 'Zoe API',
        ariaLabel: 'ZOE API Menu',
        link: '/reference/zoe-api/',
      },
    ],
  },
  {
    text: 'Glossary',
    ariaLabel: 'Glossary Menu',
    link: '/glossary/',
  },
  {
    text: 'New Features',
    ariaLabel: 'New Features Menu',
    items: [
      {
        text: 'Patterns',
        ariaLabel: 'Patterns Source Code Link',
        link:
          'https://github.com/Agoric/agoric-sdk/blob/master/packages/store/src/types.js',
      },
      {
        text: 'Smart Wallet',
        ariaLabel: 'Smart Wallet Internal Documentation',
        link:
          'https://github.com/Agoric/agoric-sdk/blob/master/packages/smart-wallet/README.md',
      },
      {
        text: 'Upgrading Contracts',
        ariaLabel: 'Upgrade Contracts Doc Link',
        link:
          'https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/README.md#upgrade',
      },
    ],
  },
  {
    text: 'Learn More',
    ariaLabel: 'Learn More Menu',
    items: [
      {
        text: 'Agoric',
        ariaLabel: 'Agoric Homepage Link',
        link: 'https://agoric.com/',
      },
      {
        text: 'Papers',
        ariaLabel: 'Papers Page Link',
        link: 'https://agoric.com/papers/',
      },
      {
        text: 'YouTube',
        ariaLabel: 'Agoric YouTube Channel Page Link',
        link: 'https://www.youtube.com/channel/UCpY91oQLh_Lp0mitdZ5bYWg/',
      },
      {
        text: 'Github',
        ariaLabel: 'Agoric Github Link',
        link: 'https://github.com/Agoric/',
      },
    ],
  },
];
