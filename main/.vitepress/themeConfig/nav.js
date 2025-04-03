/* --- NAVBAR (top) --- */
// NOTES:
// Internal links: Must have a corresponding folder with a README.md file
// Links must be absolute with trailing slash '/guide/'
// Trailing slash implies it is looking for a .md file

export const nav = [
  {
    text: 'Orchestrate',
    collapsed: true,
    items: [
      {
        text: 'What is Agoric Orchestration?',
        link: '/guides/orchestration/',
      },
      {
        text: 'Transactional vs Portfolio',
        link: '/guides/orchestration/txvsportfolio',
      },
      {
        text: 'Key Concepts and APIs',
        link: '/guides/orchestration/key-concepts',
      },
      {
        text: 'Contract Walkthroughs',
        items: [
          {
            text: 'Send Anywhere Example',
            link: '/guides/orchestration/contract-walkthroughs/send-anywhere',
          },
          {
            text: 'Cross-Chain Unbond Example',
            link: '/guides/orchestration/contract-walkthroughs/cross-chain-unbond',
          }
        ]
      },
      {
        text: 'Example Orchestration DApp',
        items: [
          {
            text: 'Installation and Deployment',
            link: '/guides/orchestration/orchestration-basics/installation',
          },
          {
            text: 'Orca Contract walkthrough',
            link: '/guides/orchestration/orchestration-basics/contract',
          },
          {
            text: 'UI Walkthrough',
            link: '/guides/orchestration/orchestration-basics/ui',
          }
        ]
      },
      {
        text: 'How Orchestration Works',
        link: "/guides/orchestration/how-orch-works",
      }
    ]
  },
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
        text: 'UI Component Library',
        link: '/guides/UIComponentLibrary/',
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
        text: 'Agoric API Reference',
        link: 'https://agoric-sdk.pages.dev/'
      },
      {
        text: 'Endo API Reference',
        link: 'https://endojs.github.io/endo/'
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
      {
        text: 'End-to-End Testing',
        ariaLabel: 'End-to-End Testing',
        link: '/e2e-testing',
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
    text: 'Tutorials',
    items: [
      {
        text: 'Tutorial: Dapp with Agoric',
        link: '/guides/getting-started/tutorial/',
      },
      {
        text: 'dapp-agoric-basics',
        link: '/guides/getting-started/tutorial-dapp-agoric-basics',
      },
      {
        text: 'UI Tutorial',
        link: '/guides/getting-started/ui-tutorial/',
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
