# Offer Safety

<Zoe-Version/>

**Definition**: _Offer safety_ means that the user is guaranteed to either  
get **at least what they wanted**, or get back a **full refund** of what they offered — and **never worse**.  
They can receive more than they asked for, but never less than promised, and they will never lose more than they offered.

For Zoe to enforce offer safety, the user must
give Zoe a `proposal`. This is a description of both what they want and what
they are offering, and when and how the user can exit the contract. Zoe uses
this last to enforce payout liveness. The exit specification is optional, and
defaults to `OnDemand`, meaning a user can exit the contract instance at their
discretion.

For example, I want to buy an event ticket for which I offer $100. In Zoe,
my `proposal` is:

```js
{
  give: { Price: dollars100 },
  want: { Asset: ticket1 },
}
```

`Asset` and `Price` are the `keywords` of a contract. Keywords
let contract users easily and consistently refer to parts of
a proposal, payments escrowed with Zoe, and payouts received from Zoe.

For example, the user escrows assets with Zoe by submitting payments
using keywords. In this example, I would send Zoe a $100 payment to
escrow my offer, as Zoe immediately escrows the `give:`-specified payment.

After the user escrows, they get a promise for a payout from Zoe.
This is the payout that offer safety is enforced over. The payout _must_
include either at least what the user wanted (an event ticket in the above
example) or a full refund of what they escrowed ($100 in this example).
Sometimes the contract will provide _more_ than I asked for (e.g., an
upgraded ticket or an additional item).

Zoe doesn't allow the contract to take any of the `give` amount from the user
unless the user receives at least their `want` amount. The contract could
also return the entire payment, along with a general admission ticket if
the requested ticket isn't available.

We can enforce offer safety because Zoe controls the payout. In the example,
if I try to buy my event ticket using a smart contract on Zoe, the contract
can tell Zoe to update its bookkeeping to say I've bought a ticket.
But, Zoe only actually updates its records and gives me an event ticket
payout if that update is offer-safe and conserves total supply.

The offer safety enforcement code is in
[offerSafety.js](https://github.com/Agoric/agoric-sdk/blob/HEAD/packages/zoe/src/contractFacet/offerSafety.js).
Tests, including edge cases, are in [test-offerSafety.js](https://github.com/Agoric/agoric-sdk/blob/HEAD/packages/zoe/test/unitTests/test-offerSafety.js).

## Implementation Questions

**Under offer safety, can I get a full refund _and_ what I wanted?**

Yes, you can get a full refund _and_ what you wanted. Offer safety guarantees at least
one is true. Both could also be true.

**What if there are no rules under `give`?**

If there are no rules or if `give` is omitted, then you get a full refund
of what you put in, fulfilling offer safety. It's just the case that
you put in nothing, so you get back nothing. However, you _might_ also
get what you wanted, depending on whether your offer of
nothing for it is accepted.

**What if there are no rules under `want`**

If there are no rules or `want` is omitted, then you get what
you wanted, in this case nothing. This fulfills offer safety.
