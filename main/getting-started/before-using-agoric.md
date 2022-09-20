# Installing the Agoric SDK

To write JavaScript smart contracts using the Agoric Zoe framework,
first install the Agoric Software Development Kit (SDK). The Agoric SDK is currently supported on MacOS, Linux, and Windows Subsystem for Linux (WSL). There is currently **no support** for Windows 10 or Windows 11.

After installing the Agoric SDK, you can proceed to [starting a project](/getting-started/start-a-project.md) with the Agoric CLI to create and deploy [smart contracts](/getting-started/deploying.md).

## Quick Start

If you're familar with JavaScript development tools such as `node`, `yarn`, and `git`:

```shell
node --version # 14.15.0 or higher
npm install --global yarn
git clone https://github.com/Agoric/agoric-sdk
cd agoric-sdk
yarn install
yarn build
yarn link-cli ~/bin/agoric # creates an Agoric directory to reference
export PATH=$PATH:~/bin # adds the parent directory to your PATH
agoric --version # should print the version number of the SDK
```

Now you are ready proceed to [starting a project](/getting-started/start-a-project.md).

If `agoric` is not found, then you may need to add the parent directory of where your `yarn link-cli` command created a folder. For example, if you created a folder called `Agoric` in your `/bin` directory, you may need to add `/bin` to your PATH.

::: tip Watch: Prepare Your Agoric Environment (November 2020)
This presentation is a good overview of the Agoric SDK setup process,
though a few details are out of date:

- node version: 12.x is too old; use 14.15.0 or higher
- skip `git checkout hackathon-2020-11`; use the default `master` branch

<iframe width="560" height="315" src="https://www.youtube.com/embed/w0By22jYhJA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

**Note:** Video omits adding the Agoric SDK to your PATH.
:::

## Platform: Linux shell or equivalent

The Agoric SDK is supported on
<a href="https://en.wikipedia.org/wiki/Linux">Linux</a>,
<a href="https://www.apple.com/macos/">MacOS</a>,
<a href="https://docs.microsoft.com/en-us/windows/wsl/">Windows Subsystem for Linux (WSL)</a>, and

- To open a terminal on MacOS, see **Applications>Utilities>terminal** in the **Finder**.
- To launch a terminal on Linux, use the **Terminal** application.
- To access WSL from Windows, visit the [WSL documentation](https://docs.microsoft.com/en-us/windows/wsl/).

## Install Node.js 14.15.0 or higher

Download from [Node.js](https://nodejs.org/) and follow the instructions for your platform.

## Install Yarn package manager

Follow [Yarn Installation](https://classic.yarnpkg.com/en/docs/install)
instructions; for example:

```shell
npm install --global yarn
```

## Clone the Agoric SDK

```shell
git clone https://github.com/Agoric/agoric-sdk
cd agoric-sdk
```

To update an existing clone:

```shell
git pull
```

## Install NPM dependencies

```shell
yarn install
```

**Note:** If you run into errors during install or build, make sure you have build-essential installed. `gcc --version`.

## Build packages

```shell
yarn build
```

## Install `agoric` CLI

Install the `agoric` command-line interface in a convenient place in your `$PATH` such as:

```shell
yarn link-cli ~/bin/agoric
```

or:

```shell
sudo yarn link-cli /usr/local/bin/agoric
```

To check that it's installed correctly:

```shell
agoric --version
```
