# Starting a Local Chain
Starting a local chain using the Agoric SDK is easy! Just follow the steps outlined in this explainer. 
As you're going through this explainer it may be helpful to watch this video walkthrough, showing you all the steps and the desired outcome of each.
<iframe width="560" height="315" src="https://www.youtube.com/embed/XT1S4E1h-jM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Installing Prerequisities:
- Ensure Node is installed in your environment. If you need to install Node in your environment you can follow the [steps here](https://docs.agoric.com/guides/getting-started/#installing-nvm-and-node)
- Ensure Yarn is installed in your environment. If you need to install Yarn in your environment you can follow the [steps here](https://docs.agoric.com/guides/getting-started/#installing-yarn)

## Installing the Agoric SDK
- Clone the Agoric SDK from the Agoric GitHub repo:
 ```sh
git clone https://github.com/Agoric/agoric-sdk
```

- Go to SDK folder:
```sh
cd agoric-sdk
```

- Run the Yarn commands:
```sh
yarn install yarn build
```

Add the Agoric bin folder to your PATH variable:
```sh
export PATH=$PATH:/home/agoric/bin
```

Link the CLI to the bin folder:
```sh
yarn link-cli ~/bin/agoric
```

- Check to ensure the SDK is installed:
```sh
agoric --version
```

## Starting a Local Chain
- Create a new project using the `agoric init` command:
```sh
cd .. 
agoric init testProject cd testProject
```

- Install the Agoric components:
```sh
agoric install
```

- Start a local chain:
```sh
agoric start
```
