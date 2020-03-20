# Offer Safety

<Zoe-Version/>

Definition: *Offer safety* means that the user is guaranteed to either
get back what they wanted or get back a full refund.

In order for Zoe to be able to enforce offer safety, the user must
provide Zoe a description of what they want and a description of what
they are offering. These are called `payoutRules` and along with
`exitRule` (which is used by Zoe to enforce payout liveness), they make up
the rules of the offer.

For example, if I want to buy an event ticket for $100, I am offering
$100, and I want one event ticket. My `payoutRules`
would look like:

```js
[
  { kind: 'offerAtMost', units: dollars100 },
  { kind: 'wantAtLeast', units: ticket1 }
]
```

When the user escrows with Zoe, the user must also submit payments using keywords.
Zoe expects to be able to escrow these payments immediately. In this
particular example, I would have to include a payment of $100 for Zoe
to escrow my offer.

After the user escrows, the user gets a promise for a payout from Zoe.
It is this payout that offer safety is enforced over. Importantly, the
payout either has to be what the user wanted, or it has to be a full
refund.

We are able to enforce offer safety because the payout is under the
control of Zoe. In the above example, if I am trying to buy my event
ticket using a smart contract on Zoe, that smart contract can tell Zoe
to update its bookkeeping to say that I've successfully bought a
ticket. But, Zoe will only actually update its records and give me a
payout of an event ticket if the update is offer-safe and conserves
total supply.

The code for enforcing offer safety can be found in
[isOfferSafe.js](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/src/isOfferSafe.js), and tests, including
edge cases, can be found in [test-isOfferSafe.js](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/test/unitTests/test-isOfferSafe.js).

## Offer Safety Gotchas

### Can I get a full refund *and* what I wanted under offer safety?

Yes, under offer safety you can get a full refund *and* get what you
wanted. Offer safety guarantees that at least one of these is true.
Both could be true.

### What if there are no rules that are `offerAtMost`?

If there are no rules that are `offerAtMost`, then
trivially, whatever you get will fulfill offer-safety, because you are
always getting a full refund of what you put in, which was nothing.

### What if there are no rules that are `wantAtLeast`?

If there are no rules that are `wantAtLeast`, then
trivially, whatever you get will fulfill offer-safety, because you
specified nothing about what you want, and so anything fulfills that.
