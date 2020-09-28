## Build Locally

To run a local server to see the changes in real time, run:

```shell
npm run docs:dev
```

Note that changes to the site config may require stopping this program
and restarting.

To build the site as it will be built for production, run:

```shell
npm run docs:build
```

## Github Actions and Continuous Integration

On every pull request and on every commit to master, the following
Github Actions run:

* Test the build - This tests that the build does not have any errors and
  that the result passes HTML5 validation
* Spellcheck - This checks the Markdown documents against a dictionary and a local wordlist

## Spellcheck

This is currently only available in Github Actions on Pull Requests.
Any words that do not pass spell check will be shown in the logs of
the Github Action. Please either fix the words or add them to the list
in `Agoric/documentation/.wordlist.txt`. Please maintain the list's alphabetical order when entering new words for the convenience of future maintainers.

![](./contributing-assets/spellcheck-results.png)

## Check Links

To check internal Vuepress links locally, run the following shell command. It does *not* check either external links or router-links. Output consists of the text of any broken links, what file they're in, and what line number they occur on.

```shell
npm run check-links
```

Links should be relative and in [this format](https://vuepressbook.com/tutorial/tutorial2.html#linking-to-headers-inside-a-file).


