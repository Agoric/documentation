# Introduction to Zoe

::: tip Alpha status
Zoe is currently at Alpha status. It has not yet been
formally tested or hardened. It is not yet of production quality.
:::

## What is Zoe?

Zoe is Agoric's smart contract framework. You should use Zoe to:

* **Run your code on-chain**
* **Mint new digital assets**
* **Credibly trade assets**

Zoe relies on [ERTP](./ertp-introduction.md), our token standard for fungible and non-fungible
tokens. 

## Why should I use Zoe?

### For Users ###

**Zoe is safer.** Putting digital assets in a smart contract has
traditionally meant you might lose them. But Zoe guarantees that you
will either get what you wanted or get a full refund. You will never
leave a contract empty-handed, even if the smart contract is buggy or
malicious. 

### For Developers ###

**Zoe is easier.**  Writing a smart contract has traditionally meant
learning a completely new, untried language. And let's hope you don't
make any mistakes - if you do, your users might lose millions.

Zoe smart contracts, on the other hand, are written in a secure subset
of JavaScript. Moreover, Zoe handles all of the escrowing of digital
assets provided by your users and the subsequent payout of digital
assets to your users. **Your contract, even if it's buggy, can't cause
your users to lose their assets.**

## How do I use Zoe?

You can write a new contract and install it on Zoe, or you can create
a new `instance` of a contract already installed on Zoe. Or someone
may send you an `invitation` to join their contract instance which is
already running.

Agoric has written [a number of example contracts
that you can use](/zoe/guide/contracts/), including:
* a [Uniswap
implementation](/zoe/guide/contracts/multipoolAutoswap.md)
* a [covered
call option contract](/zoe/guide/contracts/covered-call.md)
* an [OTC
Desk market maker
contract](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/src/contracts/otcDesk.js)
* contracts for [minting fungible](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/src/contracts/mintPayments.js) and [non-fungible tokens](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/src/contracts/mintAndSellNFT.js)



## Example: A simple atomic swap

Let's imagine that our friend Alice has sent a `Zoe invitation` to
[our wallet](/wallet-api.md). This invitation will let us join Alice's
running contract instance in a particular role. Without an invitation,
we are not able to join.

Compare this to a smart contract on
Ethereum, in which the smart contract developer must guard against
malicious calls and store an internal access control list to check
whether the message sender is allowed to send such a message. Zoe,
built on Agoric's [object capability](/glossary/#object-capabilities) security model, is
simply easier.

### Inspecting an invitation

So we have an invitation, but how do we use it? We can use Zoe to
inspect the invitation.

```js
const invitationDetails = await E(zoe).getInvitationDetails(invitation);
const { installation, asset, price } = invitationDetails; 
```

::: warning Note

E() is part of the Agoric platform and is used to [call methods on
remote
objects and receive a promise for the result](/distributed-programming.md#communicating-with-remote-objects-using-e). From our perspective, Zoe is a
remote object, so we must use E().
:::

The invitation contained information about the `installation`, the
installed code object that was used to create the instance. We can
quickly compare this installation to ones that we know using object
identity. No need to compare line-by-line to ensure the code is the same.

```js
const isCorrectCode = installation === atomicSwapInstallation;
```
However, if we don't recognize the installation, we can inspect the
code directly by calling:

```js
const bundledCode = await E(installation).getBundle();
```

Contracts can add their own information to the invitation. In this
case, the Atomic Swap contract adds information about what is being
traded: the `asset`, the amount which Alice has escrowed, and the
`price`, what we must pay to get the asset. Let's imagine that `asset`
was an amount of 3 moola, and `price` was an amount of 7 simoleans.
(Moola and simoleans are made-up currencies for the purpose of this
example.) Amounts are descriptions of digital assets, but have no
value themselves. [For more on amounts, please see the ERTP
guide.](/ertp/guide/amounts.html#amounts-values-and-brands)

### Making an offer

Now that we've checked out the invitation, we can make an offer.

There are three required parts to an offer:
* a Zoe invitation
* a proposal
* ERTP payments of digital assets, to be escrowed

The `proposal` is a statement of what you want from the offer, and
what you are giving in return. Zoe will use the proposal as an
invariant to ensure that we don't lose our assets in the trade. This
invariant is known as offer safety.

We can use the `asset` and `price` amounts from the invitation to make
our proposal: 

```js
const proposal = {
  want: { Asset: asset }, // asset: 3 moola
  give: { Price: price }, // price: 7 simoleans
};
```

Proposals must use Keywords, which are keys that are ASCII and
capitalized. In this case, the keywords to use [were determined by the
contract
code](https://github.com/Agoric/agoric-sdk/blob/23c3f9df56940230e21a16b4861f40197192fdea/packages/zoe/src/contracts/atomicSwap.js#L29):
Asset and Price.

We said that we are giving 7 simoleans, so we must send 7 simoleans in
the form of a ERTP payment. ([ERTP
payments](/ertp/guide/purses-and-payments.md) are how we transfer
fungible and nonfungible digital assets on the Agoric platform.) Let's assume that we happen to have some simoleans
lying around in a simolean purse. We can withdraw a payment for this
offer, and construct an object using the same Keyword as our `proposal.give`:

```js
const simoleanPayment = await E(purse).withdraw(price);
const payments = { Price: simoleanPayment };
```

Now let's harden the `proposal` and `payments` objects that we just
created. [Hardening is transitively
freezing](/distributed-programming.md#harden), and for security, we must harden any
objects that get passed to a remote object like Zoe.

```js
harden(proposal);
harden(payments);
```

Now that we have the required pieces, we can make an offer:

```js
const userSeat = await E(zoe).offer(invitation, proposal, payments);
```

At this point, Zoe burns our invitation and confirms its validity. Zoe
also escrows all of our payments and represents their value in amounts
as our `current allocation` in the contract.

### Obtaining a UserSeat

Making an offer as a user gives back a `UserSeat`. This seat
represents our position in the ongoing contract. We can use this seat
to do a number of things, including 1) exit the contract, 2) get
information about our position such as our current allocation, and 3)
get our payouts from Zoe.

Let's check that our offer was successful:

```js
const offerResult = await E(userSeat).getOfferResult();
```

The AtomicSwap contract gives back this particular message for our
offer: 'The offer has been accepted. Once the contract has been
completed, please check your payout'. Other contracts and offers using
other invitations may return something different. The `offerResult` is
entirely up to the contract.

### Getting the payouts

Let's get our payout of moola using the Keyword we used ('Asset'):

```js
const moolaPayment = await E(userSeat).getPayout('Asset');
```

Because this was the atomic swap contract, the contract is over and
Alice receives her payouts too:

```js
const simoleanPayment = await E(aliceSeat).getPayout('Price');
```

### Writing and installing a contract

We've gone over the process of inspecting an invitation, making an
offer, receiving a `UserSeat` and getting a payout, but how did Alice
create the contract instance in the first place?

Let's pretend that Alice wrote the contract from scratch, even
AtomicSwap is already written as one of our example contracts ([see the full AtomicSwap code here](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/src/contracts/atomicSwap.js)). All Zoe contracts have the
following format:

```js
// @ts-check
// Checks the types as defined in JSDoc comments

// Add imports here
import {
  // Optional: you may wish to use the Zoe helpers in /contractSupport
  assertIssuerKeywords,
} from '@agoric/zoe/src/contractSupport';

// Import the Zoe types
import '@agoric/zoe/exported';

/**
 * [Contract Description Here]
 * @type {ContractStartFn}
 */
const start = zcf => { // ZCF: the Zoe Contract Facet

  // contract logic, including the 
  // handling of offers and the making of invitations

  return { 
    creatorInvitation, // optional
    creatorFacet, // optional
    publicFacet, // optional
  };
};

harden(start);
export { start };
```
Let's imagine that Alice fills in this code with the particulars of
the [AtomicSwap implementation](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/src/contracts/atomicSwap.js). 

To install this particular code, Alice must first bundle it off-chain, meaning
that the code and its imports are flattened together:

```js
import bundleSource from '@agoric/bundle-source';
const atomicSwapBundle = await bundleSource(atomicSwapFilepath);
```

Then Alice must install it on Zoe:

```js
const atomicSwapInstallation = await E(zoe).install(atomicSwapBundle);
```

The return value is an `installation`, which we saw earlier. This is
an object that identifies a particular piece of code installed on Zoe.
It can be compared to other installations, and we can call
`E(atomicSwapInstallation).getBundle()` to read the code itself.

### Creating an instance

Now Alice can use the installation to create a new instance. She must
also tell Zoe about the ERTP issuers that she wants to use, by
specifying their role with Keywords. Moola was kind of thing that
Alice was giving, so she will call that `Asset`. `Price` was the kind
of thing that she wanted, so she'll use it to label the simolean
issuer. This particular contract ([see permalink to line
58](https://github.com/Agoric/agoric-sdk/blob/23c3f9df56940230e21a16b4861f40197192fdea/packages/zoe/src/contracts/atomicSwap.js#L58))
returns a `creatorInvitation` as the result of `startInstance`, so that's what Alice can use to make
her offer.

```js
const issuerKeywordRecord = harden({
  Asset: moolaKit.issuer,
  Price: simoleanKit.issuer,
});
const { creatorInvitation } = await E(zoe).startInstance(installation, issuerKeywordRecord);
```

As per the [Atomic Swap contract code](https://github.com/Agoric/agoric-sdk/blob/23c3f9df56940230e21a16b4861f40197192fdea/packages/zoe/src/contracts/atomicSwap.js#L50), Bob's invitation came as a result of Alice making her offer:

```js
const aliceSeat = await E(zoe).offer(creatorInvitation, aliceProposal, alicePayments);
const bobInvitation = await E(aliceSeat).getOfferResult();
```

## Two sides of Zoe: Zoe Service and ZCF (Zoe Contract Facet)

You may have noticed that the contract code's `start` method had a
parameter called `zcf`. This is the Zoe Contract Facet. Zoe actually
has two sides: the Zoe Service, which we've seen the users interact with, and
the Zoe Contract Facet (ZCF), which is accessible to the contract
code. Note that users do not have access to ZCF, but contract code
does have access to the Zoe Service.

To learn more about the Zoe Service and Zoe Contract Facet APIs, [see
our Zoe API documentation](/zoe/api/).

## Next steps

If you want to dive deeper into how Zoe works and what you can do, go
to the [Zoe Guide](/zoe/guide/README.md). 

To learn more about the AtomicSwap contract in particular, you can
[read its documentation](/zoe/guide/contracts/atomic-swap.md) and take [a look at the source code](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/src/contracts/atomicSwap.js).

To start building Zoe contracts and applications (dapps), follow the
instructions in [Starting a
Project](/getting-started/start-a-project.md) after installing the
prerequisites.

To explore the Zoe Service and Zoe Contract Facet APIs, see the [Zoe
API documentation here](/zoe/api/).