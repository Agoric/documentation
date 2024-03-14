/* --- NAVBAR (top) --- */
// NOTES:
// Internal links: Must have a corresponding folder with a README.md file
// Links must be absolute with trailing slash '/guide/'
// Trailing slash implies it is looking for a .md file

module.exports = [
  {
    text: 'Learn',
    ariaLabel: 'Learn Menu',
    link: '/guides/getting-started/what-is-agoric',
  },
  {
    text: 'Build',
    ariaLabel: 'Build Menu',
    link: '/guides/build',
  },
  {
    text: 'Tutorials',
    ariaLabel: 'Tutorials Menu',
    items: [
      {
        text: 'Dapp-Offer-Up',
        ariaLabel: 'Dapp-Offer-Up Menu',
        link: '/guides/getting-started/',
      },
      {
        text: 'Dapp-Agoric-Basics',
        ariaLabel: 'Dapp-Agoric-Basics Menu',
        link: '/guides/getting-started/',
      },
      {
        text: 'Dapp-Orchestration',
        ariaLabel: 'Dapp-Orchestration Menu',
        link: '/guides/getting-started/',
      },
    ],
  },
   {
    text: 'Support',
    ariaLabel: 'Support Menu',
    items: [
      {
        text: 'Office Hours',
        ariaLabel: 'Office Hours Menu',
        link: 'https://github.com/Agoric/agoric-sdk/wiki/Office-Hours',
      },
      {
        text: 'Discord',
        ariaLabel: 'Discord Menu',
        link: 'https://discord.gg/agoric-585576150827532298?event=1216574999096328352',
      },
      {
        text: 'X',
        ariaLabel: 'X Menu',
        link: 'https://twitter.com/agoric',
      },
    ],
  },
];

