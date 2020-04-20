
# Before Using Agoric Software

Before working with the Agoric CLI, Zoe, and other Agoric tools and
software, you need to install the following. 

<table border="1">
  <tbody>
  <th><b>Step</b></th>
  <th><b>Action</b></th>
  <th><b>Explanation</b></th>
  <tr>
    <td><center>1</center></td>
    <td><a href="https://nodejs.org/">Install Node.js</a>, version 12.16.1 or higher</td>
    <td></td>
  </tr>
  <tr>
    <td><center>2</center></td>
    <td><a href="https://classic.yarnpkg.com/en/docs/install#mac-stable">Install Yarn 1</a></td>
    <td>Yarn is a package manager for your code and lets developers
  share code with others. Code is shared via a <i>package</i> that contains all shared code and a
  <code>package.json</code> file describing the package. The link takes you to 
  the Yarn install page, where you first select what operating system you want to
  install on. Your selection changes the page's content to give install instructions for that 
  OS and links to the needed downloads.</td>
  </tr>
  <tr>
    <td><center>3</center></td>
    <td>Open a shell. The rest of this table's Actions take place in
  this shell.</td>
    <td><ul><li>A terminal on Macs; see 
      <b>Finder&gt;Applications&gt;Utilities&gt;terminal</b></li>
      <li>To launch a bash shell at a specific folder on Windows 10:
        <ol><li>Navigate to that folder in File Explorer.</li>
          <li>Click the address bar while in that folder.</li>
          <li>Type <code>bash</code> in the address bar and press <b>Enter</b>
          </li></ol></li></ul>  
    </td>
  </tr>
  <tr>
    <td><center>4</center></td>
    <td><code>git clone
      https://github.com/Agoric/agoric-sdk</code></td> 
    <td>Get the latest Agoric SDK from the Agoric GitHub
  repository. It goes into the 
      <code>agoric-sdk</code> sub-directory of your home directory.
      If the <code>agoric-sdk</code> sub-directory doesn't already exist, 
    this operation creates it.</td>
  </tr>
  <tr>
    <td><center>5</center></td>
    <td><code>cd ~/agoric-sdk</code></td>
    <td>Change to the <code>agoric-sdk</code> subdirectory in your home
  directory.</td>
  </tr>
  <tr>
    <td><center>6</center></td>
    <td><code>yarn install</code></td>
    <td>Install NPM dependencies.</td>
  </tr>
  <tr>
    <td><center>7</center></td>
    <td><code>yarn build</code></td>
    <td>Build sources that need compiling. <b>Note:</b>
  <code>build</code> is not a standard <code>yarn</code> command,
  but one installed with the Agoric SDK.</td>
  </tr>
  <tr>
    <td><center>8</center></td>
    <td>Install the Agoric CLI by: <code>yarn link-cli 
      &lt;<i>agoric-cli's install directory</i>&gt;</code></td>
    <td>Select a directory to install the Agoric CLI in. For example,
      <code>yarn link-cli  
      ~/bin/agoric</code> The install directory need not already
  exist. In Agoric documentation, we use <code>~/bin/agoric</code> as
      the CLI install directory.</td> 
    </tr>
  <tr>
    <td><center>9</center></td>
    <td>If not already there, add the directory you installed the Agoric CLI in to your <code>$PATH</code>.</td>
      <td><code>echo $PATH</code> to see <code>$PATH</code>'s
  current value.</td>
  </tr>
</tbody>
</table>

