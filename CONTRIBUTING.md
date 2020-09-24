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

* Test the build - tests that a build does not error and that the
  result passes html5 validation
* Spellcheck - checks against a dictionary and a local wordlist

## Spellcheck

This is currently only available in Github Actions on Pull Requests.
Any words that do not pass spell check will be shown in the logs of
the Github Action. Please either fix the words or add them to the list
in `.wordlist.txt`. 

![](./contributing-assets/spellcheck-results.png)

## Check Links

This is not yet hooked up to continuous integration, but to check the
internal Vuepress links locally (this does not test external links or
router-links), run:

```shell
npm run check-links
```

Links should be relative and in [this format](https://vuepressbook.com/tutorial/tutorial2.html#linking-to-headers-inside-a-file).

