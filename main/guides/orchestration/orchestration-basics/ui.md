# DApp User Interface

Here, we will walkthrough the components making up the user interface for the Orchestration dApp.

## Orchestration.tsx

The `Orchestration.tsx` component serves as the main controller for the Orchestration dApp's user interface. It manages
the state and interactions required for users to create accounts, manage their balances, and perform various blockchain
transactions such as deposits, withdrawals, staking, and unstaking.

## AccountList.tsx

The `AccountList.tsx` component is responsible for displaying the list of user accounts and their associated balances in
various native denoms. It presents account information in a structured and user-friendly format, allowing users to view
and interact with their Orchestration Accounts directly.

## FetchBalances.tsx

The `FetchBalances.tsx` component is responsible for retrieving the balances of user accounts from different
blockchains. It interacts with the local RPC endpoints to fetch balance data for addresses on supported chains (for
Osmosis and Agoric).

## RpcEndpoints.tsx

The `RpcEndpoints.tsx` component provides a convenient place to manage RPC endpoints for different chains, including
your local agoric instance, to be used by different components. This component is used by other components, like
`FetchBalances.tsx`, to interact with the correct blockchain network.

## ChainSelector.tsx

The `ChainSelector.tsx` component provides a basic UI element for users to select the Cosmos chain they want to interact
with. The selected chain is passed back to the parent component, `Orchestration.tsx`, and used in further interactions.

## `MakeAccount.tsx`

The `MakeAccount.tsx` component provides a user interface for managing interchain accounts on the Agoric blockchain. It
allows users to create new accounts on selected chains (like Osmosis or Agoric), fetch and display balances of these
accounts, and perform actions such as deposit. The component interacts with the Agoric wallet to make offers and uses
RPC endpoints to retrieve account balances, incorporating loading states and notifications to enhance the user
experience.

## `MakeOffer.tsx`

The `MakeOffer.tsx` component defines an asynchronous function `makeOffer` that facilitates making an offer through the
Agoric wallet. It first checks if a `selectedChain` is provided and retrieves the necessary contract instance
(specifically 'orca') and the `BLD` brand from the contract store. The function then constructs an offer where it gives
a deposit of `1000` units of `BLD`. It initiates the offer using the wallet's `makeOffer` method, providing callbacks to
handle various offer statuses such as 'error', 'accepted', 'refunded', and 'done'. Throughout the process, it updates
the loading state, toggles modals, sets status texts, and adds notifications to keep the user informed about the offer's
progress and outcome.
