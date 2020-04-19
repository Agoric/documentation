
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
    <td><a href="https://classic.yarnpkg.com/en/docs/install">Install Yarn</a></td>
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
      <li>
        On Windows 10:
        <ol><li>Open the registry editor by pressing the <b>Windows</b> key.</li>
          <li>Type “regedit” into the <b>Start</b> menu and press <b>Enter</b>.</li>
          <li>Right-click the <b>shell</b> key and select <b>New &gt; Key</b>.</li>
          <li>Name the key “bash” or similar although you can name it anything you want.</li>
        </ol>
      </li>
      </ul></td>
  </tr>
  <tr>
    <td><center>4</center></td>
    <td>Remove or rename <code>~/agoric-sdk</code> if you already have a home sub-directory of that name.</td>
    <td>In the next step, you'll put a clone of the Agoric SDK in <code>~/agoric-sdk</code>, so if you have anything you want to
      save in the current version, or don't want to have any content clash, you should empty or move it.</td>
  </tr>
  <tr>
    <td><center>5</center></td>
    <td><code>git clone
      https://github.com/Agoric/agoric-sdk</code></td> 
    <td>Get the latest Agoric SDK from the Agoric GitHub
  repository. It goes into the (created, if necessary)
      <code>agoric-sdk</code> sub-directory of your home directory.</td>
  </tr>
  <tr>
    <td><center>6</center></td>
    <td><code>cd ~/agoric-sdk</code></td>
    <td>Change to the <code>agoric-sdk</code> subdirectory in your home
  directory.</td>
  </tr>
  <tr>
    <td><center>7</center></td>
    <td><code>yarn install</code></td>
    <td>Install NPM dependencies.</td>
  </tr>
  <tr>
    <td><center>8</center></td>
    <td><code>yarn build</td>
    <td>Build sources that need compiling. <b>Note:</b>
  <code>build</code> is not a standard <code>yarn</code> command,
  but one installed with the Agoric SDK.</td>
  </tr>
  <tr>
    <td><center>9</center></td>
    <td>Install the Agoric CLI: <code>yarn link-cli 
      &lt;<i>agoric-cli's install directory</i>&gt;</td>
    <td>Select a directory to install the Agoric CLI in. For example,
      <code>yarn link-cli  
      ~/bin/agoric</code> The install directory need not already
  exist. In Agoric documentation, we use <code>~/bin/agoric</code> as
      the CLI install directory.</td> 
    </tr>
  <tr>
    <td><center>10</center></td>
    <td>If not already there, add the directory you installed the Agoric CLI in to your <code>$PATH</code>.</td>
      <td>Run <code>echo $PATH</code> to see <code>$PATH</code>'s
  current value.</td>
  </tr>
</tbody>
</table>

