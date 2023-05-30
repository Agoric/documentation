# Deploy a Governance Proposal to a Local Testnet

To create, start, and deploy an Agoric governance proposal to a local Agoric Testnet, do the following:

1. Navigate to `<agoric-sdk>/packages/cosmic-swingset` and run `make`.
2. Prepare the chain and solo nodes.

	```jsx
	make scenario2-setup BASE_PORT=8000 NUM_SOLOS=0
	```
3. Start the chain.

	```jsx
	make scenario2-run-chain
	```
4. Switch to another terminal and wait for the first block to be produced.
5. Navigate to `<agoric-sdk>/bin` and submit the governance proposal.

	```
	./agd --chain-id=agoriclocal --title=<Insert your own title> --description=<Insert your description> --home=../packages/cosmic-swingset/t1/bootstrap --keyring-backend=test --from=bootstrap tx gov submit-proposal swingset-core-eval <PATH to permissions> <PATH to proposal> -bblock --gas=auto --deposit=1000000ubld
	```

    For example, to deploy the PSM contract referenced in the previous topics, run the following:

    ```
	./agd --chain-id=agoriclocal --title=<Insert your own title> --description=<Insert your description> --home=../packages/cosmic-swingset/t1/bootstrap --keyring-backend=test --from=bootstrap tx gov submit-proposal swingset-core-eval ../packages/inter-protocol/test/psm/gov-add-psm-permit.json ../packages/inter-protocol/test/psm/gov-add-psm.js -bblock --gas=auto --deposit=1000000ubld
    ```
