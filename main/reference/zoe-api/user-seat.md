# UserSeat Object

Within Zoe, **seats** are used by contracts and users to access or manipulate offers.
Zoe has two kinds of seats. **[ZCFSeats](./zcfseat)**
are used within contracts and with **zcf** methods. **UserSeats** represent offers external to
Zoe and the contract. The party who exercises an **[Invitation](./zoe-data-types#invitation)** and sends the **offer()** message
to Zoe gets a **UserSeat** that can check payouts' status or retrieve the result of
processing the offer in the contract. This varies, but examples
are a **String** and an **Invitation** for another seat.

Also, a **UserSeat** can be handed to an agent outside Zoe and the contract, letting
them query or monitor the current state, access the payouts and result,
and, if it's allowed for this seat, call **tryExit()**.

Take care when sharing a **UserSeat**, since it includes authority to (attempt to) exit the seat.

These methods are all documented as returning Promises, since they are always called remotely,
but that obscures the fact that they are expected to resolve at semantically different times.
Some return a value promptly, and others return a promise that won't be fulfilled until the
seat is exited. **getOfferResult()** resolves at the discretion of the contract. The
descriptions below will call out explicitly the cases in which the value is not guaranteed to
be resolved promptly.

**UserSeat** includes queries for the associated offer's current state
and an operation to request that the offer exit, as follows:

## E(UserSeat).getProposal()
  - Returns: **Promise&lt;ProposalRecord>**

A **Proposal** is represented by a **ProposalRecord**. It is the rules
accompanying the escrow of **[Payments](/reference/ertp-api/payment)** dictating what the user expects
to get back from Zoe. It has keys **give**, **want**, and
**exit**. **give** and **want** are records with **[Keywords](./zoe-data-types#keyword)** as keys and
**[Amounts](/reference/ertp-api/ertp-data-types#amount)** as values. If it is compatible with the contract, the
contract tries to satisfy it. If not, the contract kicks the **seat** out.

Offer safety is always enforced; if kicked out, the user gets back
what they put in. If the contract attempts to satisfy it, they either
get what they asked for or Zoe ensures they get back their deposit.

Example:

```js
const { want, give, exit } = sellerSeat.getProposal();
```

## E(UserSeat).getPayouts()
  - Returns: **Promise&lt;[PaymentPKeywordRecord](./zoe-data-types#keywordrecord)>**

Returns a **Promise** for a [KeywordRecord](./zoe-data-types#keywordrecord) containing **Promises** for all the **Payouts** associated with the **seat**'s offers.
A **Payout** is a **[Payment](/reference/ertp-api/payment)** that goes to a party in a successful transaction,
redirecting escrowed assets in accordance with the result of the transaction.

The promise will be resolved promptly once the seat exits.

## E(UserSeat).getPayout(keyword)
  - **keyword**: **[Keyword](./zoe-data-types#keyword)**
  - Returns: **Promise&lt;[Payment](/reference/ertp-api/payment)>**

Returns a **Promise** for the **Payout** associated with the *keyword* argument.
A **Payout** is a **[Payment](/reference/ertp-api/payment)** that goes to a party in a successful transaction,
redirecting escrowed assets in accordance with the result of the transaction.

The promise will be resolved promptly once the seat exits.

## E(UserSeat).getOfferResult()
  - Returns: **Promise&lt;OfferResult>**

Returns a **Promise** for an **OfferResult**. The **OfferResult** can be any **[Passable](/glossary/#passable)**.
For example, in the [Automatic Refund](/guides/zoe/contracts/automatic-refund) example, it's the string "The offer was accepted".
In the [Covered Call](/guides/zoe/contracts/covered-call) example, it's a call option, which is an assayable **[Invitation](./zoe-data-types#invitation)**
to buy the underlying asset. Strings and invitations are the most common things returned.
The value is the result returned by the **offerHandler** function passed
in the first argument to [`zcf.makeInvitation(...)`](./zoe-contract-facet#zcf-makeinvitation-offerhandler-description-customdetails-proposalshape).

Since the contract can return whatever it wants as an offer result, there is no guarantee that the
promise will resolve promptly.

## E(UserSeat).hasExited()
  - Returns: **Promise&lt;Boolean>**

Returns **true** if the seat has exited, **false** if it's still active. The value is returned
promptly.

If you want to take some action when the seat does exit, use **getExitSubscriber()** and call
```
const subscriber = E(seat).getExitSubscriber();
E.when(E(subscriber).getUpdateSince(), () => takeAction());
```

The eventual send to the subscriber will survive upgrade of the contract. Waiting on any of the
promises would be broken in the case of a contract upgrade.

## E(UserSeat).tryExit()
  - Returns: None.

Note: Only works if the **seat**'s **proposal** has an **OnDemand** **exit** clause.
Zoe's offer-safety guarantee applies no matter how a **seat**'s interaction with
a contract ends. Under normal
circumstances, the participant might be able to call **tryExit()**, or the
contract might do something explicitly. On exiting, the seat holder
gets its current **[Allocation](./zoe-data-types#allocation)** and the **seat** can no longer interact with the contract.

## E(UserSeat).numWantsSatisfied()
- Returns: **Promise&lt;Number>**

Returns a **Promise** for a number which indicates the result of the exited **Proposal**, as described below:

| Number Returned | Description |
| --- | --- |
| 0 | The user didn't get what they wanted from the **Proposal**, so their offer was refunded. |
| 1 | The user got what they wanted from the **Proposal**, so their offer is spent & gone. |

This promise will be resolved promptly once the seat exits.

## E(UserSeat).getExitSubscriber()
- Returns: **Promise&lt;Subscriber>**

Returns a **Promise** for the **Subscriber** for the seat.


## E(UserSeat).getFinalAllocation()
- Returns: **Promise&lt;[Allocation](./zoe-data-types#allocation)>**

Returns a **Promise** for the **Allocation** when the **UserSeat** exits the **proposal**.
This promise will be resolved promptly once the seat exits.
