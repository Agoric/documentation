# What is Agoric Orchestration?

Agoric’s Orchestration capability allows developers to easily build cross-chain interactions into existing applications or to create novel cross-chain-focused products.

<br/>
<img src="./assets/chains.png" width="100%" />
<br/>

**From a user’s perspective**, your contract or dapp can coordinate actions across multiple chains without burdening the user to jump through multiple UIs or signing steps. The Orchestration API *handles the complexity behind the scenes*. This empowers smart contracts to, for example,

:::tip Key Orchestration Features
- **_Perform Inter-Chain Staking_** 🔄  
    Leverage delegated proof-of-stake opportunities on remote Cosmos chains.  

- **_Automate Multi-Hop Transfers_** 🌉  
    Bridge tokens from Ethereum to Stride, then stake them or perform actions on Osmosis.  

- **_Support Scheduled Operations_** ⏰  
    Enable recurring and delayed tasks like rents and subscription services through the on-chain Timer Service.
:::

The Orchestration API sits on top of Agoric’s novel VM that provides three key elements that make multichain applications possible:

- **Remote account control and transfer**: Use the Orchestration APIs to easily create accounts on remote chains, transfer assets, and invoke contracts. Your Agoric contract orchestrates all behavior directly.
- **Multiblock execution with `async` and `await`**: Agoric applications communicate asynchronously and await responses which may come in the same block or many blocks (or weeks!) later. Contracts simply continue executing when the response arrives.
- **On-chain Timers**: Contracts can set timers for regular or scheduled execution, making recurring activities such as subscriptions straightforward to implement.

Agoric’s Orchestration APIs simplify controlling accounts on remote chains, moving assets, and using capabilities on any chain the API reaches.


## Introduction to Orchestration API Flow

Orchestration allows us to seamlessly create accounts on remote chains by accessing their chain objects. We can then use these chain objects to create accounts, get addresses, and transfer assets between chains. The following code snippet demonstrates how to create account Stride chain and get their address.

```js
// Get Chain objects
const stride = await orch.getChain('stride');

// Create account
const strideAccount = await stride.makeAccount();

// Get addresse
const strideAddr = strideAccount.getAddress();
```

We can easily transfer assets between chains and execute cross-chain transactions using the Orchestration API. The following code snippet demonstrates how to transfer funds from Osmosis to Agoric, forward funds from Agoric to Stride, and stake tokens on Stride.

```js
// Transfer funds from Osmosis to Agoric
const osmoToAgoricTransfer = await osmoAccount.transfer(
    agoricAddr, 
    amount
);

// Forward funds from Agoric to Stride
const agoricToStrideTransfer = await agoricAccount.transfer(
    strideAddr, 
    amount
);

// Create liquid stake message for Stride
const liquidStakeMsg = Any.toJSON(
    MsgLiquidStake.toProtoMsg({
        creator: strideAccount.value,
        amount: amount.toString(),
        denom: 'uosmo',
    })
);

// Execute staking transaction on Stride
await strideAccount.executeEncodedTx([liquidStakeMsg]);

// Transfer staked tokens back to user's Osmosis address
const finalTransfer = await strideAccount.transfer(
    userOsmoAddress, 
    amount
);
```


