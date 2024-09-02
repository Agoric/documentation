# Fundamentals

Blockchain orchestration fundamentally relies on protocols and mechanisms that enable blockchains to communicate and transact with each other securely and efficiently. The primary goals of blockchain orchestration are:

- **Interoperability:** Allowing different blockchain networks to interact and transact with each other.
- **Scalability:** Enabling multiple blockchains to work together without compromising performance.
- **Security:** Ensuring that cross-chain transactions are secure and trustworthy.

To achieve these goals, several foundational technologies and protocols have been developed, with the **Inter-Blockchain Communication (IBC) protocol** being one of the most prominent.

### Inter-Blockchain Communication (IBC)

The Inter-Blockchain Communication (IBC) protocol can be thought of as the TCP/IP of the blockchain world. Just like TCP/IP allows different computer networks to communicate over the internet, IBC enables different blockchains to communicate with each other.

#### How IBC Works

IBC operates on a simple premise: by adhering to a common set of communication protocols, blockchains can securely transfer data and tokens between one another. Here's a high-level overview of how IBC achieves this:

- **Light Client Verification:** Each blockchain maintains a "light client" of the other blockchain. A light client is a simplified version of a blockchain client that only retains enough information to verify transactions and proofs, without needing to store the entire blockchain history.
- **Relayer:** A relayer is an off-chain process or entity that listens for transactions on one blockchain and relays them to another. The relayer facilitates communication between blockchains but does not have any special permissions or abilities; it merely passes messages between chains.
- **IBC Handshake:** Before two blockchains can communicate, they must perform a handshake, establishing a trusted channel between them. This involves verifying each other's consensus state through light clients.
- **Packet Transfer:** Once the connection is established, IBC allows the transfer of packets of data. These packets can represent tokens, smart contract commands, or any other type of data. The receiving blockchain uses the light client verification to ensure that the data packet is valid and hasn't been tampered with.
- **Finality and Acknowledgement:** After a packet is successfully received and processed by the receiving blockchain, an acknowledgment is sent back to the originating blockchain, confirming the completion of the transaction.

The IBC protocol is highly modular, meaning it can be extended and adapted for various use cases and blockchain types. This modularity is what makes IBC a powerful tool for blockchain orchestration, allowing diverse blockchains to participate in a common ecosystem.

### Interchain Accounts (ICA)

Interchain Accounts (ICA) is a feature built on top of IBC that allows one blockchain to control an account on another blockchain. This is akin to having a remote account that can be operated from a different blockchain. ICA is a critical component of blockchain orchestration, as it enables seamless cross-chain operations and automation.

#### How ICA Works

- **Account Creation:** One blockchain (let's call it Chain A) creates an account on another blockchain (Chain B) using the IBC protocol. This account is fully owned and controlled by Chain A.
- **Transaction Execution:** Chain A can then send IBC messages to execute transactions on Chain B as if it were a local user. This could include transferring tokens, interacting with smart contracts, or any other blockchain operation.
- **Automation:** By leveraging ICA, Chain A can automate operations on Chain B, creating complex workflows that span multiple blockchains. For example, Chain A could automatically execute a smart contract on Chain B when certain conditions are met.

ICA greatly enhances the flexibility and capability of blockchain orchestration by enabling direct, programmable interactions between blockchains. This opens up a wide range of possibilities for cross-chain applications, from decentralized finance (DeFi) to supply chain management.

# AutoStake Example Walkthrough

## `makeAccounts` Function

The main logic of the contract is written in `makeAccounts` function which has the following signature:

```js
/**
 * @satisfies {OrchestrationFlow}
 * @param {Orchestrator} orch
 * @param {{
 *   makeStakingTap: MakeStakingTap;
 *   makePortfolioHolder: MakePortfolioHolder;
 *   chainHub: GuestInterface<ChainHub>;
 * }} ctx
 * @param {ZCFSeat} seat
 * @param {{
 *   chainName: string;
 *   validator: CosmosValidatorAddress;
 * }} offerArgs
 */
export const makeAccounts = async (
  orch,
  { makeStakingTap, makePortfolioHolder, chainHub },
  seat,
  { chainName, validator },
) => {

```

- `orch` parameter represents the orchestrator, an entity responsible for managing interactions between different blockchain chains.
- `ctx`is a context object containing:
    - `makeStakingTap`: A factory function for creating a staking tap.
    - `makePortfolioHolder`: A factory function for creating a portfolio holder.
    - `chainHub`: An interface to interact with the chain hub, which manages connections between different chains.
- `seat`: a ZCF Seat (this is unsused in this function).
- `offerArgs`: Contains arguments related to the offer, such as the `chainName` (name of the remote chain) and `validator` (address of the Cosmos validator on that chain).

```js
 const [agoric, remoteChain] = await Promise.all([
    orch.getChain('agoric'),
    orch.getChain(chainName),
  ]);
```
- `const [agoric, remoteChain] = await Promise.all([...]);`:
Asynchronously fetches information for both the local chain (`agoric`) and the remote chain specified by `chainName`. The `Promise.all` ensures both operations complete before proceeding.

```js
  const { chainId, stakingTokens } = await remoteChain.getChainInfo();
  const remoteDenom = stakingTokens[0].denom;
  remoteDenom ||
    Fail`${chainId || chainName} does not have stakingTokens in config`;
  if (chainId !== validator.chainId) {
    Fail`validator chainId ${validator.chainId} does not match remote chainId ${chainId}`;
  }
```
- `const { chainId, stakingTokens } = await remoteChain.getChainInfo();`
Retrieves the chain ID and staking tokens available on the remote chain.
- `const remoteDenom = stakingTokens[0].denom;`:
Extracts the denomination of the staking token from the remote chain.

```js
  const [localAccount, stakingAccount] = await Promise.all([
    agoric.makeAccount(),
    /** @type {Promise<OrchestrationAccount<any> & StakingAccountActions>} */ (
      remoteChain.makeAccount()
    ),
  ]);

  const [localChainAddress, remoteChainAddress] = await Promise.all([
    localAccount.getAddress(),
    stakingAccount.getAddress(),
  ]);
```

- `const [localAccount, stakingAccount] = await Promise.all([...]);`:
Creates accounts on both the local (Agoric) and remote chains. These accounts will be used to manage and stake tokens.
- `const [localChainAddress, remoteChainAddress] = await Promise.all([...]);`:
Retrieves the addresses associated with the newly created local and remote accounts. These addresses are essential for directing where tokens should be sent and staked.

### Setting Up IBC Transfers and Staking Tap

```js
  const agoricChainId = (await agoric.getChainInfo()).chainId;
  const { transferChannel } = await chainHub.getConnectionInfo(
    agoricChainId,
    chainId,
  );
  assert(transferChannel.counterPartyChannelId, 'unable to find sourceChannel');

  const localDenom = `ibc/${denomHash({ denom: remoteDenom, channelId: transferChannel.channelId })}`;
```
- `const agoricChainId = ...`:
Fetches the chain ID for the Agoric chain to help establish an IBC channel between Agoric and the remote chain.
- `const { transferChannel } = await chainHub.getConnectionInfo(...);`:
Retrieves the transfer channel information necessary for sending tokens between the local and remote chains via IBC.
- `assert(transferChannel.counterPartyChannelId, 'unable to find sourceChannel');`:
Ensures that a valid source channel is found for the IBC transfer. If not, an error is thrown.
- `const localDenom = ...`:
Constructs the IBC denomination identifier (`localDenom`) for the token, which combines the remote token's denomination with the IBC channel ID. This identifier is used to track the tokens on the local chain.

### Staking Tap and Monitoring:
```js
  const tap = makeStakingTap({
    localAccount,
    stakingAccount,
    validator,
    localChainAddress,
    remoteChainAddress,
    sourceChannel: transferChannel.counterPartyChannelId,
    remoteDenom,
    localDenom,
  });

  await localAccount.monitorTransfers(tap);
```
- `const tap = makeStakingTap({...});`:
Creates a "staking tap" using the provided accounts and configuration. This tap automatically handles the receipt and delegation of tokens.
- `await localAccount.monitorTransfers(tap);`:
Sets up the local account to monitor incoming transfers. When tokens matching the specified `remoteDenom` are received, they are automatically delegated to the validator.

### Final Steps: Portfolio Holder and Return:

```js
  const accountEntries = harden(
    /** @type {[string, OrchestrationAccount<any>][]} */ ([
      ['agoric', localAccount],
      [chainName, stakingAccount],
    ]),
  );

  const publicTopicEntries = harden(
    /** @type {[string, ResolvedPublicTopic<unknown>][]} */ (
      await Promise.all(
        accountEntries.map(async ([name, account]) => {
          const { account: topicRecord } = await account.getPublicTopics();
          return [name, topicRecord];
        }),
      )
    ),
  );

  const portfolioHolder = makePortfolioHolder(
    accountEntries,
    publicTopicEntries,
  );

  return portfolioHolder.asContinuingOffer();
};
harden(makeAccounts);
```
- `const accountEntries = harden([...]);`:
Creates a hardened (immutable) list of account entries, pairing the chain name with its corresponding orchestration account. This list will be used for managing these accounts in the portfolio holder.


