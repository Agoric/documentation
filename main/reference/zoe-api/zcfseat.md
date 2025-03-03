# ZCFSeat Object

Zoe uses **seats** to access or manipulate offers. Seats represent active offers and let
contracts and users interact with them. Two kinds of seats represent a single
position. **ZCFSeats** are used within contracts and with **zcf** methods. **UserSeats**
represent offers outside the contract. The two facets provide access to the same allocation,
and changes made from either side affect both.

A **ZCFSeat** includes synchronous queries for the current state of the
associated offer, such as the amounts of assets that are currently
assigned to the **ZCFSeat** Object. It also includes synchronous operations
to manipulate the offer. The queries and operations are as follows:

## aZCFSeat.getSubscriber()

- Returns: **Subscriber**

Returns the **Subscriber** for the seat.

## aZCFSeat.getProposal()

- Returns: **ProposalRecord**

A **Proposal** is represented by a **ProposalRecord**. It is the rules
accompanying the escrow of **payments** dictating what the user expects
to get back from Zoe. It has keys **give**, **want**, and
**exit**. **give** and **want** are records with **[Keywords](./zoe-data-types#keyword)** as keys and
**[Amounts](/reference/ertp-api/ertp-data-types#amount)** as values. The **proposal** is a user's understanding of the
contract that they are entering when they make an offer. See
[`E(zoe).offer(...)`](./zoe#e-zoe-offer-invitation-proposal-paymentpkeywordrecord-offerargs) for full details.

- Example:

```js
const { want, give, exit } = sellerSeat.getProposal();
```

## aZCFSeat.exit(completion)

- **completion**: **Object**
- Returns: None.

Causes the **seat** to exit, preventing further changes to its allocation. All **payouts**,
if any, are made, and the **seat** object can no longer interact with the contract. The
**completion** argument is usually a string, but this is not required. Its only use is for
the notification sent to the corresponding **UserSeat**'s
**[exitSubscriber.](./user-seat#e-userseat-getexitsubscriber)** Any other still open
seats or outstanding promises and the contract instance continue.

**Note**: You should not use **aZCFSeat.exit()** when exiting with an error. Use the method **[aZCFSeat.fail()](#azcfseat-fail-msg)** instead.

## aZCFSeat.fail(msg)

- **msg**: **String**
- Returns: None.

The **seat** exits, displaying the optional **msg** string, if there is one, on the console.
This is equivalent to exiting, except that **exit** is successful while
**ZCFSeat.fail()** signals an error occurred while processing the offer. The contract
still gets its current **allocation** and the **seat** can no longer interact with the contract.
Any other still open seats or outstanding promises and the contract instance continue.

Agoric recommends you exit a seat with an error as follows

```js
throw seat.fail(Error('you did it wrong'));
```

## aZCFSeat.hasExited()

- Returns: **Boolean**

Returns **true** if the **ZCFSeat** has exited, **false** if it is still active.

## aZCFSeat.getAmountAllocated(keyword, brand)

- **keyword**: **[Keyword](./zoe-data-types#keyword)**
- **brand**: **[Brand](/reference/ertp-api/brand)**
- Returns: **[Amount](/reference/ertp-api/ertp-data-types#amount)**

Returns the **Amount** from the part of the **[Allocation](./zoe-data-types#allocation)** that matches the
_keyword_ and _brand_. If the _keyword_ is not in the **Allocation**, it
returns an empty **Amount** of the _brand_ argument. (After
**aZCFSeat.exit()** has been called, it continues to report the final allocation balance,
which was transferred to a payout.)

This is similar to the next method, **getCurrentAllocation()**. **getAmountAllocated()**
gets the **Allocation** of one **Keyword** at a time, while **getCurrentAllocation()** returns
all the current **Allocations** at once.

## aZCFSeat.getCurrentAllocation()

- Returns: **[Allocation](./zoe-data-types#allocation)**

An **Allocation** is an **AmountKeywordRecord** of key-value pairs where
the key is a **[Keyword](./zoe-data-types#keyword)** such as **Asset** or **Price** applicable to the
contract. The value is an **[Amount](/reference/ertp-api/ertp-data-types#amount)** with its **value** and **brand**.

**Allocations** represent the **Amounts** to be paid
out to each **seat** on exit. (After
**exit()** has been called, the final allocation balances, which were transferred to
payouts, continue to be reported.)
Normal reasons for exiting are the user requesting to exit or the contract
explicitly choosing to close out the **seat**. The guarantees also hold if the contract
encounters an error or misbehaves. There are several methods for finding out
what **amount** a current **allocation** is.

This is similar to the previous method, **getAmountAllocated()**. **getAmountAllocated()**
gets the **allocation** of one keyword at a time, while **getCurrentAllocation()** returns
all the current **allocations** at once.

An **Allocation** example:

```js
{
  Asset: AmountMath.make(quatloosBrand, 5n),
  Price: AmountMath.make(quatloosBrand, 9n)
}
```

## aZCFSeat.isOfferSafe(newAllocation)

- **newAllocation**: **[Allocation](./zoe-data-types#allocation)**
- Returns **Boolean**

Takes an **allocation** as an argument and returns **true** if that **allocation**
satisfies offer safety, **false** if it doesn't. Essentially, it checks
**newAllocation** for offer safety, against the **seat**'s **proposal**.
It checks whether **newAllocation** fully satisfies
**proposal.give** (giving a refund) or whether it fully satisfies
**proposal.want**. Both can be fully satisfied. See the ZoeHelper
[**satisfies()**](./zoe-helpers#satisfies-zcf-seat-update) method for more details.
