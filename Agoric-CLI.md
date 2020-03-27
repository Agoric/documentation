## Agoric CLI

You use the Agoric CLI to install dependencies, initialize, deploy, and start Agoric projects. `agoric` takes one of five commands as an argument. **Note**: Required argument names need not be given, only their values. Optional argument names must be given, along with their values.

In general, you want to issue Agoric CLI commands in this order:
1. `agoric init`
2. `agoric install`
3. `agoric start` (Usually with `--reset`)
4. `agoric deploy`

`agoric init`
- **Required Arguments**:
    - `project`: Name of the new project to initialize.
- **Optional Arguments**:
    - `--dapp-template <name>`: Use the template specified by `<name>`. Defaults to the demo DApp `dapp-simple-exchange`.
    - `--dapp-base <base-url>`: Look under this directory for the template. Defaults to `git://github.com/Agoric/`
- **Function**: Creates a new DApp directory named `<project>` with contents copied from the `dapp-template` argument template.
- **Examples**:
  - Creates a directory named `demo` with contents copied from the default `dapp-template` value `dapp-simple-exchange`.
	- `agoric init demo`
  - Creates a directory named `my-first-contract` with contents copied from the default `dapp-template` value `dapp-simple-exchange`.
	  - `agoric init my-first-contract`
  - Creates a directory named `my-contract` with contents copied from a template named `dapp-skeleton` located under the URL `file:///home/contracts`
	  - `agoric init my-contract --dapp-template dapp-skeleton --dapp-base file:///home/contracts` 

`agoric install`
- **Required Arguments**
  - None.
- **Optional Arguments**
  - None.
- **Function**
  - Install DApp JavaScript dependencies. This may take a while. **tyg todo**: Are these general dependencies for all Agoric projects, or specific ones connected to the directory created by `agoric init`?
- **Examples**
  - Installs DApp JavaScript dependencies
	- `agoric install`

`agoric start`
- **Required Arguments**
  - `[profile]`
	- **tyg todo Not sure what goes here** ?
  - `[args...]`
    - **tyg todo Not sure what goes here?**	
- **Optional Arguments**
	-`--reset:`  Clear all VM state before starting.
    - `--no-restart`: Do not actually start the VM. **tyg todo: Why
      would you do this?**
    - `--pull`:  For Docker-based VM, pull the image before running.
    - `--delay [seconds]`: Delay the given number of seconds before
      starting for a simulated chain to process messages.
- **Function**
  - Run an Agoric VM on which contracts will run.
- **Examples**
  - Restart the Agoric VM, clearing all existing state before doing so.  
    - `agoric start --reset`
  - Don't actually start the Agoric VM.
    - `agoric start --no-restart`
  - For Docker-based VM, before running pull the image.
	  - `agoric start --pull`
    - Delay 5 seconds before starting in order for a simulated chain to
 proces messages. (**tyg todo: Any suggestions for a good number of
 seconds or how to determine it?**)
      - `agoric start --delay 5`

`agoric deploy`
- **Required Arguments**
  - `<script...>`: Deployment script(s) to run against the local Agoric instance. You must specify at least one, and may specify more than one. 
- **Optional Arguments**
  - `--hostport <HOST:PORT>`: Host and port on which to connect to the VM.
- **Function**
  - Run one or more deployment scripts against the local Agoric VM. You may optionally specify which host and port to connect to the VM on.
- **Examples**
  - Run the specified `deploy.js` scripts against the local Agoric VM.
    - `agoric deploy ./contract/deploy.js ./api/deploy.js`
  - Run the specified `deploy.js` scripts on VM host 128.7.3.139 and
    port 99.
    - `agoric deploy --hostport 128.7.3.139:99 ./contract/deploy.js`

`agoric help`
- **Required Arguments**
  - None
- **Optional Arguments**
  - None.
- **Function**
  - Displays the Agoric CLI commands and arguments with brief descriptions.
- **Examples**
  - Display Agoric CLI commmands with brief descriptions.
    - `agoric help`
