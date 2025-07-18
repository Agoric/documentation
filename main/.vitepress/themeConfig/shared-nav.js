/* --- SHARED NAVIGATION CONFIG --- */
// This file contains the shared navigation structure used by both navbar and sidebar
// to eliminate duplication and ensure consistency

export const sharedNavigation = [
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
        link: '/guides/orchestration/how-orch-works',
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

// Function to generate sidebar configuration with additional sidebar-specific details
export function generateSidebarConfig(baseNav) {
  return baseNav.map(section => {
    // Clone the section to avoid mutating the original
    const sidebarSection = JSON.parse(JSON.stringify(section));
    
    // Add sidebar-specific enhancements
    if (section.text === 'Build') {
      // Add expanded Build section with detailed sub-items
      sidebarSection.items = [
        {
          text: 'Getting Started',
          link: '/guides/getting-started/',
          items: [
            {
              text: 'Takeaway 1: Starting a Local Chain',
              link: '/guides/getting-started/explainer-how-to-start-a-local-chain',
            },
            {
              text: 'Takeaway 2: Deploying a Smart Contract',
              link: '/guides/getting-started/explainer-deploying-a-smart-contact',
            },
            {
              text: 'Takeaway 3: Making an Offer',
              link: '/guides/getting-started/explainer-how-to-make-an-offer',
            },
          ],
        },
        {
          text: 'Smart Contract Basics',
          link: '/guides/zoe/contract-basics',
          collapsed: true,
          items: [
            {
              text: 'Hello World Smart Contract',
              link: '/guides/zoe/contract-hello',
            },
            {
              text: 'State Smart Contract',
              link: '/guides/zoe/contract-state',
            },
            {
              text: 'Access Control Smart Contract',
              link: '/guides/zoe/contract-access-control',
            },
            {
              text: 'Complete Contract Walk-Through',
              link: '/guides/zoe/contract-walkthru',
            },
            {
              text: 'Durable Contract Details',
              link: '/guides/zoe/contract-details',
            },
            {
              text: 'Contract Upgrade',
              link: '/guides/zoe/contract-upgrade',
            },
            { text: 'Contract Governance', link: '/guides/governance/' },
          ],
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
          collapsed: true,
          items: [
            {
              text: 'Write Code to Deploy a Contract',
              link: '/guides/coreeval/proposal',
            },
            {
              text: 'Declare Required Capabilities',
              link: '/guides/coreeval/permissions',
            },
            {
              text: 'Submit Transactions',
              link: '/guides/coreeval/local-testnet',
            },
          ],
        },
        {
          text: 'Integrating with Agoric Network',
          link: '/guides/integration/chain-integration',
          collapsed: true,
          items: [
            {
              text: 'Name Services: agoricNames, namesByAddress, board',
              link: '/guides/integration/name-services',
            },
            {
              text: 'SubQuery Indexing',
              link: '/guides/subquery-indexing',
            },
          ],
        },
        {
          text: 'Agoric CLI',
          link: '/guides/agoric-cli/',
          collapsed: true,
          items: [
            { text: 'Agoric CLI Reference', link: '/guides/agoric-cli/' },
            {
              text: 'Using agd to make queries and transactions',
              link: '/guides/agoric-cli/agd-query-tx',
            },
          ],
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
          link: '/reference/ertp-api/',
          collapsed: true,
          items: [
            { text: 'ERTP API', link: '/reference/ertp-api/' },
            { text: 'Issuer Object', link: '/reference/ertp-api/issuer' },
            { text: 'Mint Object', link: '/reference/ertp-api/mint' },
            { text: 'Brand Object', link: '/reference/ertp-api/brand' },
            { text: 'Purse Object', link: '/reference/ertp-api/purse' },
            {
              text: 'Payment Object',
              link: '/reference/ertp-api/payment',
            },
            {
              text: 'AmountMath Object',
              link: '/reference/ertp-api/amount-math',
            },
            {
              text: 'ERTP Data Types',
              link: '/reference/ertp-api/ertp-data-types',
            },
          ],
        },
        {
          text: 'Zoe API',
          link: '/reference/zoe-api/',
          collapsed: true,
          items: [
            { text: 'Zoe API', link: '/reference/zoe-api/' },
            { text: 'Zoe Service', link: '/reference/zoe-api/zoe' },
            {
              text: 'UserSeat Object',
              link: '/reference/zoe-api/user-seat',
            },
            {
              text: 'Zoe Contract Facet (ZCF)',
              link: '/reference/zoe-api/zoe-contract-facet',
            },
            { text: 'ZCFSeat Object', link: '/reference/zoe-api/zcfseat' },
            { text: 'ZCFMint Object', link: '/reference/zoe-api/zcfmint' },
            {
              text: 'ZoeHelper Functions',
              link: '/reference/zoe-api/zoe-helpers',
            },
            {
              text: 'Ratio Math Functions',
              link: '/reference/zoe-api/ratio-math',
            },
            {
              text: 'Zoe Data Types',
              link: '/reference/zoe-api/zoe-data-types',
            },
          ],
        },
        {
          text: 'Example Zoe Contracts',
          ariaLabel: 'Example Zoe Contracts',
          link: '/guides/zoe/contracts/',
          collapsed: true,
          items: [
            {
              text: 'Example Zoe Contracts',
              link: '/guides/zoe/contracts/',
            },
            {
              text: 'Oracle Query Contract',
              link: '/guides/zoe/contracts/oracle',
            },
            {
              text: 'Vault Contract',
              link: '/guides/zoe/contracts/vault',
            },
            { text: 'Loan Contract', link: '/guides/zoe/contracts/loan' },
            {
              text: 'Funded Call Spread Contract',
              link: '/guides/zoe/contracts/fundedCallSpread',
            },
            {
              text: 'Priced Call Spread Contract',
              link: '/guides/zoe/contracts/pricedCallSpread',
            },
            {
              text: 'Covered Call Contract',
              link: '/guides/zoe/contracts/covered-call',
            },
            {
              text: 'OTC Desk Contract',
              link: '/guides/zoe/contracts/otc-desk',
            },
            {
              text: 'ConstantProduct AMM Contract',
              link: '/guides/zoe/contracts/constantProductAMM',
            },
            {
              text: 'Sell Items Contract',
              link: '/guides/zoe/contracts/sell-items',
            },
            {
              text: 'Atomic Swap Contract',
              link: '/guides/zoe/contracts/atomic-swap',
            },
            {
              text: 'Barter Exchange Contract',
              link: '/guides/zoe/contracts/barter-exchange',
            },
            {
              text: 'Second-Price Auction Contract',
              link: '/guides/zoe/contracts/second-price-auction',
            },
            {
              text: 'Simple Exchange Contract',
              link: '/guides/zoe/contracts/simple-exchange',
            },
            {
              text: 'Escrow To Vote Contract',
              link: '/guides/zoe/contracts/escrow-to-vote',
            },
            {
              text: 'Mint Payments Contract',
              link: '/guides/zoe/contracts/mint-payments',
            },
            {
              text: 'Mint and Sell NFTs Contract',
              link: '/guides/zoe/contracts/mint-and-sell-nfts',
            },
            {
              text: 'Use Object Contract',
              link: '/guides/zoe/contracts/use-obj-example',
            },
            {
              text: 'Automatic Refund Contract',
              link: '/guides/zoe/contracts/automatic-refund',
            },
          ],
        },
        {
          text: 'End-to-End Testing',
          ariaLabel: 'End-to-End Testing',
          link: '/e2e-testing',
        },
      ];
    }
    
    if (section.text === 'Learn') {
      // Add expanded Learn section with detailed sub-items
      sidebarSection.items = [
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
          collapsed: true,
          items: [
            {
              text: 'Amounts, Values, and Brands',
              link: '/guides/ertp/amounts',
            },
            { text: 'AmountMath', link: '/guides/ertp/amount-math' },
            {
              text: 'Issuers and  Mints',
              link: '/guides/ertp/issuers-and-mints',
            },
            {
              text: 'Purses and Payments',
              link: '/guides/ertp/purses-and-payments',
            },
          ],
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
          collapsed: true,
          items: [
            {
              text: 'PSM Contract',
              link: '/guides/zoe/actual-contracts/PSM',
            },
            {
              text: 'PriceAuthority Object',
              link: '/reference/zoe-api/price-authority',
            },
          ],
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
      ];
    }
    
    if (section.text === 'Tutorials') {
      // Add expanded Tutorials section with detailed sub-items
      sidebarSection.items = [
        {
          text: 'Tutorial: Dapp with Agoric',
          link: '/guides/getting-started/tutorial/',
        },
        {
          text: 'dapp-agoric-basics',
          link: '/guides/getting-started/tutorial-dapp-agoric-basics',
          items: [
            {
              text: 'Takeaway 1: Sell Concert Tickets Contract Overview',
              link: '/guides/getting-started/sell-concert-tickets-contract-explainer',
            },
            {
              text: 'Takeaway 2: Swaparoo Contract Overview',
              link: '/guides/getting-started/swaparoo-how-to-swap-assets-explainer',
            },
            {
              text: 'Takeaway 3: Sending Invitation Payments using an Address',
              link: '/guides/getting-started/swaparoo-making-a-payment-explainer',
            },
          ],
        },
        {
          text: 'UI Tutorial',
          link: '/guides/getting-started/ui-tutorial/',
          items: [
            {
              text: '1. Starting',
              link: '/guides/getting-started/ui-tutorial/starting',
            },
            {
              text: '2. Agoric Provider',
              link: '/guides/getting-started/ui-tutorial/agoric-provider',
            },
            {
              text: '3. Connect Wallet',
              link: '/guides/getting-started/ui-tutorial/connect-wallet',
            },
            {
              text: '4. Querying Vstorage',
              link: '/guides/getting-started/ui-tutorial/querying-vstorage',
            },
            {
              text: '5. Making an Offer',
              link: '/guides/getting-started/ui-tutorial/making-an-offer',
            },
            {
              text: '6. Conclusion',
              link: '/guides/getting-started/ui-tutorial/conclusion',
            },
          ],
        },
      ];
    }
    
    if (section.text === 'Orchestrate') {
      // Add expanded Orchestrate section with detailed sub-items
      sidebarSection.items = [
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
          link: '/guides/orchestration/contract-walkthroughs/',
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
          link: '/guides/orchestration/orchestration-basics/',
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
          link: '/guides/orchestration/how-orch-works',
        },
      ];
    }
    
    if (section.text === 'Support') {
      // Add expanded Support section with detailed sub-items
      sidebarSection.items = [
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
          text: 'Discussions (Q&A)',
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
      ];
    }
    
    return sidebarSection;
  });
}