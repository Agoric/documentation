# The Structure of Offers

<Zoe-Version/>

## Making An offer

To make an offer, you use [`E(zoe).offer(...)`](/reference/zoe-api/zoe.md#e-zoe-offer-invitation-proposal-paymentkeywordrecord-offerargs), which takes up to four arguments:
- An **invitation** to participate in this contract instance.
- A **proposal** stating your offer conditions.
- The **payments** escrowed for the offer, each corresponding with a **give** [Keyword](/reference/zoe-api/zoe-data-types.md#keyword) in **proposal**.
- **offerArgs** expressing additional arguments for the **offerHandler** associated with the invitation by [`zcf.makeInvitation(...)`](/reference/zoe-api/zoe-contract-facet.md#zcf-makeinvitation-offerhandler-description-customproperties-proposalshape).

## Invitations

An [Invitation](/reference/zoe-api/zoe-data-types.md#invitation) is a special case of ERTP [Payment](/reference/ertp-api/payment.md). Each is linked to a specific contract [Instance](/reference/zoe-api/zoe-data-types.md#instance), and
having one gives you the right to participate in that contract instance, for example, by making offers in it.

There are two main ways for contract users to get an invitation:
- If you create the contract instance, the contract might supply a special creator invitation.
- Someone (possibly you) who holds the right objects has created an invitation for a contract instance and gives it to
  you in some way. This could've been by sending it to you, posting it on a public online location, etc. It
  doesn't matter (nor does Zoe specify or have any requirements) how or why it got to you, only that you have it.

## Proposals

Proposals are records with **give**, **want**, and/or **exit** keys.

```js
const myProposal = harden({
  give: { Asset: AmountMath.make(quatloosBrand, 4n) },
  want: { Price: AmountMath.make(moolaBrand, 15n) },
  exit: { onDemand: null },
});
```
**give** and **want** use [Keywords](/reference/zoe-api/zoe-data-types.md#keyword) defined by the contract.
Keywords are unique identifiers per contract, that tie together proposals,
payments to be escrowed, and payouts to users.
In the example above, "Asset" and "Price" are the Keywords. However, in an auction contract,
the Keywords might be "Asset" and "Bid".

Each `AmountMath.make` call above is just making an ERTP [Amount](/reference/ertp-api/ertp-data-types.md#amount), or description of digital assets.
In this case, `AmountMath.make(quatloosBrand, 4n)` creates a description of 4 units
of our imaginary Quatloos currency and `AmountMath.make(moolaBrand, 15n)` creates a description
of 15 units of our imaginary Moola currency. (The "n" appended after each number indicates that
it is represented as a [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
rather than a [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number))

::: warning Note
Amounts are just _descriptions_ of assets, and have no intrinsic value of their own.
In contrast, [Payments](/reference/ertp-api/payment.md) hold actual digital assets.
:::

**exit** specifies how the offer can be cancelled. It must conform to one of three shapes:
- `{ onDemand: null }`: (Default) The offering party can cancel on demand.
- `{ waived: null }`: The offering party can't cancel and relies entirely on the smart contract to promptly finish their offer.
- `{ afterDeadline: deadlineDetails }`: The offer is automatically cancelled after a deadline,
  as determined by its `timer` and `deadline` properties.

For more details, see [Proposals](/reference/zoe-api/zoe.md#proposals).

## Escrowed Payments

Using the same Keywords as the **give** object in your **proposal**, you must specify a [PaymentPKeywordRecord](/reference/zoe-api/zoe-data-types.md#keywordrecord) containing [Payments](/reference/ertp-api/payment.md) of the corresponding digital assets.
Zoe escrows these payments on behalf of your offer until it is completed
or rejected or the assets are reassigned to another offer.
```js
const payments = {
  Asset: quatloosPayment,
  Price: moolaPayment,
};
```

## Offer Arguments

To pass additional arguments to the **offerHandler** contract code associated with the
invitation, send them in an **offerArgs** [CopyRecord](/glossary/#copyrecord).
Each contract can define the properties it supports and which are required, and
is responsible for handling any unexpected or missing arguments.

::: danger
Contract code should be careful interacting with **offerArgs**. These values need input validation
before being used since they are coming directly from the caller and may have malicious behavior.
:::

## Returned Value

`E(zoe).offer(...)` returns a promise for a `UserSeat` object. Its name comes from the concept of
"having a seat at the table" for the contract's execution.
