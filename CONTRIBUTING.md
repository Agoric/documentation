# Contributing to Agoric's Documentation Repo

Agoric's public-facing technical documentation is mostly in the [Agoric Documentation](../documentation) GitHub repo.
The complete documentation set also includes external items such as papers, presentations, videos, etc. Our document
process is:
1. Write docs in the repo in Markdown. Image files are usually in `.svg` format and also stored in the repo. 
2. Before doing a Pull Request, check your changed docs in a local copy of the repo and local documentation 
   server. Includes link checking and (for now) spellchecking. 
3. Have the changed docs reviewed and approved by others.
4. Pull Request merges with the Master branch automatically run tests on their committed files.
5. [VuePress](https://vuepress.vuejs.org/guide/#how-it-works) automatically 
   processes any new or changed files for display. 
6. The [Agoric website's Documentation Section](https://agoric.com/documentation/getting-started/alpha.html) displays
   the VuePress processed files, which have been converted to HTML.

This doc explains:
- The overall documentation structure.
- Our preferred way of writing links.
- How to import code snippets into docs.
- What happens when you make a PR merge with Master.
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
the folder's URL. See the next section for how what VuePress expects from and does to READMEs. 

Images, diagrams, and similar content-supporting files should go in an `assets` subfolder under the appropriate project folder.
For example, if you have a `process.svg` image file with a diagram for the Zoe Guide's Invitations page, its path should look
like `main/zoe/guide/assets/process.svg` and it would appear via an image link of `./assets/process.svg` in the page 
rendered from `main/zoe/guide/invitations.md`. 

Note that `assets` should store all the auxillary files for the files in its parent folder. You don't make an `assets` folder
or similar for individual files/pages.

### README files

VuePress converts Markdown files to same named HTML file. `README.md` files are an exception; they're 
renamed `index.html`, since that's how web servers find a website's root file. Navigating 
to `https://agoric.com/documentation/ertp/guide/` displays the VuePress processed `/main/ertp/guide/README.md`.
While it may seem odd, VuePress expects multiple `README.md` files in a repo, one each for most folders in it.

The root README.md file must start with a header. Any of H1, H2, or H3 (`#`, `##`, or `###` in Markdown) will do.
This is needed to generate search indexes and sidebars.

A subdirectory is invisible to VuePress unless it has a `README.md`. Empty `README.md` files are acceptable.

Lines with no special treatment are converted into standard HTML paragraph tags.

### Sectioning Pages

VuePress automatically builds search functionality and individual page menus from `h1`, `h2`, and `h3` headers (i.e Markdown's `#`, `##`, and `###` commands). 
You must have only **one** `h1` per `.md` file. Be careful not to have too many `h2` and `h3` level headers on one page.

## Writing Links

VuePress turns Markdown links into HTML links. There are some quirks about how you should write Markdown links.

First, our link checker does **not** check `router-link` style links. Please only use Markdown style links.

Next, your Markdown links should be to the `.md` Markdown files in the Doc repo. VuePress processing will change
both the `.md` files and links to them to be `.html`.

Use relative links instead of absolute ones for any links to files or folders in the Documentation repo. Relative links
open in the same browser tab when clicked on, absolute links open a new tab. 

Use this trick to make writing relative links easier. While it's easy enough to, say, write a relative link to something in
the same folder as the file you're writing (something like `(./assets/my-diagram.svg)` to include an image), it can be
tricky to remember/figure out what the right syntax is for linking to a file two folders up, in a different upper folder, and then
two levels down from there on a different branch of the file structure. 

Instead, `main` is considered the top of the file hierarchy. So you can always get to, say, a Glossary entry 
by just linking to `(/glossary/#allocation)`; its path relative to `main`. Any path starting with just `/` is considered
to start at `main`.

VuePress turns every header in a Markdown file to a named file location you can link to so clicking take you directly to
that file location. At the end of the link, append a `#` to the file name, followed by the header text. The header text
must be altered to be 1) all lower case. 2) All punctuation and spaces are replaced by hyphens (except there aren't any
trailing hyphens at the end)

So, for example, the header `E(zoe).getBrands(instance)` is linked to by `zoe.md#e-zoe-getbrands-instance` (note the last `)` was
not turned into a hyphen) and the header
`Contract and Contract Instance` by `glossary/#contract-and-contract-instance`. Note that no specific file is specified in
the latter, as it defaults to the `glossary` folder's `README.md` file

## Github Actions and Continuous Integration

These GitHub Actions run on every pull request and commit to master:

- Test the build
  - Tests for build errors and does HTML5 validation. 
- Lint and Test Snippets
  - Tests the imported code snippets. Code included inline is **not** tested or run.
- Spellcheck - **Does not work yet. Until finished, please check your docs in an external spellchecker before merging.**
  - Checks Markdown files against a dictionary and a local wordlist. 

### Spellcheck

**Does not work yet. Until finished, please check your docs in an external spellchecker before merging.**

This is currently only available in Github Actions on Pull Requests.
Any words that do fail spell check are shown in the logs of
the Github Action. Please either fix the words or add them to the list
in `Agoric/documentation/.wordlist.txt`. When entering new words, please keep the list 
in alphabetical order for the convenience of future maintainers.

![](./contributing-assets/spellcheck-results.png)

### Importing and testing code snippets

**tyg todo: Note: There was a lot of this that I found possibly ambiguous. I've tried
to specify a few more things to make it clearer, but you should probably review
this section carefully make sure my interpretations are correct or not**

Code snippets are not short inline code bits like `const x = 2 + 2;`. Or 
code blocks denoted in Markdown by starting with a line consisting of three backquotes with 
`js` appended and ending with a line consisting of three backquotes. 

Rather, code snippets are actual development or test code from the Agoric-SDK repo,
or code held to a similar standard of correctness. They should pass `lint` and run with no
errors. This ensures our documents use real code that works
with the current agoric-sdk version (whatever is on master) and is
not outdated. **tyg todo: I'm not quite seeing this guaranteeing things,
since we're not extracting the code directly from agoric-sdk. It'd seem
if we don't check and manually update the snippets file after each upgrade, we risk
falling out of sync with the agoric-sdk repo.**

To import code snippets into the documentation, create a file
under `Agoric/documentation/snippets/`. **tyg todo: It appears there should be only one 
snippets folder for the whole doc repo?** Put your code in the new file.
Remember, it must be able to run without errors. 

You can make an entire code file, or any part of it, into a snippet (each
of which can be used multiple times in the docs). Just surround the part
you want to be a snippet with `#region` and `#endregion` comments:
```js
// #region regionName
...
// #endregion regionName
```
`regionName` in the above is any name you want to give this snippet.

If you want the whole file to be a snippet, just put the `#region` / `#endregion`
pair at the start and end of the file. You can define any number of snippet
regions in a file, including defining one region inside of another. Just be sure to give
all the ones in a file different names. **tyg todo: Is this all right?**

To include a defined snippet in a Markdown file, put a
line like `<<< @/snippets/test-intro-zoe.js#install` in it..
Replace the `test-intro-zoe.js` with the filename in the snippets file.
Replace the `install` with the name of the region you want included from
the file. 

To test your snippets files:
1. Write tests using AVA.
2. Run the tests with `yarn test`. **tyg todo: (Do all the tests have to be in the snippets directory? And do you run `yarn test` from there?)**
3. Lint the files with `yarn lint-fix` **tyg todo: See above re: what directory you run this from**

**tyg todo: If they're being tested and linted during the merge to master, is this just how you personally test things during 
development?**

### Check Links

To check internal Vuepress links locally, run the shell command `yarn check-links` **tyg todo: From where?**
Note this does **not** check either external links or router-links. Output is the text of any 
broken links, and what file and line number they're at.

## Local Install, Build, and Run

1. Clone the Documentation repo to your local machine. We suggest using 
Sourcetree to manage your local and remote copies and the various commits
and pull requests you'll make while debugging.

2. **Install**: To ensure using the latest agoric-sdk 
version when running code snippets, from a shell, run
```shell
agoric install
```
3. **Build**: To build the site as it will be built for production, run:
```shell
yarn docs:build
```
4. **Run**: To run a local server and see your changes in real time, run:
```shell
yarn docs:dev
```
Note that site config changes may require stopping and restarting this program.

View your local documentation site at `localhost:8080/documentation/`

## Editing Site Menus

VuePress processing adds a top menubar to all Documentation site pages. When viewing a doc in an
overall grouping, such as Zoe docs or Getting Started docs, VuePress adds a specified sidebar menu of
other docs in that grouping. This section describes how to edit the top menubar and sidebar menus.

**Note**: We do not know how to specify which sidebar menu to display if a document is in
multiple groups. While a doc can be in more than one sidebar menu, it can only display one fixed
sidebar menu.

For example, "Introduction to Zoe" appears in two sidebar menus. One for Zoe docs, and one for
Getting Started docs. So if you're viewing either a Zoe API doc or the "Before Starting an Agoric Project"
doc in Getting Started, you'll see "Introduction to Zoe" as an item in both of the two different sidebar menus. 

But if you're viewing "Introduction to Zoe" itself, you'll always see the Getting Started sidebar menu. There's
no way to have it sometimes (appropriately) display the Zoe sidebar menu instead.

### Configuration and navigation
All configuration is handled in `[/main/.vuepress/config.js](/.vuepress/config.js)`. Here you can:
- Set and modify the website title and description.
- Configure the top navigation bar.
- Configure the various sidebar menus

#### Configuring the top menubar
Go to `[main/.vuepress/themeConfig/nav.js](/.vuepress/themeConfig/nav.js)` to configure the top
navigation bar. `/main/.vuepress/config.js`, the overall VuePress configuration file, imports `nav.js`.

Below is an abridged configuration of the top navigation bar showing an array of only two entries,
Getting Started and Learn More.
Each entry is an object with three or four properties:
- `text`: The text shown in the nav bar.
- `ariaLabel`: Labels this page element. Used to access it if the text is not visible.
- `link`: Optional. Link to where the browser goes if you click the top menubar item itself, instead of a
  submenu item. Of the form `link: '/zoe/guide'` where the opening `/` starts the path at `main/`. In this
  case, no filename was given, so it defaults to `guide`'s `README.md` file. If not present, the menubar
  entry is not clickable.
- `items`: Optional. An array of submenu item objects, each of which is a single submenu item of its 
  parent navbar item. Not present if the item doesn't have a submenu.
  
To add an entry to the top menubar, just add a menu item object to the array. We suggest copying a
similar one, adding the copy, and editing the copy's property values to be those of the new item and
its submenus. To delete an entry, just remove its object from the menubar item array.
```js
module.exports = [
  {
    text: 'Getting Started',
    ariaLabel: 'Getting Started Menu',
    link: '/getting-started`
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
#### Configuring the top menubar submenus

A top menubar item without a submenu, such as Glossary, has no
`items` property and must have a `link` property (otherwise there's
nothing to click, so it's really not a good navigation menu item).
```js
 {
    text: 'Glossary',
    ariaLabel: 'Glossary Menu',
    link: '/glossary/'
  },
```

This is an abridged configuration of the `ERTP` entry and its submenu.
Each submenu item has the same structure and properties as a top menubar item,
except they do not have an `items` property. Note that for links to files, instead of folders, such as
the ERTP Introduction, you leave off the file's suffix. So in that case, the
link value is `'/getting-started/ertp-introduction/'` and not `'/getting-started/ertp-introduction.md'`
All links must end with a trailing `/`, even if the link is to a file.

To add a submenu item, just copy an appropriate one, add it to the `items` array, and edit its
property values to be what you want for the new item. To delete a submenu item, just remove its
entry from the `items` array.
```js
{
    text: 'ERTP', 
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

#### Configuring sidebar menus.
Sidebar menus are configured in [`/.vuepress/config.js`](/.vuepress/config.js). There,
sidebars are configured where it starts: `sidebar: {`.

Here's an abridged version of the overall sidebar configuration, only showing the Getting Started
and ERTP sidebars, and leaving out their specific items:
```js
sidebar: {
      '/getting-started/': [
        {
          // item configuration
        },
        {
          // item configuration
        },
      ],
      '/ertp/': [
        {
          // item configuration
        },
        {
          // item configuration
        },
      ],
    }
```
Below is an abridged version of the ERTP sidebar. Each item entry has five properties:
- `title`: The string that appears in the sidebar menu for this item.
- `path`: Where you go if you click on this menu item. As usual, the leading `/` denotes a path
  starting at `main`. Note the full file name is given, including the `.md` suffix (which VuePress
  will change to `.html` during its processing).
- `collapsible`: Can this item be collapsed? So far, we don't have any collapsible items, so 
  also give this property the value `false`.
- `sideBarDepth`: How many levels can the sidebar show? So far, we've not gone deeper than 3.
- `children`: An array of submenu items for this sidebar menu item. You just need to specify
  the file paths to where you want to go when the submenu item is clicked. VuePress uses the
  file's (including default README.md files for folders) H1 level header text for the sidebar text.
  You can also specify what text to use using the form `{ title: 'Mint', path: '/api/mint' }`.
  
```js
      '/ertp/': [
        {
          title: 'ERTP Introduction',
          path: '/getting-started/ertp-introduction.md',
          collapsible: false,
          sideBarDepth: 3,
          children: [
          ]
        },
        {
          title: 'ERTP Guide',
          path: '/ertp/guide/',
          collapsible: false,
          sideBarDepth: 3,
          children: [
            '/ertp/guide/',
            '/ertp/guide/amounts',
            '/ertp/guide/amount-math',
            '/ertp/guide/issuers-and-mints',
            '/ertp/guide/purses-and-payments',
          ]
        },
      ],
```
When viewing a page, VuePress has automatically constucted a sidebar menu entry for that page 
consisting of all `h1`, `h2`, and `h3` header titles on the page.

