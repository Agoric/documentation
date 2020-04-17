# Starting a Project

This document shows how to start a new Agoric project. Our demos are called <i>Dapps (distributed
applications)</i>, which typically have a browser-based user interface, 
a public API server, and a contract running on the Agoric blockchain.

For complete documentation on the Agoric CLI commands (those starting with `agoric`) used here, 
see the [Agoric CLI Guide](https://agoric.com/documentation/getting-started/agoric-cli-guide/) documentation.

Also, for what needs to be done after you modify a project's code, see 
[Development Cycle](https://agoric.com/documentation/getting-started/development-cycle/)
<br><br>
<table border="1">
  <tbody>
  <tr>
  <th><b>Step</b></th>
  <th><b>Action</b></th>
  <th><b>Explanation</b></th>
  </th>
  <tr>
    <td><center>1</center></td>
    <td>Go to or open a shell and run <code>cd ~/agoric/sdk</code></td>
    <td>Go to the directory where you copied the latest Agoric SDK
	    from the Agoric GitHub repository in Step 4 of <a href="https://agoric.com/documentation/getting-started/before-using-agoric/">Before Using Agoric</a>.</td>
  </tr>
  <tr>
    <td><center>2</center></td>
    <td>Run <code>agoric init demo</code>
    <td>Initializes a <i>Dapp</i> (<i>Distributed application</i>)
	project.
	<br><br>
    <code>init</code> creates a folder with the specified name
    (<code>demo</code> in this case) and copies an existing project's files
    into it. You can give the project any name you like. This
    documentation assumes you used <code>demo</code>. 
    <br><br>
    There are optional arguments that let you specify which project
    you want copied into the specified directory. By default, their values are set to
    use a Dapp we wrote to introduce you to Agoric smart
    contracts. To specify a different project use the optional arguments:<br>
    <code>--dapp-template &lt;name&gt;</code> Use the template specified by &lt;name&gt;.<br> 
	    <code>--dapp-base &lt;base-url&gt;</code> Look under this directory for the Dapp template. 
  <br><br>If this 
  doesn't work, use <code>echo $PATH</code> to check that your Agoric
      CLI install directory is in your <code>$PATH</code> If not, add
      it to <code>$PATH</code></td>
  </tr>
  <tr>
    <td><center>3</center></td>
    <td>Run <code>cd demo</code></td>
    <td>Move to the directory where your project (the demo) is
  located.</td> 
  </tr>
  <tr>
    <td><center>4</center></td>
    <td>Run <code>agoric install</code></td>
    <td>Install JavaScript dependencies, which may take a while..</td>
  </tr>
  <tr>
    <td><center>5</center></td>
    <td>Run <code>agoric start --reset</code></td>
    <td>Start the Agoric VM. <code>--reset</code> discards any prior Agoric
  state. This creates the <i>vats</i> in which smart contract code runs.
  The VM continues to run in this shell, making it unusable for
  running commands.</td>
  </tr>
  <tr>
    <td><center>6</center></td>
    <td>Open another shell, and run <code>cd ~/agoric/sdk/demo</code></td>
    <td>Use the same project directory name as you used in Step 2. In
      this example, we used <code>demo</code> but you may have used a
      different word in Step 2.</td>
  </tr>
  <tr>
    <td><center>7</center></td>
    <td>In the new shell, run <code>agoric deploy ./contract/deploy.js ./api/deploy.js</code></td>
    <td>Deploy the Dapp on the Agoric VM, installing its smart
  contract and web API, as well as JavaScript code for writing and implementing
      contracts and for the Agoric API.</td>
  </tr>
  <tr>
    <td><center>8</center></td>
    <td>In the new shell, run <code>cd ui</code></td>
    <td>Move into the sub-directory that stores the Autoswap demo's UI</td></td>
  </tr>
  <tr>
    <td><center>9</center></td>
    <td>In the new shell, run <code>yarn install</code></td>
    <td>Install NPM dependencies</td>
  </tr>
  <tr>
    <td><center>10</center></td>
    <td>In the new shell, run <code>yarn start</code></td>
    <td><code>start</code> is a <code>yarn</code> sub-command
  implemented by Agoric. It launches the React development server.</td>
  </tr>
  <tr>
    <td><center>11</center></td>
    <td>Go to a browser and open <code>http://localhost:3000</code> to
  see our demo Dapp.</td>
    <td></td>
  </tr>
  <tr>
    <td><center>12</center></td>
    <td>Go to another tab or browser and open
  <code>http://loclhost:8000/wallet</code> for the Simple Wallet and REPL</td>
    <td>REPL is <i>Read-Eval-Print Loop</i>. Your Wallet is seeded
  with a few purses. See a screenshot below.</td>
  </tr>
</tbody>
</table>
