# Swaparoo Contract

This smart contract is designed to allow two parties to swap assets between themselves, with a fee charged to one of the parties. The contract is started with a `feeAmount` and a `namesByAddressAdmin` object, which is used to retrieve a deposit facet for the second party.

**NOTE:** *`namesByAddressAdmin` is actually excess authority in this scenario. Normally read-only access can be attained via `namesByAddress`. The use of `namesByAddressAdmin` in this example is due to a bug, which will be addressed in an upcoming release.*

Let's take a look at how this contract works:

## Setting up Fee Handling
The contract retrieves the `feeIssuer` from the Zoe service, which is an issuer for the stable token used for fees. It creates a `feeSeat` and a `feeShape` based on the `feeAmount` specified in the contract terms.
```js
const stableIssuer = await E(zcf.getZoeService()).getFeeIssuer();
const feeBrand = await E(stableIssuer).getBrand();
const { zcfSeat: feeSeat } = zcf.makeEmptySeatKit();
const feeShape = makeNatAmountShape(feeBrand, feeAmount.value);
```

## Making the First Invitation
The `makeFirstInvitation` function is called with an array of issuers. It verifies that these issuers are part of the contract terms and saves any new issuers to the contract. It then creates an invitation with a proposal shape that includes the `feeShape` in the give record.
```js
const makeFirstInvitation = issuers => {
  mustMatch(issuers, M.arrayOf(IssuerShape));
  for (const i of issuers) {
    if (!Object.values(zcf.getTerms().issuers).includes(i)) {
      zcf.saveIssuer(i, `Issuer${(issuerNumber += 1)}`);
    }
  }
  const proposalShape = M.splitRecord({
    give: M.splitRecord({ Fee: feeShape }),
  });

  const firstInvitation = zcf.makeInvitation(
    makeSecondInvitation,
    'create a swap',
    undefined,
    proposalShape,
  );
  return firstInvitation;
};
```

## Making the Second Invitation
When the first party accepts the invitation, the `makeSecondInvitation` function is called. This function retrieves the deposit facet for the second party using the `namesByAddressAdmin` object and the provided address.
```js
const makeSecondInvitation = async (firstSeat, offerArgs) => {
  mustMatch(offerArgs, harden({ addr: M.string() }));
  const { addr: secondPartyAddress } = offerArgs;

  const secondDepositFacet = await E(depositFacetFromAddr).lookup(
    secondPartyAddress,
    'depositFacet',
  );
  // ...
};
```

From there a second invitation is created with an offer handler that checks if the second party's proposal matches the first party's want. If it does, it calls the `swapWithFee` function to perform the asset swap and collect the fee.
```js
const secondSeatOfferHandler = secondSeat => {
  if (!matches(secondSeat.getProposal(), makeSecondProposalShape(want1))) {
    // Handle mismatched proposals
    return;
  }

  return swapWithFee(zcf, firstSeat, secondSeat, feeSeat, feeAmount);
};

const secondSeatInvitation = await zcf.makeInvitation(
  secondSeatOfferHandler,
  'matchOffer',
  { give: give1, want: want1 },
);
```

## Performing the swap
The `swapWithFee` function uses the `atomicRearrange` function from Zoe to perform the asset swap and collect the fee. It rearranges the assets between the first seat, second seat, and the feeSeat.
```js
export const swapWithFee = (zcf, firstSeat, secondSeat, feeSeat, feeAmount) => {
  const { Fee: _, ...firstGive } = firstSeat.getProposal().give;

  atomicRearrange(
    zcf,
    harden([
      [firstSeat, secondSeat, firstGive],
      [secondSeat, firstSeat, secondSeat.getProposal().give],
      [firstSeat, feeSeat, { Fee: feeAmount }],
    ]),
  );

  firstSeat.exit();
  secondSeat.exit();
  return 'success';
};
```

## Collecting fees
The contract also provides a `creatorFacet` with a `makeCollectFeesInvitation` method, which creates an invitation to collect the fees accumulated in the feeSeat.
```js
const creatorFacet = Far('Creator', {
  makeCollectFeesInvitation() {
    return makeCollectFeesInvitation(zcf, feeSeat, feeBrand, 'Fee');
  },
});
```

## Video Walkthrough
Watch this short video walk-through of the complete Swaparoo Smart Contract that allows any two parties to trade any digital assets with minimal risk.
<ClientOnly>
<iframe width="560" height="315" src="https://www.youtube.com/embed/qHa7u8r62JQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</ClientOnly>
