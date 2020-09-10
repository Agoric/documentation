# The Structure of Offers

<Zoe-Version/>

## Making An offer

To make an offer, you use [`E(zoe).offer()`](https://github.com/Agoric/documentation/blob/Alpha-Zoe-Objects/main/zoe/api/zoe.md#ezoeofferinvitation-proposal-paymentkeywordrecord), which takes three arguments:
- An `invitation` to participate in this contract instance.
- A `proposal` stating your offer conditions.
- The `payments` escrowed for the offer, each in association with a `proposal`-specified keyword.

## Invitations

`Invitations` are a special case of ERTP `payments`. They are linked to a specific contract `instance`, and
having one gives you the right to participate in that contract `instance`, for example, by making offers in it.

There are two main ways for contract users to get an `invitation`:
- If you create the contract `instance`, you get a special creator `invitation`.
- Someone who holds the right objects has created an `invatation` for a contract `instance` and given it to
  you in some way. This could've been by sending it to you, posting it on a public online location, etc. It
  doesn't matter (nor does Zoe specify or have any requirements) how or why it got to you, only that you have it.

## Proposals

Proposals are objects with `give`, `want` and `exit` keys.

```js
const myProposal = harden({
  give: { Asset: moola(4 )},
  want: { Price: simoleans(15) },
  exit: { 'onDemand'
})
```
`give` and `want` use keywords defined by the contract.
Keywords are unique identifiers per contract, that tie together the proposal,
payments to be escrowed, and payouts to the user.
In the example above, `Asset` and `Price` are the keywords. However, in an auction contract,
the keywords might be `Asset` and `Bid"`.

`exit` determines how an offer can be can cancelled:
- 'onDemand': Whenever the user wants.
- 'waived': The user cannot cancel, relying on the contract to finish the offer.
- 'afterDeadline': Cancelled automatically after a deadline. This requires two
  more properties, a `timer` object and a deadline value.

## Escrowed Payments

Using the same keywords as your `proposal`, you must specify a `PaymentKeywordRecord`.
This is a record with the keywords as keys, and `payments` containing digital assets as
values. Zoe escrows these `payments` until the offer is completed or rejected. 
```js
const paymentKeywordRecord = { 
  'Asset' : quatloosPayment, 
  'Price' : moolaPayment 
};
```
## Returned Value

`offer()` returns a `UserSeat` object. Its name comes from the concept of "having a seat at the table" 
for the contract's execution. 


