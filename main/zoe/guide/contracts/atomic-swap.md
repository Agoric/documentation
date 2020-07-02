# Atomic Swap

<Zoe-Version/>

##### [View all example contracts on Github](https://github.com/Agoric/agoric-sdk/tree/master/packages/zoe/src/contracts)

If one party, say Alice, wants to trade one kind of asset for another kind, 
she could send another party, Bob, the asset and ask him to send her the other
kind back. But Alice could decide to not play fair and get Bob's asset without
sending anything back. 

To solve this problem, swap contracts let users securely trade one kind of 
digital asset for another kind. In the `atomicSwap` contract, anyone can securely 
swap with a counterparty by escrowing digital assets with Zoe and sending an invite 
to the swap to the counterparty.

Alice's initial offer is `{ give: { Asset: A }, want: { Price: B } }`.
Its outcome is an invitation for the second party, Bob, who should offer
`{ give: { Price: B }, want: { Asset: A } }`, with a `want`
amount no greater than Alice's `give`, and a `give` amount at least as
large as Alice's 's `want`.

First, let's get the needed ZoeHelper methods, and specify and harden the 
keywords we'll use in the offer. 
```js
const { swap, assertKeywords, checkHook } = makeZoeHelpers(zcf);
  assertKeywords(harden(['Asset', 'Price']));
```
Next, overall we want to make an `invite` to send to Bob, one that
specifically states what our offer is so he knows how to respond 
with a matching offer. But first, we need to create our offer, as
represented by its handle `firstOfferHandle`.
```js
  const makeMatchingInvite = firstOfferHandle => {
    const {
      proposal: { want, give },
    } = zcf.getOffer(firstOfferHandle);
```
Next, we use `zcf.MakeInvitation()` to make an `invite` to send to Bob. The
`invite` is a `Payment` minted from Zoe's internal `inviteMint` This
invite includes an offer, so our first `offerhook` argument will be invoked in the
contract with an `offerHandle`. The `offerhook`'s result is returned as the outcome
of making the offer via the invitation.

Here, our `offerHook` uses the powerful `swap()` ZoeHelper. It takes
two offers which satisfy each other's `want` and `give` values and then
makes a swap between them. Zoe reallocates their assets, and completes both
offers.

The second `inviteDesc` argument `'matchOffer'` is a string that describes the `invite` for search purposes.
The third `customProperties` argument is an object whose properties are information needed
by the contract and included in the invitations's extent (recall that `Payments` are `amounts`, which 
have `extent` and `brand` components).
```js
return zcf.makeInvitation(
      offerHandle => swap(firstOfferHandle, offerHandle),
      'matchOffer',
      harden({
        customProperties: {
          asset: give.Asset,
          price: want.Price,
        },
      }),
    );
  };
```
Here we define the offer format for this contract.
 ```js 
  const firstOfferExpected = harden({
    give: { Asset: null },
    want: { Price: null },
  });
```
And finally, we return our invitation to send to Bob. **tyg todo: Not clear on why there are two makeInvitation calls?**
```js
  return zcf.makeInvitation(
    checkHook(makeMatchingInvite, firstOfferExpected),
    'firstOffer',
  );
};
```
