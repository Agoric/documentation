const nav = require("./themeConfig/nav");

module.exports = {
  /* --- FOR DEPLOYMENT TO GITHUB PAGES--- */
  base: "/", // The base URL the site will be deployed at.
  /* --- HOME PAGE --- */
  title: "Documentation", // title for the site. prefix for all page titles and displayed in the navbar
  description: "Build, deploy and operate dApps and DeFi markets.", // desc for the site; rendered as a <meta> tag in the page HTML
  // Extra tags to inject into the page HTML <head>. You can specify each tag in the form of [tagName, { attrName: attrValue }, innerHTML?].
  head: [
    [
      "meta",
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    ["link", { rel: "icon", href: "/favicon-full.ico" }],
    [
      "style",
      { type: "text/css" },
      `
    .two-col-table td {
        width: 50%;
    }
    .two-col-table table {
        table-layout: fixed;
    }
    a[href^='#'] {
        font-style: italic;
    }`,
    ],
    [
      "script",
      {
        src: "https://www.googletagmanager.com/gtag/js?id=UA-118217811-1",
        async: "",
      },
    ],
    [
      "script",
      {},
      "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-118217811-1'); ",
    ],
    [
      "script",
      {},
      `
    /** @type {Map<[...anySelectors: string[]], (elems: (Element | null)[]) => unknown>} */
    const fixups = new Map();

    // Update the "home" link to target agoric.com while intercepting clicks
    // such that those outside of its image continue routing to the root of
    // the documentation site.
    fixups.set(['.home-link', '.logo'], ([homeEl, logoEl]) => {
      if (homeEl) {
        homeEl.setAttribute('href', 'https://agoric.com');
        homeEl.setAttribute('onclick', 'return false;');
      }
      if (logoEl) {
        logoEl.setAttribute('onclick', "document.location='https://agoric.com';return false;");
      }
    });

    if (location.hash && location.hash !== '#') {
      // Once content has loaded, re-navigate to the page target
      // without triggering interfering router/history/scroll logic.
      const hash = location.hash;
      fixups.set(['main'], _elems => {
        const stopPropagation = evt => {
          evt.stopImmediatePropagation();

          const props = {};
          const proto = Object.getPrototypeOf(evt);
          const propSource = proto === Event.prototype ? {} : proto;
          for (const name of Object.getOwnPropertyNames(propSource)) {
            if (name !== 'constructor') props[name] = evt[name];
          }
          console.log('suppress', evt.type, { __proto__: evt, ...props });
        };
        const stopEvents = types => {
          const restorers = types.map(type => {
            window.addEventListener(type, stopPropagation, true);
            return () => window.removeEventListener(type, stopPropagation, true);
          });
          const passEvents = () => {
            // Run and drop references to all restore functions.
            while (restorers.length > 0) restorers.pop()();
          };
          return passEvents;
        };

        // Navigate to the page itself as a blank slate.
        const passStateEvents = stopEvents(['hashchange', 'popstate']);
        const passScrollEvents = stopEvents(['scroll']);
        location.replace('#');

        // Restore state-change events, then navigate back to the target.
        passStateEvents();
        try {
          const target = document.getElementById(decodeURIComponent(hash.slice(1)));
          if (target && target.innerHTML.trim() === '') {
            document.documentElement.classList.add('scrollingToTarget');
            target.scrollIntoView({ behavior: 'instant' });
            document.documentElement.classList.remove('scrollingToTarget');
          }
        } catch (err) {
          console.warn(err);
        }
        location.replace(hash);

        // Restore scroll events and create a new history entry to be overridden
        // if the initial target lacks a TOC entry to highlight.
        passScrollEvents();
        history.pushState(null, '', hash);
      });
    }

    // Poll until all fixups trigger by matching at least one element.
    const fixupInterval = setInterval(function() {
      for (const [selectors, fixup] of fixups) {
        const elems = selectors.map(sel => document.querySelector(sel));
        if (elems.some(el => el)) {
          // console.log('fixup', selectors);
          fixups.delete(selectors);
          Promise.resolve(elems).then(fixup);
        }
      }
      if (!fixups.size) {
        clearInterval(fixupInterval);
        // console.log('fixups are done');
      }
    }, 500);
    `,
    ],
  ],

  plugins: [
    "check-md",
    [
      "@vuepress/last-updated",
      {
        dateOptions: {
          dateStyle: "medium",
          timeStyle: "long",
          timeZone: "Etc/UTC",
        },
      },
    ],
  ],

  /* --- DEFAULT THEME CONFIG --- */
  themeConfig: {
    sidebarDepth: 1,
    lastUpdated: "Last Updated",
    logo: "/logo.svg",
    /* --- NAVBAR (top) --- */
    nav,
    /* --- SIDEBAR --- */
    // This configuration displays different sidebars for different sections of
    // content. Pages must be organized into directories for each desired
    // section

    // NOTES:
    // Internal links: Must have a corresponding folder with a README.md file
    // Links must be absolute with trailing slash '/guide/'
    // Trailing slash implies it is looking for a .md file
    sidebar: {
      "/guides/": [
        {
          title: "Introduction",
          path: "/guides/getting-started",
          collapsible: true,
          children: [
            "/guides/getting-started/what-is-agoric.html", // What is Agoric?
            "/guides/wallet/", // Smart Wallet Dapp Architecture
            "/guides/getting-started/deploying.html", // - Deploying Smart Contracts
            "/guides/zoe/contract-basics.html", // - Smart Contract Basics
            "/guides/zoe/", // - Zoe Overview
          ],
        },
        {
          title: "Beginner",
          path: "/guides/getting-started",
          collapsible: true,
          children: [
            "/guides/wallet/", // JavaScript Framework
            "/guides/ertp/", // ERTP
            "/guides/ertp/amounts.html", // - Amounts, Values, and Brands
            "/guides/ertp/amount-math.html", // - AmountMath
            "/guides/ertp/issuers-and-mints.html", // - Issuers and Mints
            "/guides/ertp/purses-and-payments.html", // - Purses and Payments
          ],
        },
        {
          title: "Advanced",
          path: "/guides/getting-started",
          collapsible: true,
          children: [
            "/guides/platform/", // Agoric Platform
          ],
        },
      ],
      "/reference/": [
        {
          title: "How to Build a Client UI",
          path: "/guides/coreeval/",
          collapsible: true,
          children: [
            "/guides/ertp/amounts.html", // - test, delete me
          ],
        },

        {
            title: "Permissioned Deployments",
            path: "/guides/coreeval/",
            collapsible: true,
            children: [],
          },         

          {
            title: "Testing",
            path: "/",
            collapsible: true,
            children: [],
          },          

          {
            title: "Debugging",
            path: "/",
            collapsible: true,
            children: [],
          },          

          {
            title: "Agoric CLI",
            path: "/guides/agoric-cli/",
            collapsible: true,
            children: [],
          },          

          {
            title: "API Reference",
            path: "/",
            collapsible: true,
            children: [],
          },  

      ],
    },
    docsRepo: "Agoric/documentation",
    // if your docs are not at the root of the repo:
    docsDir: "main",
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: "main",
    // defaults to false, set to true to enable
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: "Help us improve this page!",

    zoeVersion: "v0.24.0",
    zoeDocsUpdated: "August 25, 2022",

    /* --- SEARCH --- */
    // Comes with built-in search functionality which builds its index from the
    // h1, h2, and h3 headers
    // Disable search by uncommenting the following line:
    // search: false
    // Customize how many suggestions will be shown with:
    // searchMaxSuggestions: <numberOfSuggestions>
  },
};
