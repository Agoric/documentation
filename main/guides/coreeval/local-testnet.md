# Create a Local Testnet

To create, start, and deploy an Agoric contract to a local Agoric Testnet, do the following:


1. Install *Go* if needed.

	```
    brew install go
    ```
2. Navigate to `<agoric-sdk>/packages/cosmic-swingset` and run `make`.
3. Prepare the chain and solo nodes.

	```jsx
	make scenario2-setup BASE_PORT=8000 NUM_SOLOS=0
	```
4. Start the chain.

	```jsx
	make scenario2-run-chain
	```
5. Switch to another terminal and wait for the first block to be produced.
6. Navigate to `<agoric-sdk>/bin` and start the client.

	```
	agd --chain-id=agoricdev-17 tx gov submit-proposal swingset-core-eval <PATH to permissions> <PATH to proposal>
	```
    
    For example, to deploy the PSM contract referenced in the previous topics, run the following:
    
    ```
    agd --chain-id=agoricdev-17 tx gov submit-proposal swingset-core-eval test/psm/gov-add-psm-permit.json test/psm/gov-add-psm.js
    ```
7. Adjust variables in `<agoric-sdk>/packages/cosmic-swingset/Makefile` to point to the proposal and permissions you created earlier.
