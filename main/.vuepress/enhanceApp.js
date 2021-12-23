export default ({ router }) => {
  const redirects = [
    { path: '/wallet-api/', redirect: '/guides/wallet/' },
    { path: '/wallet-api.html', redirect: '/guides/wallet/' },
    { path: '/chainlink-integration/', redirect: '/guides/chainlink-integration/' },
    { path: '/chainlink-integration.html', redirect: '/guides/chainlink-integration/' },
    { path: '/distributed-programming/', redirect: '/guides/js-programming/' },
    { path: '/distributed-programming.html', redirect: '/guides/js-programming/' },
    { path: '/getting-started/agoric-cli-guide/', redirect: '/guides/agoric-cli/' },
    { path: '/getting-started/agoric-cli-guide.html', redirect: '/guides/agoric-cli/' },
    { path: '/guides/js-programming/ses/ses-guide.html', redirect: 'https://github.com/endojs/endo/blob/master/packages/ses/docs/guide.md' },
    { path: '/guides/js-programming/ses/ses-reference.html', redirect: 'https://github.com/endojs/endo/blob/master/packages/ses/docs/reference.md' },
    { path: '/guides/js-programming/ses/lockdown.html', redirect: 'https://github.com/endojs/endo/blob/master/packages/ses/docs/lockdown.md' },
  ];
  redirects.forEach(config => router.addRoute(config));
} 
