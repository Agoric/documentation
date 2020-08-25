## Agoric CLI

You use the Agoric CLI to install dependencies, initialize, deploy, and start Agoric projects. This Guide has two parts:
1. How to use the Agoric CLI to deploy and start a local-chain-multiuser scenario, for development and and testing of multiuser Dapps
2. Reference material for the five `agoric` CLI commands.

### Starting Multiuser Dapps

When developing a Dapp, you may need to test how it behaves with multiple users before deploying it publically.
These users could have different roles, such as the contract deployer, an auctioneer, a bidder, a buyer, a seller, etc. 
The Agoric CLI implements a local-chain-multiuser scenario for developing and testing multiuser Dapps.

#### Usage

Develop your Dapp as described in the [Agoric Getting Started Guide](https://agoric.com/documentation/getting-started/).
After using `agoric start` to test with the simulated chain, stop the simulated chain with Control-C.  Then start a real
local chain by running the following command. If you want to start the Agoric process afresh, add the `--reset` option at the end.
```js
agoric start local-chain
```
There won’t be any running clients yet, but the chain will start and be fully functional.

If you’re satisfied with the restart and want to run the chain in the background, you must know how to manage background 
processes on your system.  For example, Unix-like systems can use the following to log to `chain.log` and start in the background:
```sh
agoric start local-chain >& chain.log &
```
To start a local solo machine connected to the above local chain (your API ag-solo), use:
```sh
agoric start local-solo 8000
```
This starts a solo machine listening for HTTP on TCP port 8000.

To start other local ag-solos, use a unique port number for each one, such as 8001 or 8002 with:
```sh
agoric start local-solo <PORT-NUMBER>
```

Test that each of your ag-solos is running and has a wallet by connecting to `http://localhost:<PORT-NUMBER>/` for each port you used.
Run your contract and API deployment scripts against the API ag-solo with this `deploy` command. Note that port 8000 is the default 
for `agoric deploy` operations.  To deploy to an ag-solo running on a different port, add the `--hostport=127.0.0.1:<PORT-NUMBER>` 
option to the deploy command.
```sh
agoric deploy <PATH-TO-DEPLOY.JS>
```

To use your Dapp UI with different clients, you’ll need to connect to https://local.agoric.com in different browsers (or
different profiles of the same browser).  Then fill out the localhost address of the ag-solo that you want to use with 
that browser. This connects the processes in the browsers to their own wallets so they do not share per-client data 
such as cookies, storage, etc. Test your UI in each browser!

#### Example

This section shows how you do the above steps.

Start the local chain and ag-solos
```sh
# Initialize a Dapp directory.
agoric init foo
# Change to the Dapp directory.
cd foo
# Install NPM dependencies.
agoric install
# Start the local chain, logging to chain.log.
agoric start local-chain >& chain.log &
# Start a local API ag-solo
agoric start local-solo 8000 >& solo-8000.log &
# Start a second ag-solo.
agoric start local-solo 8001 >& solo-8001.log &
# Repeat for any other ag-solos you wish to start (8002, 8003, etc)
```
Configure the first client browser

Open a browser (or a new profile), and navigate to https://local.agoric.com/ 

![Agoric Registration](./assets/Agoric-Registration.png)

Keep the recommended address (`http://localhost:8000`), click **Open**, and verify that it opens a wallet and 
REPL (Read-Eval-Print-Loop).  In the REPL, type `console.log(8000)`, hit **Enter**, and see the 
command and output in the REPL history.

![REPL](./assets/REPL-1.png)

#### Configure an additional client browser
Open a different browser. Not just another tab or window, but a completely different browser or browser profile 
that doesn’t share cookies with any other ag-solo’s browser. For example, if you had an open Chrome window, 
create a new Chrome profile, or open a Firefox or Safari window. Navigate to `https://local.agoric.com/` and, 
in the resulting page, set the address to `http://localhost:8001` Click **Save**. Then click **Open** and 
verify that it opens a different wallet and REPL (the REPL history will be blank). Type `console.log(8001)` 
in the REPL, hit **Enter**, and see the `console.log` command and output in the REPL’s history.

![REPL](./assets/REPL-2.png)

You can repeat this section for as many other ports as you ran ag-solos for.

#### Test the UI
```sh
# Deploy the contract and API service.
agoric deploy contract/deploy.js api/deploy.js
# Start the UI
(cd ui && yarn start)
```

Then navigate to `http://localhost:3000` in each browser/profile for which you want to use the UI.  
When the UI opens your wallet, the browser should navigate to the same URL you entered in that browser
or profile’s `https://local.agoric.com` page.

### Agoric CLI Command Reference
Add one of five command names to `agoric` to specify what command to run. **Note**: Required argument names need not be given, only their values. Optional argument names must be given, along with their values. See the command's examples if you're not sure if a name is needed.

In general, you want to issue Agoric CLI commands in this order:
1. `agoric init`
2. `agoric install`
3. `agoric start` (Usually with `--reset`)
4. `agoric deploy`

Use `agoric help` whenever you need help with one of the above Agoric CLI commands.

#### `agoric init`
- **Function**: 
  - Creates a new Dapp directory named `<project>` with contents copied from the `dapp-template` argument template.
- **Required Arguments**:
    - `project`: Name of the new project to initialize.
- **Optional Arguments**:
    - `--dapp-template <name>`: Use the template specified by `<name>`. Defaults to the demo Dapp `dapp-encouragement`.
    - `--dapp-base <base-url>`: Look under this directory for the Dapp template. Defaults to `git://github.com/Agoric/`
    - `-h`, `--help`: Display help for `init` command.
- **Examples**:
  - Creates a directory named `demo` with contents copied from the default `dapp-template` value `dapp-simple-exchange`.
	- `agoric init demo`
  - Creates a directory named `my-first-contract` with contents copied from the default `dapp-template` value `dapp-simple-exchange`.
	  - `agoric init my-first-contract`
  - Creates a directory named `my-contract` with contents copied from a template named `dapp-skeleton` located under the URL `file:///home/contracts`
	  - `agoric init my-contract --dapp-template dapp-skeleton --dapp-base file:///home/contracts` 

#### `agoric install`
- **Function**:
  - Install Dapp JavaScript dependencies. This may take a while.
- **Required Arguments**:
  - None.
- **Optional Arguments**:
  - None.
- **Examples**:
  - Installs Dapp JavaScript dependencies
	- `agoric install`

#### `agoric start`
- **Function**:
  - Run an Agoric VM on which contracts will run.
- **Required Arguments**:
  - `[profile]`: Specifies the environment for the VM. Defaults to `dev` for development mode, `testnet` connects to our current testnet.
  - `[args]`: Ignore this for now. It currently has no valid values.
- **Optional Arguments**:
    - `--reset`:  Clear all VM state before starting.
    - `--pull`:  For Docker-based VM, pull the image before running.
    - `--delay [seconds]`: Delay the given number of seconds for each round-trip to the simulated chain and back for a simulated chain to process messages. A `1` value lets you easily count the number of trips in your head.
    - `--inspect`: [host[:port]]`: Activate inspector on host:port (default: "127.0.0.1:9229")
    - `--inspect-brk [host[:port]]`:  Activate inspector on host:port and break at start of script (default: "127.0.0.1:9229")
    - `-h`, `--help`: Display help for `start` command
- **Examples**:
  - Restart the Agoric VM, clearing all existing state before doing so.  
    - `agoric start --reset`
  - For Docker-based VM, before running pull the image.
    - `agoric start --pull`
  - Delay 5 seconds for each round-trip to the simulated chain and back in order for a simulated chain to
 process messages. 
      - `agoric start --delay 5`

#### `agoric deploy`
- **Function**:
  - Run one or more deployment scripts against the local Agoric VM. You may optionally specify which host and port to connect to the VM on.
- **Required Arguments**:
  - `<script...>`: Deployment script(s) to run against the local Agoric instance. You must specify at least one, and may specify more than one. 
- **Optional Arguments**:
  - `--hostport <HOST:PORT>`: Host and port on which to connect to the VM.
  - `-h`, `--help`: Display help for `deploy` command
- **Examples**:
  - Run the specified `deploy.js` scripts against the local Agoric VM.
    - `agoric deploy ./contract/deploy.js ./api/deploy.js`
  - Run the specified `deploy.js` scripts on VM host 128.7.3.139 and
    port 99.
    - `agoric deploy --hostport 128.7.3.139:99 ./contract/deploy.js`

#### `agoric help`
- **Function**:
  - Displays the Agoric CLI commands and arguments with brief descriptions.
- **Required Arguments**:
  - None
- **Optional Arguments**:
  - `-V`, `--version`: Output Agoric's version number.
  - `--sdk`: Use the Agoric SDK containing this program.
  - `-v`, `--verbose`: Output a more detailed version of help (note: only for some commands)
  - `-h`, `--help`: display help for command
- **Examples**:
  - Display Agoric CLI commmands with brief descriptions.
    - `agoric help`
  - Display current Agoric version number
    - `agoric -V help`
  - Display verbose help for an Agoric command
    - `agoric start -h -v`
  - Display verbose general help
    - `agoric help -v`
