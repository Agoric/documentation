
# Before Using Agoric Software

Before working with the Agoric CLI, Zoe, and other Agoric tools and
software, you need to install the following.

<table>
  <thead>
    <tr>
      <th><b>Step</b></th>
      <th><b>Action</b></th>
      <th><b>Explanation</b></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>0</td>
      <td>Use a Unix-like environment</td>
      <td>You will need to type commands at a Bash-like shell command line prompt,
        such as is found in <a href="https://en.wikipedia.org/wiki/Linux">Linux</a>, 
        (<a href="https://www.apple.com/macos/">MacOS</a>, or
        <a href="https://docs.microsoft.com/en-us/windows/wsl/">Windows Subsystem for Linux (wsl)</a>.</td>
    <tr>
      <td>1</td>
      <td><a href="https://nodejs.org/">Install Node.js</a>, version 12.14.1 or higher</td>
      <td></td>
    </tr>
    <tr>
      <td>2</td>
      <td><a href="https://classic.yarnpkg.com/en/docs/install">Install Yarn 1<br>(Yes, Yarn 1 and not a later version)</a></td>
      <td>Yarn is a package manager for your code and lets developers
    share code with others. Code is shared via a <i>package</i> that contains all shared code and a
    <code>package.json</code> file describing the package. The link takes you to 
    the Yarn install page, where you first select what operating system you want to
    install on. Your selection changes the page's content to give install instructions for that 
    OS and links to the needed downloads.</td>
    </tr>
    <tr>
      <td>3</td>
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
      <td>4</td>
      <td>If you already have a <code>~/agoric-sdk</code> directory, update it: 
        <br><code>cd agoric-sdk</code>
        <br><code>git checkout master</code>
        <br><code>git pull</code>
      </td>
      <td>In the next step, if you don't have a copy of our <code>agoric-sdk</code> directory, you'll get one. This is in case you already have one and might need to update it.</td>
    </tr>
    <tr>
      <td>5</td>
      <td>If you don't have an <code>~/agoric-sdk</code> directory with Agoric's SDK content in it,
        <code>git clone https://github.com/Agoric/agoric-sdk</code></td> 
      <td>Get the latest Agoric SDK from the Agoric GitHub
    repository. It goes into the 
        <code>agoric-sdk</code> sub-directory of your home directory.
        If the <code>agoric-sdk</code> sub-directory doesn't already exist, 
        this operation creates it.
      </td>
    </tr>
    <tr>
      <td>6</td>
      <td><code>cd ~/agoric-sdk</code></td>
      <td>Change to the <code>agoric-sdk</code> subdirectory in your home
    directory.</td>
    </tr>
    <tr>
      <td>7</td>
      <td><code>yarn install</code></td>
      <td>Install NPM dependencies.</td>
    </tr>
    <tr>
      <td>8</td>
      <td><code>yarn build</code></td>
      <td>Build sources that need compiling. <b>Note:</b>
    <code>build</code> is not a standard <code>yarn</code> command,
    but one installed with the Agoric SDK.</td>
    </tr>
    <tr>
      <td>9</td>
      <td>Install the Agoric CLI by: <code>yarn link-cli 
        &lt;<i>agoric script location</i>&gt;</code></td>
      <td>Select a location for the Agoric CLI program. For example,
        <code>yarn link-cli /usr/local/bin/agoric</code> (or if that fails
        with permission problems, <code>sudo yarn link-cli /usr/local/bin/agoric</code>)
        </td>
    </tr>
  </tbody>
</table>

