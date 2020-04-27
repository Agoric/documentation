# Introduction to Zoe

**Note:** Before reading this, you should be familiar with [ERTP basics](/getting-started/ertp-introduction/). 


This is an introduction to Zoe, Agoric's smart contract framework. The [Zoe Guide](/zoe/guide/) has more complete and detailed information, including concepts not covered here. 


You can run different types of smart contracts on Zoe. In this document, for the most part we focus on Agoric’s Atomic Swap demo contract, but sometimes refer to how Zoe works with other contract types.


## What is Zoe?


**For users**: Zoe guarantees as a user of a smart contract, you either get what you wanted or get a full refund, even if the smart contract is buggy or malicious. 


**For developers**: Zoe is a framework for writing and running smart contracts. It provides a safety net so you can focus on what your smart contract does best, without worrying about users losing their assets due to a bug in your code. 


Many contracts are installed on Zoe, including [several Agoric-written ones](]https://agoric.com/documentation/zoe/guide/contracts/) to get you started. 


## The simple Atomic Swap contract


In this document, we’ll mostly be looking at Agoric’s [Atomic Swap contract](https://agoric.com/documentation/zoe/guide/contracts/atomic-swap.html) to illustrate how contracts use Zoe. 


Atomic Swap has two users swapping for each other’s assets. We’ll try to let you know when aspects of the contract are specific to a basic swap operation. Other types of contracts, such as auctions, may do things differently. The annotated code for our example is [here](https://agoric.com/documentation/zoe/guide/contracts/atomic-swap.html). The source code is [here](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/src/contracts/atomicSwap.js), with helpers defined [here](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/src/contractSupport/zoeHelpers.js). Tests are [here](https://github.com/Agoric/agoric-sdk/blob/47b3729aa6b4ebde0d23cf791c5295fcf8f58a00/packages/zoe/test/unitTests/contracts/test-atomicSwap.js#L14). The tests have two “characters”, Alice, who makes the initial offer, and Bob, who responds to that offer. 


## Installing and instantiating contracts on Zoe


To use a contract, it needs to be *installed* on Zoe. This is putting the contract’s source code, consisting of JavaScript plus ERTP and Zoe API requests, on Zoe. 


When a contract is installed on Zoe, the operation returns an `installationHandle`, which is an *opaque JavaScript object*  used to refer to the installed contract source code. Agoric uses such objects as handles since they cannot be forged. For example
```js
const installationHandle = zoe.install(sourceCode, moduleFormat);
```


A contract has to be *instantiated* for it to actually be used. A contract can be instantiated by calling `E(zoe).makeInstance(installationHandle).` Multiple *instances* of any Zoe-installed contract can execute simultaneously. For clarity, in this document a *contract* is the installed code that defines how the contract works. A *contract instance* is an active execution of the contract code. 


For example, let’s say a realtor has a standard agreement they use when selling a client’s house. The contract would be the code that defines how that standard agreement works. Every time the realtor has a new house to sell, they instantiate a new instance of their standard contract to use for that specific property. If they have ten houses up for sale, they have ten different contract instances.


In addition to an `installationHandle`, when the contract is instantiated, Zoe needs to know what kind of ERTP assets the contract will work with. In Atomic Swap’s test code, the full instantiation call is:


```js
const issuerKeywordRecord = harden({
  Asset: moolaIssuer,
  Price: simoleanIssuer,
});
const aliceInvite = await E(zoe).makeInstance(
  installationHandle,
  issuerKeywordRecord, 
});
```
Let’s work backwards from `makeInstance()`’s arguments. As you’ll recall from the [Introduction to ERTP](https://agoric.com/documentation/getting-started/ertp-introduction.html#issuers-and-mints), *issuers* map minted assets to purses and payments. The *keyword record* is made up of two key:value pairs. The key names must be ASCII and capitalized; they are the same as are used in the contract code, in this case `Price` and `Asset`. `Price` is for what is wanted, and `Asset` is for what is being sold. `Price` is for what will be swapped for it (from the perspective of the user making the instance; it’d be the opposite for someone who wanted what Alice is offering). The price is denominated in simoleons, so that keyword needs the simoleon Issuer associated with it. The asset is denominated in moola, so that keyword needs the moola Issuer as its value. 


Finally, `E(zoe).makeInstance()` can take a `terms` argument, another set of key:value pairs. Terms let a contract instance creator further customize the contract operations, as enabled by the contract code. Contract terms can be expressed without specific values. For example, an auction contract may define minimum bid and minimum raise variables and use them in its code, but the variables are not given values in the code. Instead, the `terms` argument provides the variables’ values.


Why the need to parameterize a contract with terms? Well, the minimum raise ]should be quite different if an auction is for a used Harry Potter paperback vs. a signed first British hardback edition of *Harry Potter and the Philosopher’s Stone*]. The `terms` value for the used paperback auction would be `{ Currency: 'USDollar', MinRaise: 1 }`. For the first edition auction, `terms`’ value would be  `{ Currency: 'USDollar', MinRaise: 500)`. With the different `terms` values, there are now contract instances customized for the items being sold in each one.

## Invites

The `E(zoe).makeInstance()` call returns an *invite* to that contract instance. Invites are [*ERTP payment objects*](https://agoric.com/documentation/getting-started/ertp-introduction.html#creating-assets-with-ertp) that let their holder interact with that specific contract instance. If there are ten instances of a contract running and you hold an invite to, say, the earliest created one, that’s the only one the invite works with. It doesn’t work with any of the nine later created contract instances. 


And while whoever instantiated the contract gets the initial invite to that instantiation, as with all invites, they can transfer it to another party before it’s used. Who created or first held an invite doesn’t matter. Whoever possesses an invite has control and use of it. 


Users obtain invites to a contract instance in one (or more) of three ways:
- Instantiate a contract, which returns an invite object for that contract instance.
- By receiving an invite from someone who already had it. 
  - Note: Finding other parties to invite is out of Zoe or the contract’s scope in most cases. You have to either already know of potential other parties, for example, from past experience trading with them, or communicate somewhere outside the contract to find them.
- By the contract instance or someone with the authority to issue invites for this contract instantiation making open knowledge what’s needed to get a valid invite. For example, an open exchange contract with an order book might welcome everyone who wants to participate, and so would make public how to get an invite to it.


*Invites* are ERTP *payments*, so the same principles apply to them as apply to other ERTP payments. You can send the same payment or invite to multiple parties...but when a party claims the payment, that payment is dead. The claimant gets a new payment they know was issued by the desired issuer, and which they have exclusive access to. 


Invites are single use objects. So once used, an invite is destroyed or *burned*. If someone shared a valid invite with many people, only the first one to be used would work; any attempts to use that invite after it’s been used fail. Note that this is different from making multiple distinct invites for a contract instance; that’s expected. 


## Offers


Alice decides she wants to use her invite and make an *offer*. Before making an offer, an invite is all about *potentially* working with its associated contract instance. But the invite might never be used, and if so, it never actually interacts with the contract instance.


Before making her offer, Alice has to do some prep work. Her offer will be *escrowed* with Zoe, so it needs to include the actual ERTP payments for the offer, and a *proposal* that defines the offer and is used to enforce both *offer safety* and *payout liveness*.  In code, it looks like:

```js
const moola = moolaAmountMath.make;
const simoleans = simoleanAmountMath.make;

const aliceProposal = harden({
  give: { Asset: moola(3) },
  want: { Price: simoleans(15) },
  exit: { onDemand: null },
})

Const alicePayments = { Asset: aliceMoolaPayment }
```

`AmountMath` is an [ERTP API object ](https://agoric.com/documentation/ertp/guide/amount-math.html) whose methods manipulate asset and payment amounts. Here, Alice is setting up the ability to use the moola and simolean currencies.


She then creates her proposal, using an object with `give`, `want`, and `exit` (optional) properties. `give` and `want` are objects with keywords as keys and amounts as values. `exit` is an `ExitRule` record. In the above example, Alice wants at least 15 simoleans, in exchange for giving at most 3 moola, where she can exit the offer at any time just by asking, and get her money back (or get her `want` if the offer happened to be satisfied before then.


The `want` and `give`values are JavaScript records, objects with property names and values. The property names of these records are the keywords in the `keywordRecord` from when you created the contract instance. The values of the records are [ERTP amounts](https://agoric.com/documentation/ertp/guide/amounts.html) of how many of the asset the user either wants or is willing to give in exchange. 


The `harden()` command is how to build a defensible API surface around an object by freezing all reachable properties. It’s similar, but not identical, to JavaScript’s `Object.freeze`. For more information on `harden`, see [here](https://www.npmjs.com/package/@agoric/harden#background-why-do-we-need-to-harden-objects)


Now, Alice is ready to use her invite, proposal, and payment to make an offer and participate in the Atomic Swap instance. 

```js
const { outcome, payout: alicePayoutP } = await E(zoe).offer(
  aliceInvite,
  aliceProposal,
  alicePayments,
);
```
Zoe checks the invite for its validity for that contract instance. If it’s an invalid invite, the offer attempt fails, and Alice gets her refund in the payout. When she makes her offer, Alice receives an *outcome* and a *promise* that resolves to her *payout* . 

Now, Alice needs to get someone else involved who potentially will also make an offer, hopefully one that offers what she wants for the price she’s willing to pay for it. For the Atomic Swap contract, the *outcome* from her offer resolves to an *invite* she can send to others, in this case Bob. This is specific to this Atomic Swap contract; the outcome is whatever the contract instance returns from its hook that was attached to the invite when it was created:


```js
const newInviteP = outcome;
const inviteIssuer = zoe.getInviteIssuer();
const bobExclusiveInvite = await inviteIssuer.claim(newInviteP);
const instanceHandle = await getInstanceHandle(bobExclusiveInvite);

const {
  installationHandle: bobInstallationId,
  issuerKeywordRecord: bobIssuers,
} = zoe.getInstance(instanceHandle);
```


Bob decides to make his own offer, which happens to match up with Alice’s offer (assume his payments were constructed similar to Alice’s);
```const bobProposal = harden({
  want: { Asset: moola(3) },
  give: { Price: simoleans(7) },
  exit: { onDemand: null },
})


// Bob escrows with zoe and makes an offer
const { outcome: bobOfferResult, payout: bobPayoutP } = await E(zoe).offer(
  bobExclusiveInvite,
  bobProposal,
  bobPayments,
);
```
Bob has also gotten back an *outcome* and a *promise* for a *payout*.


## Satisfying and completing offers


At this point, both the offers that Alice and Bob made are known to the contract instance. The Atomic Swap contract code determines that they are matching offers.  The contract instance calls `reallocate`, which *reallocates* the amounts which are the accounting records within Zoe. Payouts are not created here. 


The contract instance then *completes* the offers. A call to `zcf.complete()` with both offers as arguments, makes the payouts to the offer holders.  This takes the amounts from the account records, and withdraws the amounts specified by the offers from the digital assets escrowed within Zoe. It's only at the `complete` step that *amounts* are turned into real payments. This is when the payout *promise* resolves into payments. 


The offers are now completed, and nothing more is or can be done with them. Zoe deletes completed offers from the contract instance.


## Auction example


Let’s look at a more complicated example: an auction, where many users might make a bid offer for something, but only one offer will win the auction. Assuming everything validated, Zoe would give the holder of the auctioned item the escrowed amount from the winning offer, and give the holder of the winning offer what they wanted, the item that had been up for bid.


But what about all those other bidders who escrowed their bid amounts with Zoe and didn’t win? Zoe guarantees they all get a *refund* of their escrowed amount. Zoe’s *offer safety* guarantees offer makers either get what they wanted or get refunded whatever they put in Zoe’s escrow with their offer.


It’s even possible to get both what you wanted in an offer, and at least a partial refund of what you offered. Consider an auction where you make a bid offer where you’re willing to pay up to 10 quatloos, but if you can win with a lower bid, that’s your offer. You win the auction, but your winning bid amount is only 8 quatloos. The payout would resolve to both the item up for auction you get as the winning bidder and the refund of the 2 extra quatloos you escrowed in the offer. 


## Other things to know about Zoe


A *Dapp (distributed application)* is a combination of a Zoe contract and a server that’s running the back and front ends, and a front end that may be connected to the user’s wallet.


Zoe has two distinct APIs. One is the widely accessible, singular Zoe service object that smart contract clients use to provide offers and otherwise interface with contracts. The Zoe service object is a remote object, and so should be accessed with `E(zoe).<api_method>`, which returns a promise. For more on E() see [here](https://agoric.com/documentation/distributed-programming.html#communicating-with-remote-objects-via-e). 


The other is the internal API object, referred to as `zcf` that each contract instance uses to interact with Zoe about that contract’s own offers and state (e.g., to do `reallocate` and `complete`).


## Workflow summary


The following table summarizes an Atomic Swap workflow:

<table>
<tbody>
<tr>
<td><center>1</center></td>
<td>Install Zoe on a server and start it running. 
</td>
</tr>
<tr>
<td><center>2</center></td>
<td>Write your contract
</td>
</tr>
<tr>
<td><center>3</center></td>
<td>Install your contract’s source code on Zoe. 
</td>
</tr>
<tr>
<td><center>4</center></td>
<td>Start a contract instance based on an installed contract. 
</td>
</tr>
<tr>
<td colspan="2">At this point, everything is installed and set up and you’ve got a contract instance. The following rows covers what happens to offers in a contract instance.
</td>
<tr>
<tr>
<td><center>1</center></td>
<td>A holder of an invite to this contract instance uses it to make an offer. The assets used in the offer are escrowed with Zoe.
</td>
</tr>
<tr>
<td><center>2</center></td>
<td>Likely via means outside of the contract, invites are distributed to potential users of this contract instance).</td>
</tr>
<tr>
<td><center>3</center></td>
<td>Invite receivers validate the invite.
</td>
</tr>
<tr>
<td><center>4</center></td>
<td>Invite holders make their offers.
</td>
</tr>
<tr>
<td><center>5</center></td>
<td>The contract instance hooks trigger, driving the contract behavior, which may request some reallocations as a result.</td>
</tr>
<tr>
<td><center>6</center></td>
<td>Zoe reallocates the assets among the offers, preserving offer safety.
</td>
</tr>
<tr>
<td><center>7</center></td>
<td>The contract requests Zoe  complete the satisfied offers, resolving their associated payout promises. Offer holders either get what they paid for, get their escrowed offer amount refunded, or in some cases, get both what they paid for and a refund of any overpayment.
</td>
</tr>
</tbody>
</table>



## Next steps


If you want to dive deeper into how Zoe works and what you can do, go to the [Zoe Guide](https://agoric.com/documentation/zoe/guide/#what-is-zoe). 
