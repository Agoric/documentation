# Transactional vs. Portfolio Contracts

Agoric Orchestration supports both **transactional contracts** for single interactions and
**portfolio contracts** for rich, persistent user positions. The [send-anywhere contract](./contract-walkthroughs/send-anywhere)
is typical of transactional contracts: each offer is an independent interaction.
[auto-stake-it](https://github.com/Agoric/agoric-sdk/blob/master/packages/orchestration/src/examples/auto-stake-it.contract.js) is typical of portfolio contracts: users have long-lived state.
This section explains their differences and provides examples from real contracts.

| **Characteristic**        | **Transactional Contracts**   | **Portfolio Contracts**          |
| :------------------------ | :---------------------------- | :------------------------------- |
| **Interaction Type**      | Single-shot                   | Multi-step, ongoing              |
| **Persistent User State** | No                            | Yes                              |
| **User Account**          | No dedicated on-chain account | Separate sub-account or position |
| **Example Use Case**      | Token swap, cross-chain send  | Staking, vaults                  |

Table: Comparison of Transactional and Portfolio Contracts in Agoric Orchestration

## Transactional Contracts

**Transactional contracts** perform one-shot actions, e.g., swapping tokens or sending them from one
chain to another. Each use is typically triggered by a single transaction, after which there is no
long-lived state managed by the contract for that user.

**Characteristics**:

- **Initiation**: Usually initiated by a single transaction from the user or external source.
- **No per-user account**: The contract does not maintain persistent user-specific state.
- **No smart wallet requirement**: Users often do not require a dedicated on-chain account.
- **One-shot**: The operation typically starts and finishes in a single interaction.

### Example: "Send Anywhere" Contract

The `send-anywhere` contract illustrates how a user can send tokens from Agoric to another chain in
one action. Under the hood, it exposes an `invitation` that, when exercised, moves tokens once and
does not maintain any further user-specific state.

**Key Points**:

- The contract exposes a single `makeSendInvitation` method that returns an Invitation.
- Users deposit tokens into the contract just for this one transaction.
- After the tokens are sent, the seat concludes and there is no ongoing position to manage.

Below is a simplified snippet adapted from the flows (`send-anywhere.flows.js`) showing the essence
of the transactional flow:

```js
export const sendIt = async (
  orch,
  { sharedLocalAccountP, log, zoeTools },
  seat,
  { chainName, destAddr }
) => {
  // 1. Extract the single token amount from the proposal.
  const { give } = seat.getProposal();
  const { In: amount } = give;

  // 2. Transfer the tokens into a local account that can initiate the IBC transfer.
  await zoeTools.localTransfer(seat, sharedLocalAccountP, give);

  // 3. Execute the cross-chain transfer.
  const { chainId } = await orch.getChain(chainName);
  await sharedLocalAccountP.transfer(
    { value: destAddr, chainId },
    { denom, value: amount.value }
  );

  // 4. Finish. No persistent state is stored for this user.
  seat.exit();
};
```

In this snippet, we perform the following steps:

1. **Extract token Details**: The user's seat provides the tokens details (_amount_, i.e., _brand_ and _value_) in a single `give`.
2. **Send via localAccount**: An account on the local Agoric chain is used only as a helper to transfer funds from `seat` to an ICA account.
3. **IBC transfer**: Tokens are transferred cross-chain in a single step via [`transfer` API](/guides/orchestration/key-concepts#funds-transfer).
4. **No ongoing portfolio**: Once done, the seat concludes—there is no stored user state.

This is a typical example of a transactional contract. It performs a single
action (sending tokens) and does not maintain any ongoing user state. The user interacts once, and
the contract concludes the operation. This contract is discussed in more detail in the
[`send-anywhere` contract walkthrough](/guides/orchestration/contract-walkthroughs/send-anywhere).

## Portfolio Contracts

**Portfolio contracts** manage long-lived user state and support multiple interactions over time.
They resemble "vaults": you open a portfolio (or vault) position, then manipulate or monitor it as
desired.

**Characteristics**:

- **Persistent per-user state**: Each user typically has their own account.
- **Multiple user actions**: The state can be updated with each new user action.
- **Orchestration Flows**: Users often interact through orchestration flows.
- **Onboarding**: Users first deposit tokens into a personal portfolio for management.

### Example: "Auto Stake It" Contract

The `auto-stake-it` contract demonstrates how to continuously manage a user's positions. A user
"onboards" into the contract by creating accounts on multiple chains (via orchestration) and then
depositing tokens to be staked automatically.

Key points in code:

1. **Make a PortfolioHolder** that stores each user's accounts in a single structure.
2. **Add accounts** to the portfolio. Each user might have multiple chain accounts.
3. **Perform multi-step operations** (e.g. receive tokens over IBC, transfer to staking).

Below is a simplified snippet (`auto-stake-it.flows.js`) showing how a portfolio is set up when a
user calls the "makeAccounts" flow:

```js
export const makeAccounts = async (orch, { makeStakingTap, makePortfolioHolder, chainHub },
    seat, { chainName, validator }) => {
    seat.exit(); // no funds are exchanged at the moment

    // 1. Get chain references (e.g., 'agoric' chain and the remote chain).
    const [agoric, remoteChain] = await Promise.all([
        orch.getChain('agoric'),
        orch.getChain(chainName),
    ]);

    // 2. Create orchestration accounts for each chain.
    const [localAccount, stakingAccount] = await Promise.all([
        agoric.makeAccount(),
        remoteChain.makeAccount(),
    ]);

    // 3. Combine them into a single PortfolioHolder for the user.
    const accountEntries = harden([
        ['agoric', localAccount],
        [chainName, stakingAccount],
    ]);
    const publicTopicEntries = /* gather each account's public topics */;
    const portfolioHolder = makePortfolioHolder(accountEntries, publicTopicEntries);

    // 4. Return a continuing offer result with invitationMakers, etc.
    return portfolioHolder.asContinuingOffer();
};
```

In this snippet, we create multiple accounts (one for Agoric, one for the remote chain).
Then, the contract uses `makePortfolioHolder` to maintain these in a persistent store.
Users can perform multiple future actions without losing state. Learn more about the
`makePortfolioHolder` function in the [`makePortfolioHolder` Orchestration API reference](https://agoric-sdk.pages.dev/funcs/_agoric_orchestration.preparePortfolioHolder).

## Choosing Between Transactional and Portfolio

Use **transactional contracts** (like "send-anywhere") when:

- You want a **single-shot interaction** (e.g. a swap, a cross-chain send).
- No ongoing user state is needed.
- The user wants minimal overhead (no dedicated on-chain structure).

Use **portfolio contracts** (like "auto-stake-it") when:

- You need **long-lived, multi-step interactions** (e.g. staking, compounding).
- Each user needs a separate sub-account or position.
- User state must persist (e.g., "my tokens remain staked until I withdraw").

Agoric Orchestration supports both **transactional contracts** for single interactions and
**portfolio contracts** for rich, persistent user positions. Use the pattern that best fits
your user flows. A purely transactional workflow is great for quick, one-time trades, while
a portfolio-based approach is ideal for scenarios like vaults or staking, where users
maintain ongoing positions. Note that rather than a rigid dichotomy, many contracts exist on a
spectrum supporting both interaction types. For instance, the FastUSDC contract supports both
portfolio-style LP positions and transactional trades without persistent user state.
