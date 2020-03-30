<h1>Creating and Starting Demo Projects</h1>

(**tyg todo**: does "project" have any special meaning or definition for us?
What are a project's components? Why do we need to create one? Do we
ever need to stop or suspend it?)

This document shows how to create and start the Autoswap demo
project. Agoric projects are called <i>Dapps (distributed
applications)</i>, which typically have a browser-based user interface, 
a public API server, and a contract running on the Agoric blockchain.
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
	    from the Agoric GitHub repository in Step 4 of (<b>tyg todo</b>: Insert link
      when determined to Before Using Agoric Software).</td>
  </tr>
  <tr>
    <td><center>2</center></td>
    <td>Run <code>agoric init demo</code>
    <td>Initializes a <i>Dapp</i> (<i>Distributed application</i>)
	project, in this case Autoswap, an Agoric-written demo that introduces
	you to Agoric smart contracts.
	<br><br>
    <code>init</code> creates a folder with the specified name
    (<code>demo</code> in this case) and copies the files you need
    into it. You can give the project any name you like. This
    documentation assumes you used <code>demo</code>. 
    <br><br>
    There are optional arguments that let you specify which project
    you want to initialize. By default, their values are set to
    initialize a project we wrote to introduce you to Agoric smart
    contracts. See the (<b>tyg todo</b> insert links) Agoric CLI page
    or the Creating New Contracts or Using Existing Contracts page for
    details on these optional arguments.
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
      contracts and for the Agoric API. (<b>tyg todo</b>: Is this right?)</td>
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
  see our demo Autoswap Dapp.</td>
    <td>See a screenshot and a description of this Dapp below.</td>
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

(**tyg todo** Add Wallet UI screenshot)

The Autoswap smart contract demo app is running, and you can
see its UI in a browser tab. The UI shows the purses we gave you to
start trading with.

Now go to (**tyg todo** add
link) Experimenting With the Autoswap Demo Contract.  There, we'll
look at the code behind Autoswap and experiment with modifying it.
