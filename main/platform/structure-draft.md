# Agoric Structure and Process

This document describes and illustrates:
- Agoric's components and structure
- Agoric's infrastructure processes

## Agoric system diagram (via Kate)

![Dapp process](./assets/Agoric%20System%20Diagram.svg)

Legend:
- PR: persistent replicated
- PS: persistent solo 
- E: ephemeral

## Agoric connections between software agents

- Agoric Chain (PR, cosmic-swingset/ag-chain-cosmos)
  - ag-solo - VatTP over cosmic-swingset tx
  - other chains - VatTP over IBC
- ag-solo (PS, cosmic-swingset/lib/ag-solo) whether as a "user's VM" or a "dapp API server"
  - Agoric chain - VatTP over cosmic-swingset tx
  - web UI - CapTP built into endpoint handlers
  - legacy web UIs - custom POST/WebSocket RPC
  - other ag-solos - custom proxy via dapp UI
- Wallet web UI (E, dapp-svelte-wallet/ui)
  - user interface - custom UI does not expose ocaps
  - Wallet backend - CapTP over WebSocket
- REPL web UI (E, ag-solo/html)
  - user interface - the user can interact with ocaps
  - REPL backend - POST/WebSocket custom protocol
- Deployment scripts (E, agoric-cli/lib/deploy.js)
  - ag-solo - CapTP over WebSocket
- legacy dapp UI (E, dapp-*/ui)
  - dapp API server - custom POST/WebSocket RPC
  - user's wallet - custom iframe<->WebSocket RPC
- SwingSet runner (PS, swingset-runner)
  - inter-vat connections
- Pledger (PS, Pledger/packages/plugin-agoric)
  - browser UI - CapTP to renderer
  - renderer process - CapTP to UI and backend
  - backend process - CapTP to renderer

## Agoric Dapp file structure

A standard Dapp has the following publicly visible directories
- `api/`
- `contract/`
- `demo/`
- `node_modules/`
- `readme-assets/`
- `ui/`	

## Agoric CLI process

**tyg todo: Need more detail about what's being created, connected, started
at each step. For example, Step 7 creates vats. What vats and what's in each one
(for a standard contract case anyway). Etc.**
1. `git clone https://github.com/Agoric/agoric-sdk`
   1. Clones the Agoric SDK into an `agoric-sdk` directory on your system.
2. yarn install	Install NPM dependencies.
3. yarn build	Build sources that need compiling. 
4	 Install the Agoric CLI by: yarn link-cli <agoric script location>
5. `agoric init`
   1. Creates a sub-directory of agoric-sdk and copies an existing Dapp into it.
6. `agoric install`
   1. Installs JavaScript dependencies.
7. `agoric start`
   1. Start the Agoric VM. Creates the vats in which smart contract code runs. 
8. `agoric deploy ./contract/deploy.js ./api/deploy.js`
   1. Deploy the Dapp on an Agoric VM, install the Dapp's smart contract and web 
     API, as well as JavaScript code that implements the Agoric APIs
9. Dapp UI at `localhost:3000`. Wallet UI at `localhost:8000`.
   
**tyg todo: Somewhere in here, a contract's start() method gets run and does 
things. Also unclear where/when the instantiation process happens**
  
## Dapps

A Dapp (*decentralized application*) contains:
- Contract that is deployed to the simulated chain and testnet
- API: Backend server code split into on-chain and off-chain code.
- UI: Frontend of the dapp displayed in a browser, could be any JavaScript framework.

A Dapp starts a local blockchain on your computer, and deploys a basic contract to that blockchain. 
It does not currently deploy or connect to the Agoric testnet.



![Dapp process](./assets/Dapp%20process.svg)

## Ag-solo

An ag-solo is a local peer which can host objects for testing or interaction with a blockchain. 
**tyg todo: How many ag-solos get created? How are they connected, and
what does each contain?**

## Testnet

**tyg todo: Need info on how this connects to other things and what its components are,
what sets it up, etc.**

## Vats

**tyg todo: A typical contract has how many vats, which do what in each?**
- Chain vat
- Contract vat
- Instance vat
- User vat?

## Deploy scripts
- API
- Contract
- UI
**tyg todo: What does each script do/create/start?**

## Chains
We have local, remote, testnet?. What all connects to the chain and has 
operations recorded on it?

## Contracts (source code and instances) and Zoe
**tyg todo: What are these connected to/what processes are associated with them?
How do they connect to Zoe, and where/what is Zoe in the overall structure? A process?
A contract itself? Etc. **


## Overall

**tyg todo: 
I'd like to have multiple diagrams sections looking at Agoric/a contract from several
different structures and perspectives, specified below.**

- Dapps
- vats
- processes 
- ag-solos
- contract -> instance -> UX (including Wallet). 
- chains
