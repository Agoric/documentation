# Agoric Documentation Contributing Guide

## Overview
Agoric [TODO: lnk] documentation is written in Markdown and built with VuePress. [TODO: link] The following guide highlights the important need-to-knows for contributing and understanding how the site is built.

## Developing
1. Clone the repo
```sh
$ git clone https://github.com/Agoric/documentation
```

1. Install dependencies
```sh
$ npm install
```

1. Build dev docs
```sh
$ npm run docs:dev
```

1. View documentation site at `localhost:8080`. Any changes triggers a hot reload.

## Structure

### Site Build
The documentation root contains the `README.md` for the repo. This is separate from the site build. `/main` contains all of the files for the documentation site.

::: tip NOTE:
Everything is nested inside `/main`. This is the base path and will render as `/`.
:::

### Homepage
`/main/README.md` is the homepage for the website. The homepage is written using the default VuePress homepage theme.

### Folders as URL Paths
VuePress applies and builds internal links using the folder structure. Every desired link must have a corresponding folder with its own `README.md`. This is what renders when navigating to that URL.

For example, if the folder structure is `/main/ertp`, whatever is in `/main/ertp/README.md` will render when navigating to `https://agoric.com/documentation/ertp`.

::: tip NOTE:
It can be odd to think about having multiple `README.md`s in a repo, and I've found it can help to think of each `README.md` as an `index.js` file. And we all know there are lots of those in a project.
:::

### Projects
Each project gets its own folder with `/api` and `/guide` subfolders. Additional subfolders can be added as needed, but should have these at a minimum.

### Configuration and navigation
All configuration is handled in `/main/.vuepress/config.js` [TODO: link].

In `config.js` we set the website title and description, as well as modifying the them.

[TODO: If configuration gets too large, look into breaking up into different files and importing into `config.js`]

#### themeConfig.nav --> `[Array]`
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
    collapsable: false,
    sidebarDepth: 2,
    children: [
      { title: 'Mint', path: '/api/mint' },
      { title: 'UnitOps', path: '/api/unitOps' }
    ]
  }
```

All `h1`, `h2`, and `h3` titles are automatically rendered in the sidebar for navigation.

**NOTE**: Completely separate sidebars can be built for different project folders if needed, allowing for additional customization. Currently we are using the same sidebar for everything.

### Writing documentation files
VuePress will automatically build search functionality from `h1`, `h2`, and `h3` headers. It is very important to follow semantic HTML and only have **ONE** `h1` per `.md` file. Care should be taken to use the right `h2` and `h3` to ensure optimal search results.
