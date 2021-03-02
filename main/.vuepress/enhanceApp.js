export default ({ router }) => {
  router.addRoutes([
    { path: '/main/wallet-api.md', redirect: '/main/guides/wallet/' },
    { path: '/main/chainlink-integration.md', redirect: '/main/guides/chainlink-integration.md' },
    { path: '/main/distributed-programming.md', redirect: '/main/guides/js-programming/' },
    { path: '/main/getting-started/agoric-cli-guide.md', redirect: '/main/guides/agoric-cli/' },
  ])
} 
