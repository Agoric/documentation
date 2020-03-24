# Records

<Zoe-Version/>

These records (JavaScript objects with data properties and no
functions) are used throughout Zoe.

## SeatAndPayout

This is returned by a call to `redeem` on Zoe. A seat is an arbitrary object whose methods allow the user to take certain actions in a contract. The payout is a promise that resolves to an object which has keywords as keys and promises for payments as values. Note that while the payout promise resolves when an offer is completed, the promise for each payment resolves after the remote issuer successfully withdraws the payment.

```js
someSeatAndPayout: {
  seat: someSeat,
  payout: paymentKeywordRecord,
}
```

## Proposal

```js
someProposal: {
  want: someAmountKeywordRecord,
  give: anotherAmountKeywordRecord,
  exit: someExitRule
}
```

## IssuerKeywordRecord

The keys are keywords, and the values are issuers. These keywords will
be used by users to make their proposal. In the below example, "Asset"
and "Price" are keywords.

```js
someIssuerKeywordRecord: {
  Asset: moolaIssuer,
  Price: simoleanIssuer
}
```

## AmountKeywordRecord

The keys are keywords, and the values are amounts.
Keywords are unique identifiers per contract, that tie together
the proposal, payments to be escrowed, and payouts to the user.
In the below example, "Asset" and "Price" are keywords.
And in an auction instance, the keywords might be "Asset" and "Bid".

Users should submit their payments using keywords: `const payments = { Asset: moolaPayment };`

And, users will receive their payouts with keywords as the keys of a
payout object: `moolaPurse.deposit(payout.Asset);`

```js
someAmountKeywordRecord: {
  Asset: amountMath.make(5),
  Price: amountMath.make(9)
}
```

## AmountMathKeywordRecord

The keys are keywords, and the values are the [amountMath](/ertp/guide/amount-math.html) for
particular issuers.

```js
const someAmountMathKeywordRecord = {
  Asset: ticketAmountMath,
  Price: simoleanAmountMath
};
someAmountMathKeywordRecord.Asset.coerce(tickets3);

```

## ExitRule

The possible kinds are 'waived', 'onDemand', and 'afterDeadline'. `timer` and `deadline` only are used for the `afterDeadline` kind.

The possible records are:

`{ waived: null }`

`{ onDemand: null }`

`{ afterDeadline: { timer :Timer, deadline :Deadline} }`

```js
someExitRule: {
  afterDeadline: {
    timer: someTimer,
    deadline: 1893459600
  }
}

anotherExitRule: {
  waived: null,
}
```

## OfferStatuses Record

`active` and `inactive` lists of offerHandles.

```js
someOfferStatusesRecord: {
  active: someListOfOfferHandles,
  inactive: anotherListOfOfferHandles
}
```

## Installation Record
```js
{
  handle, // opaque identifier, used as the table key
  installation, // contract code
}
```

## Instance Record

```js
{ 
  handle, // opaque identifier for the instance, used as the table key
  installationHandle, // opaque identifier for the installation
  publicAPI, // the invite-free publicly accessible API for the contract
  terms, // contract parameters
  issuerKeywordRecord, // record with keywords keys, issuer values
  keywords, // an array of the keywords, in sorted order
}
```

## Offer Record
```js
{ 
  handle, // opaque identifier for the offer, used as the table key
  instanceHandle, // opaque identifier for the instance
  proposal, // the offer proposal (including want, give, exit)
  amounts, // the amountKeywordRecord that will be turned into payouts
}
```

## Issuer Record
```js
{
  issuer, // an ERTP issuer, used as the key for this table
  brand, // ERTP brand for the issuer
  purse, // A single purse used in common by contracts using this issuer
  amountMath, // local ERTP amountMath for the issuer
}
```
