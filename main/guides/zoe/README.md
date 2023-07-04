# Zoe Overview

Zoe plays a key role in establishing trust between users and developers. How? In some other big networks like Ethereum, a smart contract developer has the full access to users assets inside the contract code. This enables some malicious developers to perform some bad actions. But in an ocaps system this should never happen. The motto in a ocaps system is: Do not bring security, remove insecurity. Zoe brings this mindset to smart contract development. The way Zoe does that is through escrowing. A smart contract is where mutually suspicious parties trade rights. Zoe locks/escrows the rights of all parties until one of the conditions is met in the contract. A developer has no direct access to rights but instead they implement the required logic by using Amounts. Remember Amounts from ERTP section? This is how ERTP and Zoe works together to establish secure trading of erights.

------------------

Zoe is the layer where all the smart contracts are installed and run. It plays a key role in establishing trust between users and developers. How? In some other big networks like Ethereum, a smart contract developer has the full access to users assets inside the contract code. This enables some malicious developers to perform some bad actions. But in an ocaps system this should never happen. The motto in a ocaps system is: Do not bring security, remove insecurity. Zoe brings this mindset to smart contract development. The way Zoe does that is through escrowing. A smart contract is where mutually suspicious parties trade rights. Zoe locks/escrows the rights of all parties until one of the conditions is met in the contract. A developer has no direct access to rights but instead they implement the required logic by using Amounts. Remember Amounts from ERTP section? This is how ERTP and Zoe works together to establish secure trading of erights.

## Offer Safety

*Offer safety* means that the user is guaranteed to either
get what they wanted or get back a full refund of what they offered.

when a user makes an offer
and it is escrowed with Zoe, Zoe guarantees that the user either
gets back what they said they wanted, or gets back (refunded) what they
originally offered and escrowed.

When a user escrows with Zoe, they get back
a JavaScript promise for a future payout. Let's
look a particular example to see how this works.


## Seats

## Price Authority

A **[Price Authority](/reference/zoe-api/price-authority.md)** can be used in contracts 
(usually specified in the terms of a contract) to provide a price feed, on-demand quotes, 
and wakeups for various time and price conditions.


## Receiving a Quote

A **[PriceAuthority](/reference/zoe-api/price-authority.md)**  has a number of different methods that will return
official **[PriceQuotes](/reference/zoe-api/zoe-data-types.md#pricequote)**. A **PriceQuote** is a
record with an **[Amount](/reference/ertp-api/ertp-data-types.md#amount)** and a **[Payment](/reference/ertp-api/payment.md)**,
where the **Amount** is also the current balance of the **Payment**:

```js
const { quoteAmount, quotePayment } = priceQuote;
```

Because these are ERTP **Amounts** and **Payments**, they have **[Issuers](/reference/ertp-api/issuer.md)**, and
the **Payments** are minted by an ERTP **[Mint](/reference/ertp-api/mint.md)**. A **QuoteIssuer** and 
**Mint** can be shared by several **PriceAuthorities**, and a single **PriceAuthority** may
use several **QuoteIssuers**.

Importantly, you can confirm the **[Brand](/reference/ertp-api/brand.md)** of a quote and that it was minted by the
**Mint** associated with the **QuoteIssuer** by using the **QuoteIssuer** to obtain the
**QuoteAmount** of the **QuotePayment**:

```js
const verifiedQuoteAmount = await E(quoteIssuer).getAmountOf(quotePayment);
```

Once you have a **QuoteAmount** (or a **VerifiedQuoteAmount**), you can extract the
quoted **Amounts**:

```js
const [{ value: { amountIn, amountOut, timestamp, timer }] = quoteAmount;
```

This means that the **PriceAuthority** asserts that when *timestamp* according to
*timer* happened, you could sell *amountIn* and receive *amountOut* for it.
*amountIn* and *amountOut* are ERTP **Amounts** for the *brandIn* and *brandOut* you
requested.

## Mutable Price Quotes

**MutableQuote**'s method **getPromise()** returns a **Promise** for a **PriceQuote**,
which is the same as what is returned by the **[quoteWhenLTE()](/reference/zoe-api/price-authority.md#e-priceauthority-quotewhenlte-amountin-amountoutlimit)** API method and variants.
Effectively, the non-mutable price quote methods return a single **PriceQuote**, while
the mutable price quote methods return a reusable object which can be manipulated
by changing its trigger levels or by cancelling it.

## Zoe

### Context
"*...Contracts enable the exchange of rights across these protected domains.*"[2]

Once we obtain `tradeable electronic rights`, we need a secure layer to enable trading of those rights.
That is exactly what a contract does as the quote above states. But this raises another problem. How are we going to
secure the contract from malicious users? In the diagram above Alice and Bob agree on[2];
* The issuers of each of the rights at stake.
* The source code of the contract.
* Who is to play which side of the contract.
* A third party they mutually trust to run their agreed code, *whatever* it is, honestly

This third party Alice and Bob mutually trust to run their code is **Contract Host**. `Zoe` is designed by Agoric
to serve as the contract host in Agoric ecosystem. It is the layer where all the smart contracts are installed
and run.

`Zoe` plays a key role in establishing trust between users and developers. How? In some other big networks like 
Ethereum, a smart contract developer has the full access to users assets inside the contract code. This enables 
some malicious developers to perform some bad actions. But in an `ocaps` system this should never happen. The
motto in a `ocaps` system is: *Do not bring security, remove insecurity.* `Zoe` brings this mindset to smart contract
development. The way `Zoe` does that is through `escrowing`. A smart contract is where mutually suspicious parties
trade rights. `Zoe` locks/escrows the rights of all parties until one of the conditions is met in the contract. A
developer has no direct access to rights but instead they implement the required logic by using `Amount`s. Remember `Amount`s 
from ERTP section? This is how `ERTP` and `Zoe` works together to establish secure trading of `erights`.

### Structure Of A Zoe Contract

`Zoe` acts as the *Contract Host* to secure users from malicious developers but it is also a rich framework for smart contract
developers to show their skills and creativity.

In Agoric smart contracts are deployed and accessed through `Zoe`. But, does `Zoe` accept every code installed as a smart contract?
Of course not, the smart contracts must have the following structure;


```js
// @ts-check
// Checks the types as defined in JSDoc comments

// Add imports here

// Optional: you may wish to use the Zoe helpers in
// @agoric/zoe/src/contractSupport/index.js
import { swap as _ } from '@agoric/zoe/src/contractSupport/index.js';

// Import the Zoe types
import '@agoric/zoe/exported.js';

/**
* [Contract Description Here]
*
* @type {ContractStartFn}
  */
const start = (zcf, _privateArgs) => {
// ZCF: the Zoe Contract Facet

// privateArgs: any arguments to be made available to the contract
// code by the contract owner that should not be in the public
// terms.

// Add contract logic here, including the
// handling of offers and the making of invitations.

// Example: This is an example of an offerHandler
// which just gives a refund payout automatically.
const myOfferHandler = zcfSeat => {
zcfSeat.exit();
const offerResult = 'success';
return offerResult;
};

// Example: This is an invitation that, if used to make
// an offer will trigger `myOfferHandler`, giving a
// refund automatically.
const invitation = zcf.makeInvitation(myOfferHandler, 'myInvitation');

// Optional: Methods added to this object are available
// to the creator of the instance.
const creatorFacet = {};

// Optional: Methods added to this object are available
// to anyone who knows about the contract instance.
// Price queries and other information requests can go here.
const publicFacet = {};

return harden({
   creatorInvitation: invitation, // optional
   creatorFacet, // optional
   publicFacet, // optional
  });
};

harden(start);
export { start };
```

Above is a sample `Zoe` contract in it's the simplest form. However, it still contains all structural parts of a `Zoe` 
contract. Let's breakdown these components one bye one;
1. Every `Zoe` contract must export a method called `start`. It's usually the last line of the contract.

   ```js
   export { start }; 
   ```
2. The `start` method should accept a `zcf` object as its first argument. `zcf` stands for `Zoe Contract Facet` which is an API the smart contract developers to 
interact with `Zoe`.
3. Use arrow function definitions instead of `function` keyword;

   ```js
   // Do
   const start = (zcf) => {
    // Method body
   }
  
   // Do not do
   function start(zcf) {
    // Method body
   }
   ```
4. By convention, most `Zoe` contracts return two APIs: `creatorFacet` and `publicFacet`;

   * **creatorFacet**: The word `creator` means the user who deployed this contract. Therefore, only this API should contain methods that have administrative powers.
     `creatorFacet` is only available during the deployment of the contract. So the creator should hold on to this reference. Because once it's gone, it's gone.
   * **publicFacet**: This is the API contract exposes to the whole world. `publicFacet` is accessible via the `Zoe` interface.

### Offers

The parties agreed to trade rights over a trusted contract host use `Offer`s to enter the contract. An `Offer` has a special structure that enables `Zoe` to 
secure every user's rights. This security model is also called `Offer Safety` but we'll get to that in a bit. For now, let's focus on `Offer`s. Below is a 
sample `Zoe Offer`:

```js
const userSeat = await E(zoe).offer(
  invitation,
  proposal,
  payments,
);
```

Let's breakdown the `offer()` method's arguments first:

* **invitation**: `Zoe` expects a reference from users to point the method they want to use to interact with the contract. This kind of reference is called an `invitation`. The `zcf.makeInvitation()` is a special `Zoe` method used for creating invitations.
* **proposal**: Proposal is a js record that has three important properties: `give`, `want` and `exit`. Let's review a sample proposal;

  ```js
  const myProposal = harden({
    give: { Asset: AmountMath.make(quatloosBrand, 4n) },
    want: { Price: AmountMath.make(moolaBrand, 15n) },
    exit: { afterDeadline: {
      timer,
      deadline: 100n,
    }}
  });
  ```

  * `give`: User specify what they are willing to pay as an amount, not actual money.
  * `want`: User specify what they want in return, again as an amount not actual money. 
  * `exit`: The duration of time before this offer expires.
 
  `Asset` and `Price` are keywords used to identify the rights in a meaningful way.

  * **payments**: Payment is js record that `Zoe` uses to escrow the actual assets. It has the following structre;

    ```js
    const paymentKeywordRecord = {
        'Asset' : quatloosPayment,
    };  
    ```
    Notice that the keyword `Asset` matches the one in the `give` property of the proposal. The `quatloosPayment` is an ERTP `Payment` object that contains an amount of quatloos greater than or equal to the one in the `give` property of the proposal record.

    > **Important**: If there's an amount specified in the `give` section, there must be a corresponding record involving the payment for that amount in the `give` section.
 
#### What Happens After An Offer Is Executed?

Since a trade is a both-way transaction, users will probably want something in return of what they paid.

```js
const userSeat = await E(zoe).offer(
  invitation,
  proposal,
  payments,
);
```

A `userSeat` is returned from the `offer()` method. To make sure an offer is executed correctly, one must invoke `getOfferResult` method.

```js
const offerResult = await E(userSeat).getOfferResult()
```

The `offerResult` is whatever the contract returns, do not have specific structure. We call this to make sure is there's an error thrown while executing the contract
code.

Once we're sure the code executed without any error, we can withdraw our assets;

```js
const moolaPayment = await E(userSeat).getPayout('Price');
```

This is how we withdraw our `rights` from a contract using `Zoe` and `Offers`. 

### Two Sides Of Zoe

Notice that in *Figure 4*, there are two chairs inside the `Contract Host`. The terminology `Zoe` uses is like this: Every transaction is some kind of `Offer` and all participants wishing to trade rights each have a `seat` at the table. So this should explain why a `userSeat` is returned from an offer. 

#### But wait, what are those two sides then?

We can think of `Zoe` framework as the sum of two distinct components;

* `Zoe Contract Facet(ZCF)`: An API only exposed to the contract developers. Client applications have no way of interacting with this API.
* `Zoe Service`: This API is exposed to the whole world. Whether it's a client application or a user playing around with REPL, they all can access to this API.

#### Which API does a `seat` belong?

Whenever you try to understand which API (`ZCF` or `Zoe Service`) an object is a part of, ask yourself this question: Is this object synchronously accessible from within the contract? If yes, look for that object in [ZCF Docs](https://docs.agoric.com/reference/zoe-api/zoe-contract-facet.html). Otherwise, search for it in the [Zoe Service Docs](https://docs.agoric.com/reference/zoe-api/zoe.html).

Let's apply the above hint to `userSeat`,

* `userSeat` is returned from an offer
* We get the `offerResult` from this `userSeat`
  * `offerResult` is what the contract returns after executing its code
* We withdraw our `erights` from this `userSeat`
* Contract code does not have a synchronous access to this object

Conclusion: `userSeat` is part of the `Zoe Service` API.

#### How does a contract pass rights to a `userSeat`? Enter `zcfSeat`!

`zcfSeat` is what is handed to the contract per offer execution. It contains the user's payments in a escrowed state(contract developer cannot access) and the proposal itself so that the contract developers can enforce required logic. Once the assets are reallocated between `zcfSeat`s inside a contract, they can be withdrawn from the `userSeat`.

### Contract Development Experience

#### How do you feel about TDD?

Smart Contract Development is a field that it's almost a `must` to do TDD since test environments are too costly in terms of developer feedback time.

#### Enter `Ava`

Agoric uses `ava` as their unit testing framework. It's useful to [check out it's docs](https://github.com/avajs/ava) before starting the development.

Let's see some code!
