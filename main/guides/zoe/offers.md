# Invitations and Offers

You must have a Zoe **[Invitation](/reference/zoe-api/zoe-data-types.md#invitation)** to a specific
contract instance to join and participate in it.
Compare this to a smart contract on *Ethereum*. On *Ethereum*, the smart
contract developer must guard against malicious calls and store an
internal access control list to check whether the message sender is
allowed to send such a message. Zoe, built on Agoric's [object
capability](/glossary/#object-capabilities) security model, is significantly
easier.

## Invitations

**[Invitations](/reference/zoe-api/zoe-data-types.md#invitation)** are a special case of ERTP
**[Payments](/reference/ertp-api/payment.md)**. They are linked to a specific contract
**[Instance](/reference/zoe-api/zoe-data-types.md#instance)**, and
having one gives you the right to participate in that contract **Instance** (e.g., by making offers in it).

There are two ways you can create an **Invitation**:

- If you create a contract **Instance**, you get a special creator **Invitation**.
- The **[zcf.makeInvitation()](/reference/zoe-api/zoe-contract-facet.md#zcf-makeinvitation-offerhandler-description-customproperties-proposalshape)** method returns an **Invitation**.

**Invitations** created via **makeInvitation()** can be sent to any third party that you wish any
way you wish (e.g., send it directly to someone, post it to a public online location, etc.). Zoe
doesn't care how someone obtains an **Invitation**; once they have it, they're able to participate
in the related contract.

## Inspecting an Invitation

Before you use any **[Invitation](/reference/zoe-api/zoe-data-types.md#invitation)**, you should 
always first inspect and validate the **Invitation**.

<<< @/snippets/test-intro-zoe.js#details

::: warning Note

E() is part of the Agoric platform and is used to [call methods on
remote objects and receive a promise for the
result](/guides/js-programming/eventual-send.md).
Code on the Agoric platform is put in separate environments, called
[vats](/glossary/#vat), for security. Zoe is a remote object in its own vat,
so we must use E().
:::

**Invitations** include information about their contract's installation.
Essentially, this is the contract's source code as installed on Zoe.
From this overall contract installation, you can use Zoe to create and
run specific instances of the contract. For example, if a real estate
company has a contract for selling a house, they would create an
instance of the contract for each individual house they have up for
sale.

You use object identity comparison to quickly check that you recognize
this contract installation, without having to compare source code
line-by-line. If the installation matches, you're
sure the **Invitation** is for participating in an instance of the
expected contract rather than an unknown and possibly malicious one.

<<< @/snippets/test-intro-zoe.js#isCorrectCode

However, if you don't recognize the installation, you can inspect its
code directly by calling:

<<< @/snippets/test-intro-zoe.js#inspectCode

In most cases, the bundle contains a base64-encoded zip file that you can
extract for review:

```sh
echo "$endoZipBase64" | base64 -d > bundle.zip
unzip bundle.zip
```

Contracts can add their own specific information to **Invitations**. In
this case, the Atomic Swap contract adds information about what is
being traded: the asset described by the **[Amount](/reference/ertp-api/ertp-data-types.md#amount)**
Alice has escrowed, and the *price* **Amount** that you must pay to get it.

## Responding to Invitations - Offers

If you want to respond to an **[Invitation](/reference/zoe-api/zoe-data-types.md#invitation)**
that you've received, you can call
**[E(zoe).offer()](/reference/zoe-api/zoe.md#e-zoe-offer-invitation-proposal-paymentkeywordrecord-offerargs)**,
which takes several arguments:

- An **[Invitation](/reference/zoe-api/zoe-data-types.md#invitation)** to participate in this
contract instance.
- A **Proposal** stating your offer conditions. This argument is optional; contracts can allow
users to participate in them without giving or wanting anything. See the 
[Proposals](#proposals) section below for additional information.
- The **[Payments](/reference/ertp-api/payment.md)** escrowed for the offer. Note that **Payments**
are passed in as **PaymentKeywordRecords**, where each **Payment** is associated with a
**Proposal**-specified **[Keyword](/reference/zoe-api/zoe-data-types.md#keyword)**. This argument
is optional. See the [Escrowed Payments](#escrowed-payments) section below for
additional information.

Note that contracts may have additional arguments specific to that contract.

## Proposals

Proposals are records with **give**, **want**, and **exit** keys.

```js
const myProposal = harden({
  give: { Asset: AmountMath.make(quatloosBrand, 4n)},
  want: { Price: AmountMath.make(moolaBrand, 15n) },
  exit: { onDemand: null },
})
```
**give** and **want** use keywords defined by the contract.
Keywords are unique identifiers per contract, that tie together the proposal,
payments to be escrowed, and payouts to the user.
In the example above, **Asset** and **Price** are the keywords. However, in an auction contract,
the keywords might be **Asset** and **Bid**.

The `AmountMath.make(quatloosBrand, 4n)` is just making an ERTP `amount`, or description of digital assets.
In this case, 4 of our imaginary *Quatloos* currency. `AmountMath.make(moolaBrand, 15n)` is making 
an `amount` of 15 of our imaginary *Moola* currency. (The appended "n" indicates that the numbers are
represented as `BigInts` rather than `Numbers`)

**Note**: It's important to understand that `amounts` are just descriptions of assets with no
intrinsic value. `payments` hold actual digital assets.

`exit` determines how an offer can be can cancelled:
- `onDemand: null`: (Default) The offering party can cancel on demand.
- `waived: null`: The offering party can't cancel and relies entirely on the smart contract to promptly finish their offer.
- `afterDeadline: {…}`: The offer is automatically cancelled after a deadline,
  as determined by its `timer` and `deadline` properties. See
  [Proposals and payments](/reference/zoe-api/zoe.md#proposals-and-payments).

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

**[E(zoe).offer()](/reference/zoe-api/zoe.md#e-zoe-offer-invitation-proposal-paymentkeywordrecord-offerargs)**
returns a **[UserSeat](/reference/zoe-api/user-seat.md)** object. Its name comes from the concept
of "having a seat at the table" for the contract's execution. 


