# Making Payments in Agoric Smart Contracts
In this document, we'll explain how to send a payment to someone using their `agoric1...` address from an Agoric smart contract using a deposit facet.

## Using a depositFacet
Let's take a look at the following code snippet from the Swaparoo contract from [dapp-agoric-basics](https://github.com/Agoric/dapp-agoric-basics):
```js
const secondDepositFacet = await E(depositFacetFromAddr).lookup(
  secondPartyAddress,
  'depositFacet',
);

await E(secondDepositFacet).receive(secondSeatInvitation);

return 'invitation sent';
```

## Step-by-Step Explanation
### Retrieving the Deposit Facet:
- `depositFacetFromAddr` is an object that provides a lookup function for deposit facets associated with addresses.
- The lookup function is called with `secondPartyAddress` and `'depositFacet'` as arguments to retrieve the deposit facet associated with the `secondPartyAddress`.
- Since `lookup` is an asynchronous function that returns a promise, the `await` keyword is used to wait for the promise to resolve.
- The resulting deposit facet is stored in the `secondDepositFacet` variable.

### Making the Payment:
- `secondDepositFacet` represents the deposit facet obtained in the previous step.
- The `receive` method is called on `secondDepositFacet`, passing `secondSeatInvitation` as an argument.
- `secondSeatInvitation` is an [Invitation](https://docs.agoric.com/glossary/#invitation) to participate in the second seat (recall that invitations are payments).
- Since `receive` is another asynchronous operation, the `await` keyword is again used to wait for it to complete.
- By calling `receive` on the deposit facet with `secondSeatInvitation`, the payment represented by `secondSeatInvitation` is transferred or deposited into a purse associated with `secondDepositFacet`.

### Returning a Result:
- After the payment has been successfully made by calling `receive`, the function returns the string `'invitation sent'` to indicate that the invitation has been sent.

## Deposit Facets in Agoric
In the Agoric smart contract framework, deposit facets are used as a secure way to transfer and manage digital assets and payments between parties. By calling the receive method on a deposit facet and passing in a payment or offer, the smart contract can safely deposit or transfer assets into the account associated with that facet.

Deposit facets provide an abstraction layer for handling payments and ensure that the transfers are performed securely and reliably within the smart contract.

## Video Walkthrough
As you're going through this tutorial it may be helpful to watch this video walkthrough.
<iframe width="560" height="315" src="https://www.youtube.com/embed/XeHBMO7SckU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
