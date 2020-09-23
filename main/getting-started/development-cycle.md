# Development Cycle 

Here's what you have to do when you make code changes in various parts of the system, including your contract code, so that the Agoric system reflects your changes.

Different changes have different impacts. The table below is ordered so that your changes with the most impact are at the top in the first row. To use the table, go down the first column until you see a type of change you made.

Then go to that row's second column and do the action specified there. You then need to go down the second column and do every action specified in the second column down to and including the last row's second column. In other words, if you do the action in row 3's second column, you must also do the action in row 4's second column, then row 5's second column, and so on until the bottom row.

You don’t have to do any of the second column actions in rows above where you started.

<table border="1">
<tbody>
<tr>
<td colspan="3"><b>How to use this table:<br><br>
<ol><li>Go down the first column until you encounter the type of change you made.</li>
<li>Go to that row’s second column and do the action specified there (if you want to know more about what and why you’re doing, see the row’s third column).</li>
<li>Go down to the next row and do the action in its second column.</li>
<li>Repeat 3. until you reach the bottom of the table and do the action in the bottom row’s second column.</li>
</ol></b>
For example, let’s say you changed code in <code>agoric-sdk</code>. Going down the first column, you find it and look at the action in the second column of that row. It says you need to run <code>agoric start --reset</code>. Then go to the next row and its second column to find out you need to run <code>agoric deploy contract/deploy.js</code> Continue doing the action specified in each following row’s second column until the “refresh your browser” instruction in the bottom row.
</td>
</tr>
<tr>
<th><b>If you...</b></td></th>
<th><b>Then you must...</b></td></th>
<th><b>Notes</b></td></th>
</tr>
<tr>
<td>Change which npm packages are used in <code>agoric-sdk</code></td>
<td> In your <code>agoric-sdk</code> directory, run <code>yarn install</code>
<td> Updates the <code>node_modules</code> to match the current package declarations. </td>
</tr>
<tr>
<td>Change packages in the <code>packages/</code> directory. For example, <code>SwingSet</code>, <code>eventual-send</code>, <code>default-evaluate-options</code>, <code>captp</code>, or <code>evaluate</code></td>
<td>In your <code>agoric-sdk</code> directory, run <code>yarn build</code></td>
<td>Rebuilds the SDK generated files.</td>
</tr>
<tr>
<td>This second column action needs to be done for any changes listed above this row, but doesn’t need to be done for changes listed below this row.</td>
<td>Run <code>agoric install</code></td>
<td>Copies the new <code>agoric-sdk/node_modules</code> into the Dapp.</td>
</tr>
<tr>
    <td>Change code in <code>agoric-sdk</code></td>
  <td>1. Kill the current <code>agoric</code> instance.<br><br>
    2. Run <code>agoric start --reset</code>
  </td>
  <td>When you change Agoric SDK code, you must restart your Agoric instance to use the revised version.</td>
</tr>
<tr>
<td>Change your contract definition.</td>
<td>Run <code>agoric deploy contract/deploy.js</code></td>
<td>Pushes the new contract to the chain.</td>
</tr>
<tr>
<td>Change the code in your contract’s `api` directory. It contains the cloud service part of your app, which talks to the contract on chain.</td>
<td>Run <code>agoric deploy api/deploy.js</code></td>
<td>Pushes the API handler to your local Agoric VM,  <code>ag-solo</code> </td>
</tr>
<tr>
<td>Change your UI code</td>
<td>Code changes may be automatically picked up and reflected in the display. If not, refresh the browser. </td>
<td>When you save your changes, the ReactJS dev proxy automatically updates, but sometimes it gets confused.</td>
</tr>
</tbody>
</table>
