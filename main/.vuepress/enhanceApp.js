export default ({ router }) => {
  router.addRoutes([
    { path: '/wallet-api/', redirect: '/guides/wallet/' },
    { path: '/wallet-api.html', redirect: '/guides/wallet/' },
    { path: '/chainlink-integration/', redirect: '/guides/chainlink-integration/' },
    { path: '/chainlink-integration.html', redirect: '/guides/chainlink-integration/' },
    { path: '/distributed-programming/', redirect: '/guides/js-programming/' },
    { path: '/distributed-programming.html', redirect: '/guides/js-programming/' },
    { path: '/getting-started/agoric-cli-guide/', redirect: '/guides/agoric-cli/' },
    { path: '/getting-started/agoric-cli-guide.html', redirect: '/guides/agoric-cli/' },
  ])
} 
