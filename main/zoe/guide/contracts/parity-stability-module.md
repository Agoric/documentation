# Parity Stability Module

<Zoe-Version/>

##### [View the code on Github](https://github.com/Agoric/agoric-sdk/blob/50cd3e240fb33079948fa03b32bda86276879b4a/packages/inter-protocol/src/psm/psm.js#L27) (Last updated: Sept 8, 2022)

##### [View all contracts on Github](https://github.com/Agoric/agoric-sdk/tree/HEAD/packages/zoe/src/contracts)

The Parity Stability Module supports efficiently minting/burning the chain's
stable token at a fixed ratio to an externally supplied stable token. The ability
to trade into and out of the chain's stable token at parity with an external token
will add stability to its value. The fee percentage for trading into and out of the
stable token are specified separately.

The external token must be provided to enable trading. The contract doesn't
keep any of the chain's stable token on hand. It is minted on demand, and
burned when received.

The two trading requests, `makeWantMintedInvitation` and `makeGiveMintedInvitation` 
are used to create invitations to trade. The proposal specifies the amount of the
external token being provided, and the amount of the chain's stable token to be
received. The contract mints the stable token and pays it to the offer creator and
the received external tokens are held by the contract and can be sold to later
callers of `makeGiveMintedInvitation()`.

```js
const seat = E(zoe).offer(
   E(publicFacet).makeWantMintedInvitation(),
   harden({
     give: { In: giveAnchor },
     want: { Out: wantMinted } ,
   }),
   harden({ In: anchor.mint.mintPayment(giveAnchor) }),

   const payouts = E(seat).getPayouts();
```

The contract also supports trading the other way, by burning the chain's stable
token and paying the external token.
