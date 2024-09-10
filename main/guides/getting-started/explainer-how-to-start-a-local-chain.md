# Starting a Local Chain
As you saw in this tutorial, starting a local chain is easy!

## How it Works
In the `dapp-offer-up` sample dapp, configuration for the Agoric containers is specified in the `package.json` file. Take note of the Docker specific parameters in the `script` section of `package.json` below:
```json
  "scripts": {
    "start:docker": "cd contract && docker compose up -d",
    "docker:logs": "cd contract; docker compose logs --tail 200 -f",
    "docker:bash": "cd contract; docker compose exec agd bash",
    "docker:make": "cd contract; docker compose exec agd make -C /workspace/contract",
    "make:help": "make -C contract list",
    "start:contract": "cd contract && yarn start",
    "start:ui": "cd ui && yarn dev",
    "lint": "yarn workspaces run lint",
    "test": "yarn workspaces run test",
    "test:e2e": "yarn workspace offer-up-ui test:e2e",
    "build": "yarn workspaces run build"
  }
```

In the tutorial you first used the `yarn create` command to clone the dapp. Next you ran the `yarn install` command to install all required dependencies. Finally you ran the `yarn start:docker` command to start a local chain. You can see from the json code snippet above the this command was running `docker compose up -d` from the `contract` folder.

::: tip Video Walkthrough

As you're going through this explainer it may be helpful to watch this video walkthrough.

<ClientOnly>
<iframe width="560" height="315" src="https://www.youtube.com/embed/WJ1MlHudpuM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</ClientOnly>

:::
