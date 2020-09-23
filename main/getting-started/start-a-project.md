# Starting a Project

::: tip Alpha status
The Agoric platform is at the alpha stage.
It has not yet been formally tested or hardened.
Do not use for production purposes.
:::

This document shows how to start a new Agoric project. Our demos are called <i>Dapps (distributed
applications)</i>, which typically have a browser-based user interface, 
a public API server, and a contract running on the Agoric blockchain.

Before doing the steps given in this document, be sure you have done the necessary prerequisites
specified in [Before Using Agoric](https://agoric.com/documentation/getting-started/before-using-agoric/).

For complete documentation on the Agoric CLI commands (those starting with `agoric`) used here, 
see the [Agoric CLI Guide](https://agoric.com/documentation/getting-started/agoric-cli-guide/).

For starting a local chain with multiple users, making it possible to develop and test multiuser Dapps, also see the 
 [Agoric CLI Guide](https://github.com/Agoric/documentation/blob/cli-multiuser/main/getting-started/agoric-cli-guide.md#starting-multiuser-dapps).

Also, for what needs to be done after you modify a project's code, see 
[Development
Cycle](https://agoric.com/documentation/getting-started/development-cycle/)

<table>
  <tbody>
  <tr>
  <th><b>Step</b></th>
  <th><b>Action</b></th>
  <th><b>Explanation</b></th>
  </th>
  <tr>
    <td>1</td>
    <td>Go to or open a shell and <code>cd &lt;directory-where-you-want-to-install-Dapp-code&gt;</code></td>
    <td>When you initialize your project/Dapp in the next step, its initial code is copied into your current directory (permissions allowing).</td>
  </tr>
  <tr>
    <td>2</td>
    <td>Run <code>agoric init demo</code>
    <td>Initializes a <i>Dapp</i> (<i>Distributed application</i>)
	project.
	<br><br>
    <code>init</code> creates a sub-directory with the specified name
    (<code>demo</code> in this case) in your current directory and copies an existing project's files
    into it. You can give the project any name you like. This
    documentation assumes you used <code>demo</code>. 
    <br><br>
    There are optional arguments that let you specify which project
    you want copied into the specified directory. By default, their values are set to
    use the Encouragement Dapp we wrote to provide a simple skeleton for a smart contract.
    To specify a different project, use the optional arguments:<br>
    <code>--dapp-template &lt;name&gt;</code> Use the project specified by this &lt;name&gt; as the template copied into your current directory.<br> 
	    <code>--dapp-base &lt;base-url&gt;</code> Look under this directory for the Dapp template. 
  <br><br>If this 
  doesn't work, use <code>echo $PATH</code> to check that your Agoric
      CLI install directory is in your <code>$PATH</code> If not, add
      it to <code>$PATH</code></td>
  </tr>
  <tr>
    <td>3</td>
    <td><code>cd demo</code></td>
    <td>Move to the directory where your project (the demo) is
  located.</td> 
  </tr>
  <tr>
    <td>4</td>
    <td><code>agoric install</code></td>
    <td>Install JavaScript dependencies, which may take a while.</td>
  </tr>
  <tr>
    <td>5</td>
    <td><code>agoric start --reset</code><br>
	(leave this shell up with the process running)</td>
    <td>Start the Agoric VM. <code>--reset</code> discards any prior Agoric
  state. This creates the <i>vats</i> in which smart contract code runs.
  The VM continues to run in this shell, making it unusable for
  running commands.</td>
  </tr>
  <tr>
    <td>6</td>
    <td>Open another shell, go to your <code>demo</code> directory</td>
    <td>For the remainer of this table, we call this the <i>deploy shell</i>.
    <br><br>Use the same project directory name and location as you used in Step 2. In
      this example, we used <code>demo</code> but you may have used a
      different name in Step 2.</td>
  </tr>
  <tr>
    <td>7</td>
    <td>In the deploy shell, <code>agoric deploy ./contract/deploy.js ./api/deploy.js</code></td>
    <td>Deploy the Dapp on an Agoric VM, install the Dapp's smart
  contract and web API, as well as JavaScript code that implements the Agoric APIs for writing and implementing
      contracts.</td>
  </tr>
  <tr>
    <td>8</td>
    <td>In the deploy shell, <code>(cd ui && yarn start)</code></td>
    <td>This starts the demo project's UI development server.</td></td>
  </tr>
  <tr>
    <td>9</td>
    <td>Go to a browser and open <code>http://localhost:3000</code> to
	    see the Dapp. If you used the default values for <code>agoric init</code>
	in Step 2, you'll see the Encouragement demo Dapp, described in the next cell.</td>
	<td>If you used the <code>agoric init</code> defaults in Step 2, 
		you'll see our Encouragement Dapp, which lets you get encouragement, 
	either for free or by making a tip. The latter requires interaction
	with your wallet where your assets are stored (which was started with the Agoric VM).</td>
  </tr>
</tbody>
</table>
