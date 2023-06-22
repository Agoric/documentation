# ZCFSeat Object

Zoe uses **seats** to access or manipulate offers. Seats represent active offers and let
contracts and users interact with them. Two kinds of seats represent a single
position. **ZCFSeats** are used within contracts and with **zcf** methods.  **UserSeats**
represent offers outside the contract. The two facets provide access to the same allocation,
and changes made from either side affect both.

A **ZCFSeat** includes synchronous queries for the current state of the
associated offer, such as the amounts of assets that are currently# ZCFSeat Object

Zoe uses **seats** to access or manipulate offers. Seats represent active offers and let
contracts and users interact with them. Two kinds of seats represent a single
position. **ZCFSeats** are used within contracts and with **zcf** methods.  **UserSeats**
represent offers outside the contract. The two facets provide access to the same allocation,
and changes made from either side affect both.

A **ZCFSeat** includes synchronous queries for the current state of the
associated offer, such as the amounts of assets that are currently
allocated to the offer. It also includes synchronous operations
to manipulate the offer. The queries and operations are as follows:

## aZCFSeat.getSubscriber()
- Returns: **Subscriber**

Returns the **Subscriber** for the seat.

## aZCFSeat.getProposal()
  - Returns: **ProposalRecord**

A **Proposal** is represented by a **ProposalRecord**. It is the rules
accompanying the escrow of **payments** dictating what the user expects
to get back from Zoe. It has keys **give**, **want**, and
**exit**. **give** and **want** are records with **[Keywords](./zoe-data-types.md#keyword)** as keys and
**[Amounts](/reference/ertp-api/ertp-data-types.md#amount)** as values. The **proposal** is a user's understanding of the
contract that they are entering when they make an offer. See
[**E(zoe).offer()**](./zoe.md#e-zoe-offer-invitation-proposal-paymentkeywordrecord-offerargs) for full details.

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
**[exitSubscriber.](./user-seat.md#e-userseat-getexitsubscriber)** Any other still open
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
  - **keyword**: **[Keyword](./zoe-data-types.md#keyword)**
  - **brand**: **[Brand](/reference/ertp-api/brand.md)**
  - Returns: **[Amount](/reference/ertp-api/ertp-data-types.md#amount)**

Returns the **Amount** from the part of the **[Allocation](./zoe-data-types.md#allocation)** that matches the
*keyword* and *brand*. If the *keyword* is not in the **Allocation**, it
returns an empty **Amount** of the *brand* argument. (After
**aZCFSeat.exit()** has been called, it continues to report the final allocation balance, 
which was transferred to a payout.)

This is similar to the next method, **getCurrentAllocation()**. **getAmountAllocated()**
gets the **Allocation** of one **Keyword** at a time, while **getCurrentAllocation()** returns
all the current **Allocations** at once.

## aZCFSeat.getCurrentAllocation()
  - Returns: **[Allocation](./zoe-data-types.md#allocation)**

An **Allocation** is an **AmountKeywordRecord** of key-value pairs where
the key is a **[Keyword](./zoe-data-types.md#keyword)** such as **Asset** or **Price** applicable to the
contract. The value is an **[Amount](/reference/ertp-api/ertp-data-types.md#amount)** with its **value** and **brand**.

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
   - **newAllocation**: **[Allocation](./zoe-data-types.md#allocation)**
   - Returns **Boolean**

Takes an **allocation** as an argument and returns **true** if that **allocation**
satisfies offer safety, **false** if it doesn't. Essentially, it checks
**newAllocation** for offer safety, against the **seat**'s **proposal**.
It checks whether **newAllocation** fully satisfies
**proposal.give** (giving a refund) or whether it fully satisfies
**proposal.want**. Both can be fully satisfied. See the ZoeHelper
[**satisfies()**](./zoe-helpers.md#satisfies-zcf-seat-update) method for more details.

::: warning DEPRECATED
## aZCFSeat.getStagedAllocation()
  - Returns: **[Allocation](./zoe-data-types.md#allocation)**

Gets and returns the **stagedAllocation**, which is the **Allocation** committed if the seat is
reallocated over, if offer safety holds, and rights are conserved.

**Note**: This method has been deprecated. Use **[atomicRearrange()](./zoe-helpers.md#atomicrearrange-zcf-transfers)** instead.
:::

::: warning DEPRECATED
## aZCFSeat.hasStagedAllocation()
  - Returns: **Boolean**

Returns **true** if there is a staged allocation, i.e., whether **ZCFSeat.incrementBy()** or
**ZCFSeat.decrementBy()** has been called and **ZCFSeat.clear()**
and **reallocate()** have not. Otherwise returns **false**.

**Note**: This method has been deprecated. Use **[atomicRearrange()](./zoe-helpers.md#atomicrearrange-zcf-transfers)** instead.
:::

::: warning DEPRECATED
## aZCFSeat.incrementBy(amountKeywordRecord)
  - **amountKeywordRecord**: **[AmountKeywordRecord](./zoe-data-types.md#amountkeywordrecord)**
  - Returns: **AmountKeyRecord**

Adds the **amountKeywordRecord** argument to the **ZCFseat**'s staged allocation and returns the 
same **amountKeywordRecord** so it can be reused in another call. Note that this lets
**zcfSeat1.incrementBy(zcfSeat2.decrementBy(amountKeywordRecord))** work as a usage pattern. 

Note that you can add amounts to original or staged allocations which do not have the
specified **[Keyword](./zoe-data-types.md#keyword)** for the amount. The result is for the **Keyword** and amount to become part
of the allocation. For example, if we start with a new, empty, allocation:
```js
// Make an empty seat.
const { zcfSeat: zcfSeat1 } = zcf.makeEmptySeatKit();  
// The allocation is currently empty, i.e. `{}`
const stagedAllocation = zcfSeat1.getStagedAllocation();
const empty = AmountMath.makeEmpty(brand, AssetKind.NAT);
// Try to incrementBy empty. This succeeds, and the keyword is added
// with an empty amount.
zcfSeat1.incrementBy({ IST: empty }); 
t.deepEqual(zcfSeat1.getStagedAllocation(), { IST: empty  });
```
While this incremented the allocation by an empty amount, any amount would have been added to the 
allocation in the same way.

**Note**: This method has been deprecated. Use **[atomicRearrange()](./zoe-helpers.md#atomicrearrange-zcf-transfers)** instead.
:::

::: warning DEPRECATED
## aZCFSeat.decrementBy(amountKeywordRecord)
  - **amountKeywordRecord**: **[AmountKeywordRecord](./zoe-data-types.md#amountkeywordrecord)**
  - Returns: **AmountKeywordRecord**

Subtracts the **amountKeywordRecord** argument from the **ZCFseat**'s staged allocation and returns the
same **amountKeywordRecord** so it can be used in another call.  Note that this lets
**zcfSeat1.incrementBy(zcfSeat2.decrementBy(amountKeywordRecord))** work as a usage pattern.  

The amounts to subtract cannot be greater than the staged allocation (i.e., negative 
results are not allowed).

**decrementBy()** has different behavior from **incrementBy()** if the original or staged allocation 
does not have the **[Keyword](./zoe-data-types.md#keyword)** specified for an amount in the **amountKeywordRecord** argument. There are two
cases to look at; when the corresponding amount to subtract is empty and when it isn't. 
```js
// Make an empty seat.
const { zcfSeat: zcfSeat1 } = zcf.makeEmptySeatKit();  
// The allocation is currently {}
const stagedAllocation = zcfSeat1.getStagedAllocation();
const empty = AmountMath.makeEmpty(brand, AssetKind.NAT);
// decrementBy empty does not throw, and does not add a keyword 
zcfSeat1.decrementBy({ IST: empty });
t.deepEqual(zcfSeat1.getStagedAllocation(), {});
```
The result here is **not** to add the **Keyword** to the allocation. It wasn't there to begin with, and
the operation was to try to subtract it from the allocation. Subtracting something that's not there
does not add it to the original value. For example, if I tell you I'm taking away the Mona Lisa from
you and you are not the Louvre and don't have it, you still don't have it after I try to take it away.
In the above example, trying to take away an empty amount from an empty allocation is effectively a
null operation; the allocation is still empty, didn't add the new **Keyword**, and no error is thrown. 

However, decrementing a non-empty amount from an empty allocation has a different result. For example:
```js
// Make an empty seat.
const { zcfSeat: zcfSeat1 } = zcf.makeEmptySeatKit();  
// The allocation is currently {}
const stagedAllocation = zcfSeat1.getStagedAllocation();
// decrementBy throws for a keyword that does not exist on the stagedAllocation and a non-empty amount
zcfSeat1.decrementBy({ IST: runFee });
```
It throws an error because you cannot subtract something from nothing. So trying to decrement an empty
allocation by a non-empty amount is an error, while decrementing an empty allocation by an empty amount
is effectively a null operation with no effects.

**Note**: This method has been deprecated. Use **[atomicRearrange()](./zoe-helpers.md#atomicrearrange-zcf-transfers)** instead.
:::

::: warning DEPRECATED
## aZCFSeat.clear()
  - Returns: None.

Deletes the **ZCFSeat**'s current staged allocation, if any,

**Note**: This method has been deprecated. Use **[atomicRearrange()](./zoe-helpers.md#atomicrearrange-zcf-transfers)** instead.
:::






