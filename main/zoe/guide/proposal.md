# The Structure of Offers

<Zoe-Version/>

## Making An offer

To make an offer, you use [`E(zoe).offer()`](/zoe/api/zoe.md#e-zoe-offer-invitation-proposal-paymentkeywordrecord), which takes three arguments:
- An `invitation` to participate in this contract instance.
- A `proposal` stating your offer conditions.
- The `payments` escrowed for the offer, each in association with a `proposal`-specified keyword.

## Invitations

`Invitations` are a special case of ERTP `payments`. They are linked to a specific contract `instance`, and
having one gives you the right to participate in that contract `instance`, for example, by making offers in it.

There are two main ways for contract users to get an `invitation`:
- If you create the contract `instance`, you get a special creator `invitation`.
- Someone (possibly you) who holds the right objects has created an `invitation` for a contract `instance` and gives it to
  you in some way. This could've been by sending it to you, posting it on a public online location, etc. It
  doesn't matter (nor does Zoe specify or have any requirements) how or why it got to you, only that you have it.

## Proposals

Proposals are records with `give`, `want`, and `exit` keys.

```js
const myProposal = harden({
  give: { Asset: quatloosAmountMath.make(4n)},
  want: { Price: moolaAmountMath.make(15n) },
  exit: { 'onDemand'
})
```
`give` and `want` use keywords defined by the contract.
Keywords are unique identifiers per contract, that tie together the proposal,
payments to be escrowed, and payouts to the user.
In the example above, `Asset` and `Price` are the keywords. However, in an auction contract,
the keywords might be `Asset` and `Bid`.

The `quatloosAmountMath.make(4n)` is just making an ERTP `amount`, or description of digital assets.
In this case, 4 of our imaginary Quatloos currency. `moolaAmountMath.make(15n)` is making 
an `amount` of 15 of our imaginary Moola currency. (The appended "n" indicates that the numbers are
represented as `BigInts` rather than `Numbers`)

**Note**: It's important to understand that `amounts` are just descriptions of assets with no
intrinsic value. `payments` hold actual digital assets.

`exit` determines how an offer can be can cancelled:
- `'onDemand'`: (Default) Whenever the user wants.
- `'waived'`: The user cannot cancel, relying on the contract to finish the offer.
- `'afterDeadline'`: Cancelled automatically after a deadline. This requires two
  more properties, a `timer` object and a deadline BigInt value.

## Escrowed Payments

Using the same keywords as your `proposal`, you must specify a `PaymentKeywordRecord`.
This is a record with the keywords as keys, and `payments` containing digital assets as
values. Zoe escrows these `payments` on behalf of this offer until the offer is completed
or rejected or the assets are reassigned to another offer. 
```js
const paymentKeywordRecord = { 
  'Asset' : quatloosPayment, 
  'Price' : moolaPayment 
};
```
## Returned Value

`offer()` returns a `UserSeat` object. Its name comes from the concept of "having a seat at the table" 
for the contract's execution. 


