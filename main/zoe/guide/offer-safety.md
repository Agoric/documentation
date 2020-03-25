# Offer Safety

<Zoe-Version/>

Definition: *Offer safety* means that the user is guaranteed to either
get back what they wanted or get back a full refund.

In order for Zoe to be able to enforce offer safety, the user must
provide Zoe a description of what they want and a description of what
they are offering. This is called a `proposal`. A proposal also
contains the conditions under which a user can exit a contract (this is used by Zoe to enforce payout liveness).

For example, if I want to buy an event ticket for $100, I am offering
$100, and I want one event ticket. My `proposal`
might look like:

```js
{
  give: { Price: dollars100 },
  want: { Asset: ticket1 },
}
```
Asset and Price are examples of the `keywords` of a contract. Each
contract uses keywords to allow the users to easily refer to parts of
a proposal, payments escrowed with Zoe, and payouts received from Zoe.

For example, when the user escrows with Zoe, the user must also submit payments using keywords.
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
[offerSafety.js](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/src/offerSafety.js), and tests, including
edge cases, can be found in [test-offerSafety.js](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/test/unitTests/test-offerSafety.js).

## Offer Safety Gotchas

### Can I get a full refund *and* what I wanted under offer safety?

Yes, under offer safety you can get a full refund *and* get what you
wanted. Offer safety guarantees that at least one of these is true.
Both could be true.

### What if there are no rules under `give`?

If there are no rules under `give` or `give` is omitted, then
trivially, whatever you get will fulfill offer-safety, because you are
always getting a full refund of what you put in, which was nothing.

### What if there are no rules under `want`

If there are no rules under `want` or `want` is omitted, then
trivially, whatever you get will fulfill offer-safety, because you
specified nothing about what you want, and so anything fulfills that.
