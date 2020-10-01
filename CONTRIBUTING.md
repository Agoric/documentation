# Contributing to Agoric's Documentation Repo

Agoric's public-facing technical documentation is mostly in the [Agoric Documentation](../documentation) GitHub repo.
(The complete documentation set also includes some external items such as papers, presentations, videos, etc.). The simple
version of document processing is that docs are written in Markdown, with most image files in `.svg` format and also stored in 
the Documentation repo. Some processing is done when a file in the repo is committed. When a Pull Request is merged with the
master branch, [VuePress](https://vuepress.vuejs.org/guide/#how-it-works) automatically processes any new or 
changed files. The processed files are displayed in the [Agoric website's
Documentation Section](https://agoric.com/documentation/getting-started/alpha.html)

This doc explains:
- The overall documentation structure.
- Our preferred way of writing links.
- How to import code snippets into docs.
- What happens when you make a commit.
- How to build and run a local doc server for testing.
- How to edit the top menubar and sidebars of the Agoric documentation site.

## Structure

### Root Directory and Homepage

`/main` is the root directory for all files for the documentation site. It is the base path and renders as `/`.
`/main/README.md/` is the README file for the Agoric Documentation repo, and the homepage for the documentation
section of the Agoric website. The homepage uses the default VuePress homepage theme.

### Folders and Projects

Each project gets its own folder, often with `/api` and `/guide` subfolders as warranted. For example, we have `/main/ertp/api/` and `/main/ertp/guide/` as
well as `/main/zoe/api/` and `/main/zoe/guide/`. Projects can have additional subfolders as needed. 

Each folder should have its own `README.md`, which is an effective `index.js` equivalent in terms of rendering when someone navigates to
the folder's URL. For example, navigating to `https://agoric.com/documentation/ertp` displays the VuePress processed `/main/ertp/README.md`.
While it may seem odd, VuePress expects multiple `README.md` files in a repo, one each for most folders in it.

Images, diagrams, and similar content-supporting files should go in an `assets` subfolder under the appropriate project folder.
For example, if you have a `process.svg` image file with a diagram for an page in the Zoe Guide about Invitations, it's path should look
like `main/zoe/guide/assets/process.svg` and it would appear via an image link in the page rendered from `main/zoe/guide/invitations.md`.
Note that `assets` should store all the auxillary files to its parent folder. You don't make an `assets` folder or similar for
individual files/pages.

### Sectioning Pages

VuePress automatically builds search functionality and individual page menus from `h1`, `h2`, and `h3` headers (i.e Markdown's `#`, `##`, and `###` commands). 
You must have only **ONE** `h1` per `.md` file. Be careful not to have too many `h2` and `h3` level headers on one page.

## Github Actions and Continuous Integration

On every pull request and on every commit to master, the following
Github Actions run:

* Test the build - This tests that the build does not have any errors and
  that the result passes HTML5 validation
* Spellcheck - This checks the Markdown documents against a dictionary
  and a local wordlist
* Lint and Test Snippets - This tests the code snippets that are
  imported into the documentation. Note that code included inline does
  not get tested or run. 

## Spellcheck

This is currently only available in Github Actions on Pull Requests.
Any words that do not pass spell check will be shown in the logs of
the Github Action. Please either fix the words or add them to the list
in `Agoric/documentation/.wordlist.txt`. Please maintain the list's alphabetical order when entering new words for the convenience of future maintainers.

![](./contributing-assets/spellcheck-results.png)

## Importing and testing snippets

To import code snippets into the documentation, you can write up the
code in a separate file under `snippets/`, then include it by adding a
line like `<<< @/snippets/test-intro-zoe.js#install` to your document.
The section `test-intro-zoe.js` should be replaced with your
particular filename. `#install` is an example of a specific code
region in the file to import. For example, it might look like:

```js
  // #region install
  const atomicSwapInstallation = await E(zoe).install(atomicSwapBundle);
  // #endregion install
```

Write tests using AVA, and then run them with `yarn test`. The code
files can also be linted with `yarn lint-fix`. Testing code snippets
allows us to ensure that our documents are using real code that works
with the current version of agoric-sdk (whatever is on master) and is
not outdated.

## Check Links

To check internal Vuepress links locally, run the following shell command. It does *not* check either external links or router-links. Output consists of the text of any broken links, what file they're in, and what line number they occur on.

```shell
yarn check-links
```

Links should be relative and in [this format](https://vuepressbook.com/tutorial/tutorial2.html#linking-to-headers-inside-a-file).

## Install
Run `agoric install` to ensure that we are using the latest version of
agoric-sdk when we run our code snippets.

## Build Locally

To run a local server to see the changes in real time, run:

```shell
yarn docs:dev
```

Note that changes to the site config may require stopping this program
and restarting.

To build the site as it will be built for production, run:

```shell
yarn docs:build
```

## Site Menus

### Configuration and navigation
All configuration is handled in `[/main/.vuepress/config.js](/.vuepress/config.js)`. Here you can:
- Set and modify the website title and description.
- Configure the top navigation bar.
- Configure the various sidebar menus

#### themeConfig.nav --> `[Array]`
Go to `[main/.vuepress/themeConfig/nav.js](/.vuepress/themeConfig/nav.js)` to configure the top
navigation bar. `/main/.vuepress/config.js`, the overall VuePress configuration file, imports `nav.js`.

Below is an abridged configuration of the top navigation bar showing an array of only two entries.
Each entry is an object with three properties:
- `text`: The text shown in the nav bar.
- `ariaLabel`: Labels this page element. Used to access it if the text is not visible.
- `items`: An array of submenu item objects, each of which is a single submenu item of its parent navbar item.
```js
module.exports = [
  {
    text: 'Getting Started',
    ariaLabel: 'Getting Started Menu',
    items: [
      {
        // Submenu item
      },
      {
        // Submenu item
      }
    ]
  },     
  {
    text: 'Learn More',
    ariaLabel: 'Learn More Menu',
    items: [
      {
        // Submenu item
      },      
      {
        // Submenu item
      }
    ]
  },  
]
```

This is an abridged configuration of the **ERTP** entry and its submenu:
```js
{
    text: 'ERTP', // spaces to add some distance to next link
    ariaLabel: 'ERTP Menu',
    link: '/ertp/guide/',
    items: [
       {
        text: 'Introduction',
        ariaLabel: 'ERTP Introduction Link',
        link: '/getting-started/ertp-introduction/',
      },
     {
        text: 'Guide',
        ariaLabel: 'ERTP Guide Link',
        link: '/ertp/guide/'
      },
      {
        text: 'API',
        ariaLabel: 'ERTP API Link',
        link: '/ertp/api/'
      },
    ]
  }
```

This is where the top navigation bar is configured. An additional link can be added by adding a new Object with `text` (display text) and `link` (where the link should go) properties. Internal site links must be absolute with a trailing slash: `/zoe/guide/`.

#### themeConfig.sidebar --> `[Object]`
This is where the sidebar is configured.

There are multiple ways to write a link, with the simplest way as `[path]`, with the title being automatically pulled from the header.

We should prefer the long form of writing links using an Object with `{ title, path }`, as it is more explicit and allows us to more easily add additional properties.

If we are using child routes, we must use the Object form as child routes are specified under the `children` property.

```js
'/api/': [
  {
    title: 'API',
    path: '/api/',
    collapsible: false,
    sidebarDepth: 2,
    children: [
      { title: 'Mint', path: '/api/mint' },
      { title: 'UnitOps', path: '/api/unitOps' }
    ]
  }
```

All `h1`, `h2`, and `h3` titles are automatically rendered in the sidebar for navigation.

**NOTE**: Completely separate sidebars can be built for different project folders if needed, allowing for additional customization. Currently we are using the same sidebar for everything.

