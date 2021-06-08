# Seat objects
Zoe uses *seats* to access or manipulate offers. They let
contracts and users interact  with *active offers*. A seat has two
facets, which we call a `UserSeat` and a `ZCFSeat`, which are
two ways of accessing an offer's information.

- `ZCFSeats` are used within contracts and with ZCF methods. They
handle reallocation of assets between users and are a representation of an
offer by the contract. 

- `UserSeats` represent offers on the user side. Importantly, only the user
  who made the offer gets access to the `UserSeat` for that offer. The user 
  can exit their seat and get their payout by calling methods on the `UserSeat` facet. 

For example, in an auction, the seller's offer has two representations, the `UserSeat` 
that the seller gets as the return value of making the offer, and the `ZCFSeat` that 
the contract receives as an argument to the offer's handler. The bidders have `UserSeats` 
as well, and the contract receives associated `ZCFSeats` for each bid. When the auction ends,
`UserSeat` allocations are changed to reflect the resulting asset allocation, and payouts 
go to the `UserSeats`.

## ZCFSeats

A `ZCFSeat` can synchronously query its
associated offer's current state, such as its currently
allocated asset amounts. It can also synchronously 
manipulate the offer.  **tyg todo: Kate: "What does "manipulate the offer" mean? I think we should be more clear, because this sounds like the contract can change the proposal, which it cannot. It can only change the staged allocation, and reallocate." Tom: "My mistake. I thought staged allocations would change when the terms of an offer were changed due to negotiation or buyer's decision (i.e. I'm outbid in an auction, so I change my bid to be higher.)"**

`ZCFSeats` have a *staged allocation*.  When a seat is *reallocated* over, 
the staged allocation is *committed* and becomes the current allocation, 
if offer safety and rights conservation hold. 

A seat's staged allocation is the result of deltas from its current allocation
value. There are operations to add and subtract amounts from a seat's staged
allocation, as well as to clear it
back to its initial current allocation state, which has the last committed values.  

There are methods to do the following with `ZCFSeats`:
- Create and exit a seat.
- Get the seat's 
   - Offer proposal. 
   - Amount allocated for one keyword. 
   - Current allocation for all keywords. 
   - Current staged allocation.
- Check if a proposed allocation satisfies offer safety. 
- Manipulate a seat's staged allocation:
   - Check if the seat has a staged allocation.
   - Add an amount to the staged allocation.
   - Subtract an amount from the staged allocation.
   - Clear the staged allocation.
- Get a notifier for the seat's allocation.

Also, `zcf.reallocate()` is called over an offer's `ZCFseats` with
non-empty staged allocations. **tyg todo: Kate suggested 
"Also, `zcf.reallocate()` is called over a number of `ZCFseats` with staged allocations."
Tom: "I thought you said all the seats with staged allocations had to be included in
the argument array? In any event, can we please use a different phrasing than "a number of"?
That's a pet writing peeve of mine, as it doesn't say anything. "A large (or small) number of"
indicates magnitude, but "a number of" could be 1, 0, -343, 1,023,534, etc.**

### Creating and Exiting a `ZCFSeat`

#### Creating a `ZCFSeat`

**tyg todo: Kate: "The most common case (probably over 90% of cases) is that the ZCFSeat is sent to the contract by ZCF as the argument to the offerHandler for that offer. I think we should not lead with makeEmptySeatKit here. That is only for the case in which the contract wants to make another seat (without any offer safety or payments escrowed) for accounting purposes, such as the seat associated with a liquidity pool."

To create a new, empty, `ZCFSeat`, use `zcf.makeEmptySeatKit()`. It
returns both a new `ZCFSeat` and a Promise for a `UserSeat`

Zoe uses seats to represent offers, and has two seat facets (a
particular view or API of an object; there may be multiple such APIs
per object) a `ZCFSeat` and a `UserSeat`. 

```js
const { zcfSeat: mySeat } = zcf.makeEmptySeatKit();
```
#### Exiting a `ZCFSeat`

When the contract code has finished processing an offer, or it fails for some
reason, the contract code *exits* the seat. The relevant methods are:

- `ZCFSeat.hasExited()` which returns `true` if the seat has already
exited, `false` if it's still active. 

- `ZCFSeat.exit(completion)` returns nothing. 
  **tyg todo: Kate: "There's a lot to fix in this paragraph. First, seats don't process anything. Also, exit happens before a payout can occur, not offer. The seat is not destroyed. You can still call methods on it, but apart from the method for getting the current allocation, those methods will error. There's no such thing as "its object" - the seat is an object -and the seat doesn't interact with the contract instance. The contract code calls methods on the seat, or passes the seat to reallocate."**
  It is called when
  a seat successfully finishes processing an offer, including making any
  payouts. The seat is destroyed, and its object can no longer
  interact with its previously associated contract instance.

  The `completion` argument is usually a string, but can be any
  object. It's only used for the notification sent to the contract
  instance's `done()` function. `exit()` does not affect any other
  open seats, outstanding promises, or the contract instance itself. 
   
- `ZCFSeat.fail(msg)` also returns nothing. It is called when an error
   happened when the seat tried to process its offer. The `msg` argument
   should be an appropriate error message for whatever happened. While the
   contract instance still gets its current allocation, the seat is
   destroyed and can no longer interact with the contract
   instance. `fail()` does not affect any other open seats,
   outstanding promises, or the contract instance itself. 

   Agoric recommends using `fail()` to exit a seat with an error as
   follows: 
   ```js
   throw seat.fail(Error('Something is wrong'));
   ```
   
### Examining an offer and its contract instance
   
A `ZCFSeat` can get that seat's: 
- Offer proposal. 
- Current statged allocation
- Amount allocated for one keyword. 
- Current allocation for all keywords.
   
A `ProposalRecord` consists of the following three items,
fully defined in the [`E(zoe).offer()` documentation](/zoe/api/zoe.md#e-zoe-offer-invitation-proposal-paymentkeywordrecord).
For more
information about proposals, see elsewhere
in the [Zoe Guide](/zoe/guide/proposal.md#proposals). 
- `want`: a record with keywords as keys and amounts as values.
- `give`: a record with keywords as keys and amounts as values.
- `exit`: the conditions under which the seat/offer can exit.

Allocations represent the amounts to be paid out to each seat for
a contract instance offer on exit, whether successful or not.
Normal reasons for exiting are the user requesting to exit or the contract
explicitly choosing to close out the seat. The guarantees also hold
if the contract encounters an error or misbehaves. There are several
methods for finding out what amount a current allocation is. 

- `ZCFSeat.getProposal()` returns a `ProposalRecord` representing the
   seat's associated offer proposal. This specifies the escrow
   rules defining what the user who made the offer expects to get back
   from it via Zoe. 
   
   Example:
   `const { want, give, exit } = sellerSeat.getProposal();`

- `ZCFSeat.getStagedAllocation()` returns the seat's current
   statged allocation. This may change, as offers can be altered
   in response to how they are received. For example,
   if an offer of 10 Quatloos is rejected, a prospective buyer
   may want to increase their offer to 15 Quatloos. 
   **tyg todo: Chris: "It can change from the contract reallocating, but the user on the other side can't add to or subtract from the balance."**
 
- `ZCFSeat.getAmountAllocated(keyword, brand)` returns the amount from
   the part of the allocation that matches the keyword and brand. If
   the keyword is not in the allocation, it returns an empty amount of
   the brand argument (i.e. if a brand argument of the fungible "Quatloos"
   is not in the allocation, it returns an amount of brand Quatloos and value
   0). If you call this after the associated seat has exited or failed, it still reports the
   final, transferred to a payout,  allocation balance.

- `ZCFSeat.getCurrentAllocation()` returns the offer's current
   allocation as an
   [`AmountKeywordRecord`](/zoe/api/zoe-contract-facet.md#amountkeywordrecord)
   of key-value pairs. Each
   key is a keyword such as Asset or Price applicable to the
   contract. Each value is the amount with its value and brand
   associated with that keyword.

This is similar to the previous method, `getAmountAllocated()`.It
gets the allocation of one keyword at a time, while `getCurrentAllocation()`
returns all the current allocations at once.

An Allocation example:
```js
  {
    Asset: AmountMath.make(quatloosBrand, 5n),
    Price: AmountMath.make(quatloosBrand, 9n)
  }
```

### Checking an offer for offer safety

- `ZCFSeat.isOfferSafe(newAllocation)` 
    takes an allocation as an argument and returns true if that allocation satisfies offer
    safety, false if is doesn't. Essentially, it checks newAllocation for offer safety,
	against     the seat's proposal. It checks whether newAllocation fully satisfies
	proposal.give (giving a refund) or whether it fully satisfies proposal.want. Both can be
	fully satisfied. See the ZoeHelper satisfies() method for more details. 

### Manipulating a staged allocation

Recall that a staged allocation consists of the current amounts that would be
distributed to the seat's owner were the offer to resolve and a reallocation of
assets to occur. You can add or subtract amounts from a staged allocation, 
or delete the entire allocation.

The increment and decrement methods both take an `AmountKeywordRecord`
as an argument. See the [`AmountKeywordRecord` section](/zoe/api/zoe-contract-facet.md#amountkeywordrecord) of the
Zoe Contract Facet API Reference for a full description with examples.

- `ZCFSeat.hasStagedAllocation()` Returns true if there is a staged allocation, i.e.
   whether `incrementBy()` or `decrementBy()` has been called 
   and `clear()` was not the last of those three methods called. 
   Otherwise returns false.

- `ZCFSeat.incrementBy(amountKeywordRecord)`
   Adds the `amountKeywordRecord` argument to the ZCFseat's staged 
   allocation and returns the resulting new staged allocation value as 
   an `AmountKeywordRecord`. 
   
- `ZCFSeat.decrementBy(amountKeywordRecord)`
   Subtracts the `amountKeywordRecord` argument to the ZCFseat's staged 
   allocation and returns the resulting new staged allocation value as 
   an `AmountKeywordRecord`. 

- `ZCFSeat.clear()`
   Deletes the ZCFSeat's current staged allocation, if any. Returns
   nothing. 

### Associate a notifier with the seat's allocation

`ZCFSeat.getNotifier()` returns a *notifier* associated with the seat's allocation. 
It provides updates when this seat's allocation changes, and tells when the seat has been exited. For more on notifiers, see the [JavaScript Programming Guide](/guides/js-programming/notifiers.md#notifiers-and-subscriptions).

## Reallocating over `ZCFSeats`

Let's say we have two `ZCFSeats` in a contract instance, and have assigned them to
variables named `seller` and `buyer`. To account for the transfer of assets from a
successful sale, our code might look like:
```js
buyer.decrementBy({ [buyerKeyword]: saleAmount });
seller.incrementBy({ [sellerKeyword]: saleAmount });
zcf.reallocate(buyer, seller);
```
There the staged allocations of the buyer and seller's `ZCFSeats` were changed to reflect the results of the transaction. `zcf.reallocate()` was then called on the
seats with staged allocations to actually reallocate the seat assets and cause the
appropriate payouts to each.
