## Agoric CLI

You use the Agoric CLI to install dependencies, initialize, deploy, and start Agoric projects. Add one of five command names to `agoric` to specify what command to run. **Note**: Required argument names need not be given, only their values. Optional argument names must be given, along with their values. See the command's examples if you're not sure if a name is needed.

In general, you want to issue Agoric CLI commands in this order:
1. `agoric init`
2. `agoric install`
3. `agoric start` (Usually with `--reset`)
4. `agoric deploy`

Use `agoric help` whenever you need help with one of the above Agoric CLI commands.

## `agoric init`
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

## `agoric install`
- **Function**:
  - Install Dapp JavaScript dependencies. This may take a while.
- **Required Arguments**:
  - None.
- **Optional Arguments**:
  - None.
- **Examples**:
  - Installs Dapp JavaScript dependencies
	- `agoric install`

## `agoric start`
- **Function**:
  - Run an Agoric VM on which contracts will run.
- **Required Arguments**:
  - `[profile]`: Specifies the environment for the VM. Defaults to `dev` for development mode, `testnet` connects to our current testnet.
  - `[args]`: Ignore this for now. It currently has no valid values.
- **Optional Arguments**:
    -`--reset`:  Clear all VM state before starting.
    - `--no-restart`: Do not actually start the VM. 
    - `--pull`:  For Docker-based VM, pull the image before running.
    - `--delay [seconds]`: Delay the given number of seconds for each round-trip to the simulated chain and back for a simulated chain to process messages. A `1` value lets you easily count the number of trips in your head.
    - `--inspect`: [host[:port]]`: Activate inspector on host:port (default: "127.0.0.1:9229")
    - `--inspect-brk [host[:port]]`:  Activate inspector on host:port and break at start of script (default: "127.0.0.1:9229")
    - `-h`, `--help`: Display help for `start` command
- **Examples**:
  - Restart the Agoric VM, clearing all existing state before doing so.  
    - `agoric start --reset`
  - Don't actually start the Agoric VM.
    - `agoric start --no-restart`
  - For Docker-based VM, before running pull the image.
    - `agoric start --pull`
  - Delay 5 seconds for each round-trip to the simulated chain and back in order for a simulated chain to
 process messages. 
      - `agoric start --delay 5`

## `agoric deploy`
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

## `agoric help`
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
