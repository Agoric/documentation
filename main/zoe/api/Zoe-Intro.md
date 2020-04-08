# Introduction to Zoe


**Note:** Before reading this, you should be familiar with ERTP basics. (**tyg todo**: Add link)


This is an introduction to Zoe, Agoric's smart contract framework. The Zoe Guide (**tyg todo**: Add link) has more complete and detailed information, including concepts not covered here. In particular, here we simplify Zoe examples such that there are always two parties in a basic trading/swap contract. We do not discuss more complicated contracts with many participants, such as auctions, or simpler contracts, such as our AutomaticRefund one party demo contract.


## What is Zoe?


*Zoe* is itself a long lived and trusted contract that serves as a framework which runs other contracts.


## How do Zoe contracts work?


To start using a contract, you need to *install* it on Zoe. This is putting the contract’s code into Zoe. Multiple contracts can be installed on Zoe, and each contract can have multiple simultaneous active offers, each of which is handled by a separate contract instance. For clarity, in this document a *contract* is the installed code that defines how the contract works. A *contract instance* is an active execution of the contract code.


Once installed on Zoe, a contract is instantiated, staring a lifecycle new contract instance of:
1. Instantiating the contract with
   ```js
   const initialInviteP = zoe~.makeInstance(
     installationHandle,
     issuerKeywordRecord,
     terms);
   ```
1. As shown above, `makeInstance` returns a promise for the initial invite, shown above as `initialInviteP`.
1. Sometimes: obtaining the `publicAPI` from that initial invite, and then obtaining invites from that.
1. Sending out invites to request offers (including counter-offers).
1. Parties use those invites to make offers.
1. Determining when an offer *matches* another offer.
1. Either succeeding or failing to make the trade.


An offer’s completion only affects that offer and the assets involved in it. The contract instance it was made on keeps running, waiting for and processing new offers.


*Offer safety* is automatically enforced for parties in a contract; when an offer *completes*, it can complete giving the requesting party what they wanted, or refunding what it offered.


All parties in a Zoe contract instance receive an invite, which lets them make one offer to zoe for that contract instance. As a result of the offer, they receive a *promise* for a future payout. The contract itself does not have direct access to any parties’ assets. The payments for an offer are all run through Zoe, which *escrows* these assets.


Zoe has two distinct APIs. One is client/user-facing zoe *service* object. We'll hold a remote promise for the zoe servive object in a variable named `zoeP` in our code examples.  The other is only exposed to contracts built on Zoe (its *contract facet*), which we'll hold in a variable named `zcf` in our code examples.


## Starting a contract on Zoe


While there can be more than one Zoe instance installed and running at any time, for now we’ll focus on the single instance running on Agoric’s testnet. Of course, before you can run a smart contract on Zoe, you have to install it there. For Zoe purposes, *installation* means installing the code your contract is written in (JavaScript and of course the ERTP and Zoe API commands we’ve defined) on a Zoe instance.


Contract installation returns an `installationHandle`, a unique token identifying the installed contract, used to create *contract instances* from the installed code. A contract installation is a way to reuse the same code multiple times and ensure that widely used contract code is recognizable under the same identity. For example, if I negotiate with someone and we agree to use the “Atomicswap” contract **tyg todo link**, if I make an instance of that contract, my counterparty can use its `installationHandle` with the `getInstallation()` API method to check the code is the `Atomicswap` code they expected.


## Running contracts on Zoe


First, use `zoe.makeInstance()` to create an instance of the installed contract you want to use. The method takes as arguments:
- the `installationHandle` of the specific contract to use.
- a *keyword record* of name : value pairs.
  - The names are words used in the contract, such as “Asset” or “Bid” that, in the contract, take an amount as its value.
  - The values are references to an *issuer* (see Introduction to ERTP **tyg todo: add link**) of the type you want the associated name to accept as its value in the contract instance. For example, if your contract uses the name “Asset” for what the offer in the contract is (e.g. 3) and the resource unit is quatloos, and uses “Price” for the counter-offer, which is in moola, the keyword record value would be ((“Asset” : quatlooIssuer) (“Price” : moolaIssuer)).
- *terms*: Another set of key : value pairs.
  -   These customize contract aspects expressed in the contract without specific values. For example, an auction contract’s may not define what the minimum bid has to be or the minimum amount one has to raise from the current high bid, just that there are such values which the contract uses. These values are different for a collection of used Harry Potter paperbacks and a signed first British hardback edition of *Harry Potter and the Philosopher’s Stone*. If you write code in the contract to access that instance’s `terms`’ name:value pairs of `('MinBid' : 25, 'Currency : 'USDollar', 'MinRaise' : 5)` or  `('MinBid' : 100000, 'Currency : 'USDollar', 'MinRaise' : 5000)`, you’ve customized the generic contract for that specific instance.


`zoe.makeInstance()` returns an *invite* to be a party in that contract instance. Thus, the party who made the contract instance has an invite to it. The `instanceHandle`, the unique identifier for the contract instance, can be retrieved from the invite using `GetInstanceHandle()`.


The holder of an invite makes their *offer* in the form of a *proposal*. An invite can only be used to make one offer. Making an offer uses up the invite, so they can’t be used by anyone else. Even if they have a reference to the invite object. More details on offers, and proposals below.


Using their seat at the contract instance, any user can create new invites to the offer and its contract instance. Once a contract party holds an invite to an offer, they can send it to anyone they'd like to also possibly be a party to the contract. In other words, usually someone who has the asset you want to get.


Finding these other parties to invite is out of Zoe or the contract’s scope in most cases (you could possibly write something into the contract that seeks out potential partners, but that’s way beyond this introduction’s purpose). You have to either already know of potential other parties, for example, from past experience trading with them, or communicate somewhere outside the contract to find them.


*Invite*s are ERTP *payments*, so the same principles apply to them as to what you usually think of ERTP payments. You can send the same payment or invite to multiple parties...but the first party to *redeem* it removes the value from the shared payment. As part of redeeming it, they then create their own new payment object with the same amount. Remember, Zoe destroys invites on their redemption.


When you receive an *invite* to an *offer*, you should first ensure it is a valid invitation to the type of contract that you want to participate in.  The second thing to check is the `installationHandle` in the invite: this indicates what particular contract code will be used. You can use the `installationHandle` to make sure it’s a contract you’ve used before, and you can also use `zoe.getInstallation(installationHandle)` to have Zoe send you the contract code itself.


If you want to be a party to the contract, *redeem* the invite by providing a *proposal* and a *payment* for the proposal, which Zoe escrows.


*Proposals* consist of:
- What the user wants (*want key*).
- What the user offers for what they want (*give key*).
- How the user can cancel the contract (*exit key*).


The names of the *want* and *give* *keys* are the keywords passed in the keyword record when you created the contract instance. Their values are ERTP amounts of how many of the asset you either want or are willing to give in exchange.
Redeeming an offer returns a *seat* at that contract instance and a *payout*. The *seat* object's methods let the user call API commands on the contract instance. (**Note**: we expect this last to change very soon). The *payout* is what the user gets when their offer is completed; either a refund of what they offered or what they wanted to get from the offer.


Once two proposals for a contract match, as determined by the contract instance, the contract instance tells Zoe to *reallocate* the current allocations (allocations = I have 3 brick, you have 2 wool) for those offers, and then completes the offers with Zoe, giving the users their payout. By match we mean that, for example, one party wants three wood and offers two brick for it. The other party wants two brick and offers three wood for it. What they want and what they offer for it sync up.


If the offer completes successfully, Zoe creates two new two payments from its escrow, which is stored in Zoe purses. and assigns them to the successful parties. If it doesn't execute successfully, Zoe creates two payments from its escrow and returns them to their original owners.


For example, Alice has escrowed two brick, wanting three wood for it, and Bob has escrowed three wood, wanting two brick for it. On the offer’s success, Alice receives the three wood from escrow, while Bob receives the two brick from escrow. On its failure, for whatever reason (buggy code, malicious party, etc.), Alice gets her two brick back and Bob gets his three wood back.


## Next steps


If you’re Getting Started, go to My First Contract (**tyg todo add link) where we go over a very basic example Zoe contract.


If you want to dive deeper into how Zoe works and what you can do, go to the Zoe Guide. (**tyg todo add link).
