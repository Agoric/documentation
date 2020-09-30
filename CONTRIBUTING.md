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


