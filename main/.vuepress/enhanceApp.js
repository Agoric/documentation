function isRouteExists(router, path) {
  const pathLower = path.toLowerCase();
  return router.options.routes.some(
    route => route.path.toLowerCase() === pathLower,
  );
}

// Extracted from https://github.com/vuejs/vuepress/issues/3142
function patchRoutesToPreserveFragments(router) {
  router.beforeHooks = [];
  router.beforeEach((to, from, next) => {
    if (isRouteExists(router, to.path)) {
      next();
    } else if (!/(\/|\.html)$/.test(to.path)) {
      const endingSlashUrl = `${to.path}/`;
      const endingHtmlUrl = `${to.path}.html`;
      if (isRouteExists(router, endingHtmlUrl)) {
        next({
          ...to,
          path: endingHtmlUrl,
        });
      } else if (isRouteExists(router, endingSlashUrl)) {
        next({
          ...to,
          path: endingSlashUrl,
        });
      } else {
        next();
      }
    } else if (/\/$/.test(to.path)) {
      const endingHtmlUrl = `${to.path.replace(/\/$/, '')}.html`;
      if (isRouteExists(router, endingHtmlUrl)) {
        next({
          ...to,
          path: endingHtmlUrl,
        });
      } else {
        next();
      }
    } else {
      next();
    }
  });
}

export default ({ router }) => {
  patchRoutesToPreserveFragments(router);
  // The router assumes everything is site-local, so manually implement external redirection
  // to avoid Not Found URLs like 'https://docs.agoric.com/https:/github.com/...'.
  // cf. https://github.com/vuejs/vue-router/issues/1280 and
  // https://stackoverflow.com/questions/62254666/use-vue-router-for-redirecting-to-absolute-path
  const makeExternalRedirect = target => {
    const externalRedirect = () => {
      location.assign(target);
    };
    return externalRedirect;
  };
  const redirects = [
    { path: '/chainlink-integration.html', redirect: '/guides/chainlink-integration/' },
    { path: '/chainlink-integration/', redirect: '/guides/chainlink-integration/' },
    { path: '/dapps/', redirect: '/guides/dapps/' },
    { path: '/distributed-programming.html', redirect: '/guides/js-programming/' },
    { path: '/distributed-programming/', redirect: '/guides/js-programming/' },
    { path: '/ertp/api/', redirect: '/reference/ertp-api/' },
    { path: '/ertp/api/issuer.html', redirect: '/reference/ertp-api/issuer.html' },
    { path: '/ertp/guide/', redirect: '/guides/ertp/' },
    { path: '/ertp/guide/amounts.html', redirect: '/guides/ertp/amounts.html' },
    { path: '/getting-started/agoric-cli-guide.html', redirect: '/guides/agoric-cli/' },
    { path: '/getting-started/agoric-cli-guide/', redirect: '/guides/agoric-cli/' },
    { path: '/getting-started/before-using-agoric.html', redirect: '/guides/getting-started/' },
    { path: '/getting-started/beta.html', redirect: '/guides/getting-started/' },
    { path: '/getting-started/intro-zoe.html', redirect: '/guides/zoe/offer-enforcement.html' },
    { path: '/getting-started/start-a-project.html', redirect: '/guides/getting-started/start-a-project.html' },
    { path: '/guides/agoric-cli/commands.html', redirect: '/guides/agoric-cli/' },
    { path: '/guides/js-programming/ses/lockdown.html', redirect: makeExternalRedirect('https://github.com/endojs/endo/blob/master/packages/ses/docs/lockdown.md') },
    { path: '/guides/js-programming/ses/ses-guide.html', redirect: makeExternalRedirect('https://github.com/endojs/endo/blob/master/packages/ses/docs/guide.md') },
    { path: '/guides/js-programming/ses/ses-reference.html', redirect: makeExternalRedirect('https://github.com/endojs/endo/blob/master/packages/ses/docs/reference.md') },
    { path: '/guides/wallet/api.html', redirect: '/reference/wallet-api.html' },
    { path: '/platform/', redirect: '/guides/platform/' },
    { path: '/repl/', redirect: '/reference/repl/' },
    { path: '/repl/timerServices.html', redirect: '/reference/repl/timerServices.html' },
    { path: '/wallet-api.html', redirect: '/guides/wallet/' },
    { path: '/wallet-api/', redirect: '/guides/wallet/' },
    { path: '/zoe/api/', redirect: '/reference/zoe-api/' },
    { path: '/zoe/api/zoe.html', redirect: '/reference/zoe-api/zoe.html' },
    { path: '/zoe/guide/', redirect: '/guides/zoe/' },
    { path: '/zoe/guide/contracts/', redirect: '/guides/zoe/contracts/' },
    { path: '/zoe/guide/contracts/oracle.html', redirect: '/guides/zoe/contracts/oracle.html' },
    { path: '/zoe/guide/offer-safety.html', redirect: '/guides/zoe/offer-safety.html' },
  ];
  redirects.forEach(config => router.addRoute(config));
} 
