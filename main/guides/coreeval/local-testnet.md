# Deploy a Governance Proposal to a Local Testnet

To create, start, and deploy an Agoric governance proposal to a local Agoric Testnet, do the following:

1. If you're using a Mac, ensure that you have [Xcode](https://apps.apple.com/us/app/xcode/id497799835) installed.
2. Create a project folder that will allow you to run a local blockchain:

	```jsx
	agoric init <The name of your project>
	```
    
    For example, if you wanted to run your local blockchain from a folder named "Demo", you'd run this command:
    
    ```jsx
    agoric init Demo
    ```

	**Note:** Your project folder should *not* be located within your local clone of the agoric SDK.

3. Install additional dependencies by entering your project folder and running the following command.

	```jsx
    cd <Name of your project (e.g., Demo)>
    agoric install
    ```

4.  Start the chain by running the following command. (**Note:** You should still be located within your project folder.)

	```jsx
	agoric start local-chain --verbose --reset
	```

5. Wait for the first block to be produced.
6. Open a second terminal.
7. Within the second terminal, navigate to `<agoric-sdk>/bin` and submit the governance proposal by running the following command. (Make sure to enter "y" when asked to confirm the transaction.)

	```
    ./agd --chain-id=agoriclocal --title=<Insert your own title> --description=<Insert your description> --home=<PATH to your project folder>/_agstate/keys --keyring-backend=test --from=provision tx gov submit-proposal swingset-core-eval <PATH to permissions> <PATH to proposal>
	```

    For example, to deploy the PSM proposal referenced in the previous topics, run the following:

    ```
	./agd --chain-id=agoriclocal --title=<Insert your own title> --description=<Insert your description> --home=<PATH to your project folder>/_agstate/keys --keyring-backend=test --from=provision tx gov submit-proposal swingset-core-eval ../packages/inter-protocol/test/psm/gov-add-psm-permit.json ../packages/inter-protocol/test/psm/gov-add-psm.js
    ```
