# Installing the Agoric SDK

To write JavaScript smart contracts using the Agoric Zoe framework, first install the Agoric Software
Development Kit (SDK).

After installing the Agoric SDK, you can proceed to [starting a project](./start-a-project.md).

## Getting Support

- Chat with peers on the [Agoric Discord](https://agoric.com/discord)
- Join weekly [Office Hours](https://github.com/Agoric/agoric-sdk/wiki/Office-Hours)
- Search and post [Q & A](https://github.com/Agoric/agoric-sdk/discussions/categories/q-a) in [agoric-sdk discussions](https://github.com/Agoric/agoric-sdk/discussions)

## Quick Start

If you're on a [supported platform](#platform-linux-shell-or-equivalent) (MacOS, Linux, or WSL) and you're familar with JavaScript development tools such as `node`, `yarn`, and `git`:

```shell
go version # Version 1.20.3 or higher
node --version # LTS version such as 18.16.0
npm install --global yarn # Install yarn for package management
git clone --branch community-dev https://github.com/Agoric/agoric-sdk # Clone the "community-dev" branch
cd agoric-sdk
yarn install # Asks yarn to install all the dependant node packages
yarn build # Builds the agoric-sdk packages
(cd packages/cosmic-swingset && make) # Builds the cosmic-swingset package
yarn link-cli ~/bin/agoric # Creates an executable script
agoric --version # Prints the version number of the SDK
```

Now you are ready proceed to [starting a project](./start-a-project.md).

_If you get "command not found", see [troubleshooting below](#install-agoric-cli)._

::: tip Watch: Prepare Your Agoric Environment (November 2020)
This presentation is a good overview of the Agoric SDK setup process,
though a few details are out of date:

- node version: 12.x is too old; use the LTS version 18.16.0 or a later LTS version
- skip `git checkout hackathon-2020-11`; use the `community-dev` branch

<iframe width="560" height="315" src="https://www.youtube.com/embed/w0By22jYhJA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

**Note:** Video omits adding the Agoric SDK to your PATH.
:::

## Platform: Linux Shell or Equivalent

The Agoric SDK is supported on <a href="https://en.wikipedia.org/wiki/Linux">Linux</a>, <a href="https://www.apple.com/macos/">MacOS</a>, and <a href="https://docs.microsoft.com/en-us/windows/wsl/">Windows Subsystem for Linux (WSL)</a>.

- To open a terminal on MacOS, see **Applications>Utilities>terminal** in the **Finder**.
- To launch a terminal on Linux, use the **Terminal** application.
- To access WSL from Windows, visit the [WSL documentation](https://docs.microsoft.com/en-us/windows/wsl/).

::: tip Mac Dev Tools
On a Mac, you must first install
[Xcode](https://apps.apple.com/us/app/xcode/id497799835)
:::

## Install Go

Download Go from [go.dev/doc/install](https://go.dev/doc/install) and follow the instructions for your platform.

```shell
go version # Version 1.20.3 or higher
```

## Install Node.js

Download Node.js from [Node.js](https://nodejs.org/) and follow the instructions for your platform.
We support Long Term Support (LTS) versions of node; currently, version 18.

```shell
node --version # LTS version such as 18.16.0
```

**Note:** Agoric will support all long-term support (LTS) versions of Node.js. 

## Install the Yarn Package Manager

Follow [Yarn Installation](https://classic.yarnpkg.com/en/docs/install)
instructions. For example:

```shell
npm install --global yarn
yarn --version # 1.22.10 or higher
```

## Install Git

Follow [Git installation instructions](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) or use your platform's package manager.

```shell
npm install --global git
git --version # 2.25.0 or higher
```

## Clone the Agoric SDK

```shell
git clone --branch community-dev https://github.com/Agoric/agoric-sdk
cd agoric-sdk
```

Cloning and installing the Agoric SDK can take a while. Please be patient.

## Install NPM Dependencies

```shell
yarn install
```

**Note:** If you run into errors during install or build, make sure you have the relevant developer tools installed. For example, on Debian or Ubuntu Linux, you can run `sudo apt get install build-essential` to install these tools.

## Build Packages

```shell
yarn build
```

**Note:** If this `yarn build` step fails, check that you are on a
[supported platform](#platform-linux-shell-or-equivalent) and
not native Windows.

## Build the Cosmic Swingset Package

```shell
(cd packages/cosmic-swingset && make)
```

## Install Agoric CLI

Use `yarn link-cli` to install the Agoric CLI (Command Line Interface) in a convenient place of your choosing such as:

```shell
yarn link-cli ~/bin/agoric
```

or:

```shell
sudo yarn link-cli /usr/local/bin/agoric
```

**Note:** Run `echo $PATH` to see directories in your current path, separated by colons. These are good candidates for where to have `yarn link-cli` place the executable.

::: tip Troubleshooting "command not found"
Watch:

- [Linux add to \$PATH: Fix "command not found" error (Linux & Mac)](https://www.youtube.com/watch?v=gkqsLRDnqlA) 6:19 Mar 2018.
  :::

## Check the Agoric Version

To check that it's installed correctly:

```shell
agoric --version # v0.18.2 "community-dev" branch
```

If the install was successful, you are ready to proceed to [starting a project](./start-a-project.md).


