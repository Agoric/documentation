# Seat objects
Zoe uses *seats* to access or manipulate offers. They let
contracts and users interact  with *active offers*. A seat has two
facets, which we call a `UserSeat` and a `ZCFSeat`, which are
two ways of accessing an offer's information.

- `ZCFSeats` are used within contracts and with ZCF methods. They
handle reallocation of assets between users and are a representation of an
offer by the contract. 

- `UserSeats` represent offers external to Zoe and the contract.. They are
the representation of the offer on the user side and let a contract instance
see what the user has escrowed and ensure when the user gets a payout, 
they get the right amount. 

For example, in an auction, the person putting up the item has both a `ZCFSeat`,
and a `UserSeat` as do each of the bidders. When the auction ends, the contract instance uses these `ZCFSeats` to reallocate the assets between the seller and the  winning bidder. The bidders use their `UserSeats` to check in on what's happening 
with the auction contract instance. When the auction ends, `UserSeat` allocations
are changed to reflect the resulting asset allocation, and payouts go to the `UserSeats`.

## ZCFSeats

A `ZCFSeat` can synchronously query its
associated offer's current state, such as its currently
allocated asset amounts. It can also synchronously 
manipulate the offer.

`ZCFSeats` have a *staged allocation*.  This is the current allocation
value used if and when the seat is *reallocated*  over. Reallocation occurs
when an offer successfully exits and the assets involved are
redistributed to the contract instance participants based on the
instance's result. 

A seat's staged allocation starts out as empty. An empty allocation
means when the offer resolves, no assets are distributed via this
seat. **tyg todo: Is "empty" the right word? The operation is "clear",
but I think "empty" conveys better the effect at least** There are
operations to add and subtract amounts from a seat's staged
allocation as offers are made and rejected, as well as to clear it
back to its initial empty state.  

A `ZCFSeat` has methods that do the following:
- Create and exit a seat.
- Get the seat's 
   - Offer proposal. 
   - Amount allocated for one keyword. 
   - Current allocation for all keywords. 
   - Current staged allocation.
- Check if a proposed allocation satisfies offer safety. 
- Manipulate a seat's staged allocation:
   - Check if the seat has a non-empty staged allocation.
   - Add an amount to the staged allocation.
   - Subtract an amount from the staged allocation.
   - Clear the staged allocation.
- Associate a notifier with the seat's allocation.

Also, `zcf.reallocate()` is called over an offer's `ZCFseats` with
non-empty staged allocations. 

### Creating and Exiting a `ZCFSeat`

#### Creating a `ZCFSeat`

To create a new, empty, `ZCFSeat`, use `zcf.makeEmptySeatKit()`. It
returns both a new `ZCFSeat` and a Promise for a `UserSeat`

Zoe uses seats to represent offers, and has two seat facets (a
particular view or API of an object; there may be multiple such APIs
per object) a `ZCFSeat` and a `UserSeat`. 

```js
const { zcfSeat: mySeat } = zcf.makeEmptySeatKit();
```
#### Exiting a `ZCFSeat`

When you have finished processing an offer, or it fails for some
reason, you *exit* the seat. The relevant methods are:

- `ZCFSeat.hasExited()` which returns `true` if the seat has already
exited, `false` if it's still active. 

- `ZCFSeat.exit(completion)` returns nothing. It is called when
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
   throw seat.fail(Error('Something's wrong'));
   ```
   
### Examining an offer and its contract instance
   
A `ZCFSeat` can get that seat's: 
- Offer proposal. 
- Current statged allocation
- Amount allocated for one keyword. 
- Current allocation for all keywords.
   
A `ProposalRecord` consists of the following three items,
fully defined in the [`E(zoe).offer()` documentation](/zoe/api/zoe.html#e-zoe-offer-invitation-proposal-paymentkeywordrecord).
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
   an `AmountKeywordRecord`. **tyg: Can a decrement result in a negative
   amount value (e.g. -3 Quatloos)?**

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
