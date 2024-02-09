// XXX
// vitepress does not seem to expose the vue router directly, so we'll
// have to refactor this. some redirects are working in themeConfig/rewrites.js

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

const isPathPrefix = (prefix, fullPath) => {
  const trimmedPrefix = prefix.replace(/\/+$/, '');
  if (!fullPath.startsWith(trimmedPrefix)) {
    return false;
  }
  if (fullPath.length === prefix.length || fullPath[trimmedPrefix.length] === '/') {
    return true;
  }
  // As a special case, allow /path/to/resource to match /path/to/resource.html
  return fullPath.slice(prefix.length).toLowerCase() === '.html';
};

export default ({ router }) => {
  patchRoutesToPreserveFragments(router);

  const redirects = [
    { path: '/chainlink-integration', redirect: '/guides/chainlink-integration/' },
    { path: '/dapps', redirect: '/guides/dapps/' },
    { path: '/distributed-programming', redirect: '/guides/js-programming/' },
    { path: '/ertp/api', redirect: '/reference/ertp-api/' },
    { path: '/ertp/guide', redirect: '/guides/ertp/' },
    { path: '/getting-started/agoric-cli-guide', redirect: '/guides/agoric-cli/' },
    { path: '/getting-started/before-using-agoric', redirect: '/guides/getting-started/' },
    { path: '/getting-started/beta', redirect: '/guides/getting-started/' },
    { path: '/getting-started/intro-zoe', redirect: '/guides/zoe/offer-enforcement/' },
    { path: '/getting-started/start-a-project', redirect: '/guides/getting-started/start-a-project/' },
    { path: '/guides/agoric-cli/commands', redirect: '/guides/agoric-cli/' },
    { path: '/guides/js-programming/ses/lockdown', redirect: makeExternalRedirect('https://github.com/endojs/endo/blob/master/packages/ses/docs/lockdown.md') },
    { path: '/guides/js-programming/ses/ses-guide', redirect: makeExternalRedirect('https://github.com/endojs/endo/blob/master/packages/ses/docs/guide.md') },
    { path: '/guides/js-programming/ses/ses-reference', redirect: makeExternalRedirect('https://github.com/endojs/endo/blob/master/packages/ses/docs/reference.md') },
    { path: '/guides/wallet/api', redirect: '/reference/wallet-api/' },
    { path: '/platform', redirect: '/guides/platform/' },
    { path: '/repl', redirect: '/reference/repl/' },
    { path: '/wallet-api', redirect: '/guides/wallet/' },
    { path: '/zoe/api', redirect: '/reference/zoe-api/' },
    { path: '/zoe/guide', redirect: '/guides/zoe/' },
  ].map(redirect => ({ ...redirect, path: redirect.path.replace(/\.html$/i, '') }));

  // Define exact-match redirect routes.
  redirects.forEach(redirect => {
    router.addRoute(redirect);
  });

  // Also redirect subpaths.
  router.beforeEach((to, from, next) => {
    const done = (...args) => { next(...args); };
    const target = to.path;
    const prefixRedirects = redirects.filter(redirect => isPathPrefix(redirect.path, target));
    if (prefixRedirects.length === 0) {
      // There is no covering redirect.
      return done();
    } else if (prefixRedirects.some(redirect => redirect.path === target)) {
      // There is an exact-match covering redirect.
      return done();
    }
    // Apply the longest-path covering redirect.
    prefixRedirects.sort((a, b) => b.path.length - a.path.length);
    const match = prefixRedirects[0];
    if (!target.startsWith(match.path)) {
      console.error('unexpected covering redirect', { to, redirect });
      return done();
    }
    if (typeof match.redirect === 'function') {
      return done(match.redirect(to));
    }
    const trimmedPrefix = match.path.replace(/\/+$/, '');
    const trimmedReplacementPrefix = match.redirect.replace(/\/+$/, '');
    const targetSuffix = target.slice(trimmedPrefix.length).replace(/\.html$/i, '/');
    const newPath = trimmedReplacementPrefix + targetSuffix;
    return done({ ...to, path: newPath });
  });
}
