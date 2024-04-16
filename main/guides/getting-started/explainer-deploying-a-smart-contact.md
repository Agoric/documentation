# Deploying a Smart Contact
In the `dapp-offer-up` tutorial you just went through you saw how quick and easy it was to deploy a contact on Agoric using the `yarn start:contract` command. Let's take a look at how this command works and what's going on behind the scenes.

## How it Works
Running the `yarn start:contract` command in the tutorial runs a script which accomplishes several things:
- The script bundled the contract with the `agoric run` command
- The script collected some ATOM with the `agd tx bank send` command
- The script then used the ATOM to open a vault. This vault was used to mint enough IST to pay to install the bundles on chain with `agops vaults open` command
- The script then installed the bundles on chain with the `agd tx swingset install-bundle` command
- From there the script collected enough BLD to pay for a governance deposit with the `agd tx bank send` command
- Next, the script made a governance proposal to start the contract with the `agd tx gov submit-proposal swingset-core-eval` command
- Finally, the script voted for the proposal and waited for the proposal to pass.

Once again, we can reference the project's `package.json` file to learn a bit more about what `yarn start:contract` is doing behind the scenes.
```json
  "scripts": {
    "start:docker": "cd contract && docker compose up -d",
    "docker:logs": "cd contract; docker compose logs --tail 200 -f",
    "docker:bash": "cd contract; docker compose exec agd bash",
    "docker:make": "cd contract; docker compose exec agd make -C /workspace/contract",
    "make:help": "make -C contract list",
    "start:contract": "cd contract && yarn start",
    "print-key": "yarn docker:make print-acct",
    "start:ui": "cd ui && yarn dev",
    "lint": "yarn workspaces run lint",
    "test": "yarn workspaces run test",
    "test:e2e": "yarn workspace offer-up-ui test:e2e",
    "build": "yarn workspaces run build"
  }
```

Note the calling the `yarn start:contract` command is the same as running `yarn start` from the contract directory. We can look at `package.json` from the `contract` directory to learn even more:
```json
 "scripts": {
    "start:docker": "docker compose up -d",
    "docker:logs": "docker compose logs --tail 200 -f",
    "docker:bash": "docker compose exec agd bash",
    "docker:make": "docker compose exec agd make -C /workspace/contract",
    "make:help": "make list",
    "start": "yarn docker:make clean start-contract print-key",
    "build": "agoric run scripts/build-contract-deployer.js",
    "test": "ava --verbose",
    "lint": "eslint '**/*.js'",
    "lint:fix": "eslint --fix '**/*.js'"
  },
```

In the json snippet above note that the `start` command is running `yarn docker:make clean start-contract print-key`. 

::: tip Video Walkthrough

As you're going through this explainer it may be helpful to watch this video walkthrough.

<iframe width="560" height="315" src="https://www.youtube.com/embed/pWZUHJqj_Lo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

:::
