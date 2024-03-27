/* --- NAVBAR (top) --- */
// NOTES:
// Internal links: Must have a corresponding folder with a README.md file
// Links must be absolute with trailing slash '/guide/'
// Trailing slash implies it is looking for a .md file

export const nav = [
  {
    text: 'Build',
    items: [
      {
        text: 'Getting Started',
        link: '/guides/getting-started/',
      },
      {
        text: 'Smart Contract Basics',
        link: '/guides/zoe/contract-basics',
      },
      {
        text: 'Building Client Dapps',
        link: '/guides/getting-started/contract-rpc',
      },
      {
        text: 'Permissioned Contract Deployment',
        ariaLabel: 'Permissioned Contract Deployment',
        link: '/guides/coreeval/',
      },
      {
        text: 'Integrating with Agoric Network',
        link: '/guides/integration/chain-integration',
      },
      {
        text: 'Agoric CLI',
        ariaLabel: 'Agoric CLI',
        link: '/guides/agoric-cli/',
      },
      {
        text: 'ERTP API',
        ariaLabel: 'ERTP API Menu',
        link: '/reference/ertp-api/',
      },
      {
        text: 'Zoe API',
        ariaLabel: 'ZOE API Menu',
        link: '/reference/zoe-api/',
      },
      {
        text: 'Example Zoe Contracts',
        ariaLabel: 'Example Zoe Contracts',
        link: '/guides/zoe/contracts/',
      },
    ],
  },

  {
    text: 'Learn',
    items: [
      {
        text: 'What is Agoric?',
        link: '/what-is-agoric',
      },
      {
        text: 'Agoric Platform',
        link: '/guides/platform/',
        collapsed: true,
        items: [],
      },

      {
        text: 'Zoe Smart Contract Framework',
        link: '/guides/zoe/',
      },
      {
        text: 'ERTP',
        ariaLabel: 'ERTP',
        link: '/guides/ertp/',
      },
      {
        text: 'JavaScript Framework',
        ariaLabel: 'JavaScript Framework',
        link: '/guides/js-programming/',
      },
      {
        text: 'Deployed Zoe Contracts',
        ariaLabel: 'Deployed Zoe Contracts',
        link: '/guides/zoe/actual-contracts/',
      },
      {
        text: 'Glossary',
        ariaLabel: 'Glossary Menu',
        link: '/glossary/',
      },
      {
        text: 'Papers',
        ariaLabel: 'Papers Page Link',
        link: 'https://agoric.com/papers/',
      },
    ],
  },
  {
    text: 'Support',
    items: [
      {
        text: 'Agoric',
        ariaLabel: 'Agoric Homepage Link',
        link: 'https://agoric.com/',
      },
      {
        text: 'Discord',
        link: 'https://agoric.com/discord',
      },
      {
        text: 'Github Discussions (Q&A)',
        link: 'https://github.com/Agoric/agoric-sdk/discussions',
      },
      {
        text: 'Office Hours',
        link: 'https://github.com/Agoric/agoric-sdk/wiki/Office-Hours',
      },
      {
        text: 'Twitter',
        link: 'https://twitter.com/agoric',
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
