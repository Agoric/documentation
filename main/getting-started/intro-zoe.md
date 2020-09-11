# Introduction to Zoe

**Note:** Before reading this, you should be familiar with [ERTP basics](/getting-started/ertp-introduction/). 

::: tip Alpha status
Zoe is currently at Alpha status. It has not yet been
formally tested or hardened. It is not yet of production quality.
:::

This is an introduction to Zoe, Agoric's smart contract framework. 
The [Zoe Guide](/zoe/guide/) has additional information, 
including concepts not covered here. 

You can run different types of smart contracts on Zoe. In this document, 
for the most part we focus on Agoric’s Atomic Swap demo contract, but 
sometimes refer to how Zoe works with other contract types.

## What is Zoe?

**For users**: Zoe guarantees smart contract users either get what 
they wanted or get a full refund. Even if the smart contract is buggy or malicious. 

**For developers**: Zoe is a framework for writing and running smart contracts. 
It provides a safety net so you can focus on what your smart contract does best, 
without worrying about users losing their assets due to a bug in your code. 

Many contracts are installed on Zoe, including [several Agoric-written ones](https://agoric.com/documentation/zoe/guide/contracts/) 
to help get you started. 

## The simple Atomic Swap contract

In this document, we’ll mostly be looking at Agoric’s [Atomic Swap contract](https://agoric.com/documentation/zoe/guide/contracts/atomic-swap.html) to illustrate how contracts use Zoe. 

Atomic Swap has two users swapping for each other’s assets. We’ll 
try to let you know when aspects of the contract are specific to 
a basic swap operation. Other types of contracts, such as auctions, may do 
things differently. 

The annotated code for our example is [here](https://agoric.com/documentation/zoe/guide/contracts/atomic-swap.html). 
The source code is [here](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/src/contracts/atomicSwap.js), 
Tests are [here](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/test/unitTests/contracts/test-atomicSwap.js). The tests have two “characters”, Alice, who makes the initial offer, and Bob, who responds to that offer. 

## Installing and instantiating contracts on Zoe

To use a contract, it needs to be *installed* on Zoe. This is putting
the contract’s source code, consisting of JavaScript plus ERTP and Zoe API 
methods, on Zoe. 

When you install a contract on Zoe, you receive an `installation`, which 
is an *opaque JavaScript object*  used to refer to the installed contract 
source code. Agoric uses such objects as references since they cannot be 
forged. For example
```js
// bundleSource takes source code files and 
// bundles them together in the format install expects.
import bundleSource from '@agoric/bundle-source';
const bundle = await bundleSource(pathResolve(`./src/contract.js`));
const installationP = await E(zoe).install(bundle);
```

To actually use a contract, you have to *instantiate* it by 
calling `E(zoe).startInstance(installation, issuerKeywordRecord, terms)`. 
Multiple *instances* of any Zoe-installed contract can execute simultaneously. 
For clarity, in our documentation a *contract* is the installed code that 
defines how the contract works. A *contract instance* or *instance* is an active 
execution of the contract code. 

For example, let’s say a realtor has a standard agreement they use when selling
a client’s house. The contract would be the code that defines how that standard
agreement works. Every time the realtor has a new house to sell, they instantiate
a new instance of their standard contract to use for that specific property. If 
they have ten houses up for sale, they have ten different contract instances.

In addition to an `installation`, when a contract is instantiated, Zoe needs to 
know what kind of ERTP assets the contract will work with. In Atomic Swap’s test 
code, the full instantiation call is something like:
```js
const issuerKeywordRecord = harden({
  Asset: quatloosKit.issuer,
  Price: moolaKit.issuer,
});
const atomicSwapInstance = zoe.startInstance(installation, issuerKeywordRecord);
```

Let’s work backwards from `startInstance()`’s arguments. As you’ll recall 
from the [Introduction to ERTP](https://agoric.com/documentation/getting-started/ertp-introduction.html#issuers-and-mints),
`issuers` map minted assets to `purses` and `payments`. The *keyword record* is
made up of two key:value pairs. The key names must be ASCII and capitalized; 
they are the same names as are used in the contract code. 

In this case the key name `Price` is for what the seller wants, and key name `Asset` is for
what is being sold. `Price` is for what will be swapped for it (from the perspective
of the user making the instance; it’d be the opposite for someone who wanted what Alice is offering). 
The price is denominated in the imaginary currency Moola, so that keyword needs the 
Moola `Issuer` associated with it. The asset is denominated in the imaginary currency
Quatloos, so that keyword needs the Quatloo `Issuer` as its value. 

Finally, `E(zoe).startInstance()` can take an optional `terms` argument, another
set of key:value pairs. Terms let an `instance` creator further
customize the contract operations, as enabled by the contract code. 
Contract terms can be expressed without specific values. For example, 
an auction contract may define minimum bid and minimum raise variables 
and use them in its code, but the variables are not given values in the 
code. Instead, the `terms` argument provides the variables’ values.

Why parameterize a contract with terms? Well, the minimum raise should be 
quite different if an auction is for a used Harry Potter paperback vs. a 
signed first British hardback edition of *Harry Potter and the Philosopher’s 
Stone*. The `terms` value for the used paperback auction might 
be `{ Currency: 'USDollar', MinRaise: 1 }`. For the first edition 
auction, `terms`’ value might be  `{ Currency: 'USDollar', MinRaise: 500 }`. 
With the different `terms` values, there are now contract instances 
customized for the items being sold in each one.

## Invitations

`E(zoe).startInstance()` returns an *invitation* to that new `instance`.
An `invitation` is an [ERTP `payment`](https://agoric.com/documentation/getting-started/ertp-introduction.html#creating-assets-with-ertp) 
that lets its holder interact with that specific contract instance. If there
are ten instances of a contract running and you hold an `invitation` to, say, 
the earliest created one, that’s the only one the `invitation` works with. 
It doesn’t work with any of the nine later created `instances`. 

And while whoever instantiated the contract gets the initial `invitation`
to that `instance`, as with all `invitations`, they can transfer it to 
another party before it’s used. Who created or first held an `invitation`
doesn’t matter. Whoever possesses an `invitation` has control and use of it. 

Users obtain an `invitation` to an `instance` in one (or more) of three ways:
- Instantiate a contract, which returns an `invitation` object for that `instance`.
- Receive an `invitation` from someone who already had it. 
  - Note: Finding other parties to invite is out of Zoe or the contract’s scope
    in most cases. You have to either already know of potential other parties, 
    for example, from past experience trading with them, or communicate 
    somewhere outside the contract to find them.
- By the `instance`, or someone with the authority to issue `invitations` for 
it, making open knowledge what’s needed to get a valid `invitation`. For example,
an open exchange contract with an order book might welcome everyone who wants
to participate, and so would make public how to get an `invitation` to it.

`Invitations` are ERTP `payments`, so the same principles apply to them as 
apply to other ERTP `payments`. You can send the same `payment` or `invitation` 
to multiple parties...but when a party *claims* the `payment`/`invitation`, 
the other copies of the `payment/invitation` are dead. The claimant gets 
a new `payment/invitation` they can be sure was issued by the desired `issuer`, 

`Invitations` are single use objects. Once used, an `invitation` is destroyed or *burned*.
If someone shared a valid `invitation` with many parties, only the first one to be used 
would work; any attempts to use that `invitation` after it’s been used fail. Note that this
is different from making multiple distinct `invitations` for an `instance`; that’s expected. 

## Offers

Alice decides she wants to use her invite and make an *offer*. Before making an offer, an invite is all about *potentially* working with its associated contract instance. But the invite might never be used, and if so, it never actually interacts with the contract instance.

Before making her offer, Alice has to do some prep work. Her offer will be *escrowed* with Zoe, so it needs to include the actual ERTP payments for the offer, and a *proposal* that defines the offer and is used to enforce both *offer safety* and *payout liveness*.  In code, it looks like:

```js
const quatloos100 = quatloosAmountMath.make(100);
const moola25 = moolaAmountMath.make(25);

const aliceProposal = harden({
  give: { Asset: quatloos100 },
  want: { Price: moola25 },
  exit: { onDemand: null },
})

Const alicePayments = { Asset: aliceQuatloosPayment }
```

`AmountMath` is an [ERTP API object ](https://agoric.com/documentation/ertp/guide/amount-math.html) whose methods manipulate asset 
and payment `amounts`. Here, Alice is setting up the ability to use the Quatloos and Moola currencies. Note the the `amounts` are
just descriptions of assets, and not the actual assets. The actual assets are contained in ERTP `purses` and `payments`, not `amounts`.

She then creates her proposal, using a record with `give`, `want`, and `exit` (optional) properties. `give` and `want` are `KeywordAmount` records with
keywords as keys and `amounts` as values. `exit` is an `ExitRule` record specifying how/when a user can exit the contract. In the above,
Alice wants at least 25 Moola, in exchange for giving at most 100 Quatloos, where she can exit the offer at any time just by
asking, and get her assets back (or get her `want` value if the offer happened to be satisfied before then).

The `harden()` command is how we build a defensible API surface around an object by freezing all reachable properties. It’s similar,
but not identical, to JavaScript’s `Object.freeze`. For more information on `harden`, see [here](https://www.npmjs.com/package/@agoric/harden#background-why-do-we-need-to-harden-objects)

Now, Alice is ready to use her `invitation`, `proposal`, and `payment` to make an offer and participate in the Atomic Swap
contract `instance`. 

```js
const userSeat = E(zoe).offer(
  aliceInvite,
  aliceProposal,
  alicePayments,
);
const outcome = await E(userSeat).getOfferResult();
const payouts = await E(userSeat).getPayouts();
```
Zoe checks the invitation for its validity for that contract instance. When
she makes her offer, Alice receives a (promise for) a `UserSeat` that lets
her monitor or control her offer. This includes getting payouts or offer results,
or exiting the offer altogether. If her offer was invalid, the
offer attempt fails, and Alice gets her refund in the *payout*. If the
offer is valid, it's now an *active offer*.

Now, Alice needs to get someone else involved who potentially will also
make an offer, hopefully one that offers what she wants for
the price she’s willing to pay for it. The *offer result* is the object
returned by the contract when it processes an offer. In the case of
atomicSwap, it used *zcf.makeInvitation()* to make and return an invitation Alice can
send to others, in this case Bob.

`zcf.makeInvitation()` takes two required arguments and one optional:
- `offerHandler`: A function defined in the contract code that processes offers as the contract developer sees fit.
- `description`: A `String` that should include whatever information is needed for a recipient to know what 
  they are getting in the optional `customProperties` argument.
- `customProperties`: Optional, any special properties to be included in this `invitation`.
```js
const bobInvitation = zcf.makeInvitation(swapOfferHandler, atomicSwapDescription)

// Bob claims the invitation via the permanent Zoe inviteIssuer. The claim operation
// also validates the invitation for this contract instance.
const inviteIssuer = E(zoe).getInviteIssuer();
const bobExclusiveInvitation = await E(inviteIssuer).claim(bobInvitation);
```

Bob decides to make his own offer, which happens to match up with Alice’s offer (assume his payments were constructed similar to Alice’s);
```js
const bobProposal = harden({
  want: { Asset: quatloos100 },
  give: { Price: moola25 },
  exit: { onDemand: null },
})

// Bob escrows with zoe and makes an offer
const { outcome: bobOfferResult, payout: bobPayoutP } = await E(zoe).offer(
  bobExclusiveInvitation,
  bobProposal,
  bobPayments,
);
```
Bob has gotten back a *promise* for a *payout*. His offer is also now an *active offer*.

## Satisfying and completing offers

At this point, both the offers that Alice and Bob made are active and known to the contract instance. The Atomic Swap contract 
code determines that they are matching offers.  The contract instance calls `reallocate()`, which *reallocates* the amounts which 
are the accounting records within Zoe. Payouts are not created yet. 

The contract instance then *exits* the offers. **tyg todo: Not quite sure what the current implementation is here** makes the payouts to
the offer holders.  This takes the amounts from the account records, and withdraws the offer-specified amounts from the 
digital assets escrowed within Zoe. This is when 
the payout *promise* resolves into payments. 

The offers are now exited and no longer active. There is nothing more that can be done with them, so Zoe deletes these 
offers from the contract instance.

## Auction example  

Let’s look at a more complicated example: an auction, where many users
might make a bid for something, but only one bid will win the 
auction. Assuming everything validated, Zoe would give the holder of 
the auctioned item the escrowed assets from the winning bid, and give 
the holder of the winning bid what they wanted, the asset up for bid.

But what about all those other bidders who escrowed their bids with Zoe
and didn’t win? Zoe guarantees they all get a *refund* of their escrowed assets. 
Zoe’s *offer safety* guarantees offer makers either get what they wanted or 
get refunded whatever they put in Zoe’s escrow with their offer.

It’s even possible to get both what you wanted, and at least a partial refund.
Consider an auction where you make a bid where you’re willing to pay up to 10 
Quatloos (an imaginary currency), but if you can win for less, that’s your bid. 
You win the auction, but your winning bid is only 8 Quatloos. The payout would
resolve to both the item up for auction you get as the winning bidder and the 
refund of the 2 extra Quatloos you escrowed in your bid. 

## Other things to know about Zoe  

A *Dapp (decentralized application)* is a combination of a Zoe contract and 
a server that’s running the back and front ends, and a front end that may be 
connected to the user’s wallet.

Zoe has two distinct APIs. One is the widely accessible, singular Zoe service object
that smart contract clients use to provide offers and otherwise interface with contracts. 
The Zoe service object is a remote object, and so should be accessed with `E(zoe).<api_method>`, 
which returns a `promise`. For more on E() 
see [here](https://agoric.com/documentation/distributed-programming.html#communicating-with-remote-objects-via-e). 

The other is the internal API object, referred to as `zcf` that each `instance` uses to
interact with Zoe about that contract’s own offers and state (e.g., to
do `reallocate`).

Finally, there are also Zoe Helpers, functions that extract common contract code and patterns into reusable helpers.

For details about all three APIs and their methods, see the [Zoe API](https://agoric.com/documentation/zoe/api/) documentation.

## Workflow summary

The following table summarizes an Atomic Swap workflow:

<table>
<tbody>
<tr>
<td><center>1</center></td>
<td>Write your contract
</td>
</tr>
<tr>
<td><center>2</center></td>
<td>Install your contract’s source code on Zoe. 
</td>
</tr>
<tr>
<td><center>3</center></td>
<td>Start a contract instance based on an installed contract. 
</td>
</tr>
<tr>
<td colspan="2">At this point, everything is installed and set up and you’ve got a contract instance. The following rows cover what happens while
the Atomic Swap contract instance is active.
</td>
<tr>
<tr>
<td><center>1</center></td>
<td>A holder of an invitation to this contract instance uses it to get a seat. The assets used in the offer are escrowed with Zoe.
</td>
</tr>
<tr>
<td><center>2</center></td>
<td>Likely via means outside of the contract, invitations are distributed to potential users of this contract instance).</td>
</tr>
<tr>
<td><center>3</center></td>
<td>Recipients use the InviteIssuer to claim and validate their invitation.
</td>
</tr>
<tr>
<td><center>4</center></td>
<td>Invitation holders make their offers.
</td>
</tr>
<tr>
<td><center>5</center></td>
<td>The contract code processes the offers, which may request some reallocations as a result.</td>
</tr>
<tr>
<td><center>6</center></td>
<td>Zoe reallocates the assets among the offers, preserving offer safety.
</td>
</tr>
<tr>
<td><center>7</center></td>
<td>The contract requests Zoe process the satisfied offers, resolving their associated payout promises. Offer holders either get what they paid for, get their escrowed offer amount refunded, or in some cases, get both what they paid for and a refund of any overpayment.
</td>
</tr>
</tbody>
</table>

## Next steps

If you want to dive deeper into how Zoe works and what you can do, go to the [Zoe Guide](https://agoric.com/documentation/zoe/guide/#what-is-zoe). 
