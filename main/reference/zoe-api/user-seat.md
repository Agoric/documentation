# UserSeat Object

Zoe uses **seats** to access or manipulate offers. They let contracts and users interact
with them. Zoe has two kinds of seats. **ZCFSeats**
are used within contracts and with **zcf** methods. **UserSeats** represent offers external to
Zoe and the contract. The party who exercises an invitation and sends the **offer()** message
to Zoe gets a **UserSeat** that can check payouts' status or retrieve the result of
processing the offer in the contract. This varies, but examples
are a **string** and an **invitation** for another seat.

Also, a **UserSeat** can be handed to an agent outside Zoe and the contract, letting
them query or monitor the current state, access the payouts and result,
and, if it's allowed for this seat, call **tryExit()**.

Since anyone can attempt to exit the seat if they have a reference to it,
you should only share a **UserSeat** with trusted parties.

**UserSeat** includes queries for the associated offer's current state
and an operation to request that the offer exit, as follows:


//Delete?
## E(UserSeat).getCurrentAllocation()
  - Returns: **Promise&lt;[Allocation](./zoe-data-types.md#allocation)>**

An **Allocation** is an **AmountKeywordRecord** of key-value pairs where
the key is a keyword such as **Asset** or **Price** applicable to the
contract. The value is an **amount**.

**Allocations** represent the **amounts** to be paid out to each **seat** on exit. 
(After **exit()** has been called, the final allocation balances, which were transferred to
payouts, continue to be reported.) Normal
reasons for exiting are the user requesting to exit or the contract explicitly choosing
to close out the **seat**. The guarantees also hold if the contract encounters an error or
misbehaves. There are several methods for finding out what **amount** a
current **allocation** is.

An **Allocation** example:

```js
{
  Asset: AmountMath.make(quatloosBrand, 5n),
  Price: AmountMath.make(moolaBrand, 9n)
}
```

## E(UserSeat).getProposal()
  - Returns: **Promise&lt;ProposalRecord>**

A **Proposal** is represented by a **ProposalRecord**. It is the rules
accompanying the escrow of **payments** dictating what the user expects
to get back from Zoe. It has keys **give**, **want**, and
**exit**. **give** and **want** are records with keywords as keys and
**amounts** as values. If it is compatible with the contract, the
contract tries to satisfy it. If not, the contract kicks the **seat** out.

Offer safety is always enforced; if kicked out, the user gets back
what they put in. If the contract attempts to satisfy it, they either
get what they asked for or Zoe ensures they get back their deposit.

Example:

```js
const { want, give, exit } = sellerSeat.getProposal();
```

## E(UserSeat).getPayouts()
  - Returns: **Promise&lt;PaymentPKeywordRecord>**

A **payout** is a **payment** that goes to a party in a successful transaction, redirecting
escrowed assets in accordance with the result of the transaction. Returns a record
containing all the **payout** **payments** associated with the **seat**'s offers.

## E(UserSeat).getPayout(keyword)
  - Returns: **Promise&lt;[Payment](/reference/ertp-api/payment.md)>**

A **payout** is a **payment** that goes to a party in a successful transaction, redirecting
escrowed assets in accordance with the result of the transaction. Returns the **payout**
**payment** associated with the **keyword** argument.

## E(UserSeat).getOfferResult()
  - Returns: **Promise&lt;OfferResult>**

The returned **OfferResult** can be literally anything. For example, in tests
for the Automated Refund Dapp, it's the string "The offer was accepted". In
the Covered Call example, it's a call option, which is an assayable **invitation**
to buy the underlying asset. Strings and invitations are the most common things returned.
The value is set by the returned result of the **offerHandlers** function passed
as an argument to **[zcf.makeInvitation()](./zoe-contract-facet.md#zcf-makeinvitation-offerhandler-description-customproperties-proposalshape))**.


//Delete?
## E(UserSeat).getNotifier()
  - Returns: **Promise&lt;Notifier>**

You use a **notifier** wherever some piece of code has changing state that other
code wants updates on. The updates can be anything the contract wants to publish.
For example, you could notify about price changes, new currency pools, etc. See also
[Notifiers and Subscriptions](/guides/js-programming/notifiers.md)

## E(UserSeat).hasExited()
  - Returns: **Promise&lt;Boolean>**

Returns **true** if the seat has exited, **false** if it's still active.

## E(UserSeat).tryExit()
  - Returns **Void**

Note: Only works if the **seat**'s **proposal** has an **OnDemand** **exit** clause.
Zoe's offer-safety guarantee applies no matter how a **seat**'s interaction with
a contract ends. Under normal
circumstances, the participant might be able to call **tryExit()**, or the
contract might do something explicitly. On exiting, the seat holder
gets its current **allocation** and the **seat** can no longer interact with the contract.


//New Method
## E(UserSeat).numWantsSatisfied()

//New Method
## E(UserSeat).getExitSubscriber()

//New Method
## E(UserSeat).getFinalAllocation()



