# Zoe Roadmap

Here's a number of features that we are planning to add in the near
future to Zoe, in response to user feedback.

1. Allow smart contracts on Zoe to calculate things in terms of
   labeled units (such as "3 bucks"), rather than unlabeled
   units (the "3" of "3 bucks"). This should reduce the number of
   concepts as well as protect against identification mistakes.
3. Allow users of smart contracts to make their offer rules with any
   order of assays. Currently, the payout rules portion of the offer
   rules must be in the same order as the canonical array of assays
   in the smart contract.
4. Allow smart contracts to use whatever assays the users of the smart
   contract contribute. Currently, smart contracts must use a specific
   array of assays that the smart contract returns on instantiation.
5. Allow user and smart contracts to talk about a subset of the total
   assays for a particular smart contract instance. For example, in
   autoswap, there are three assays, two for the swappable assets and
   one for the liquidity token for that particular instance. We would
   like the users to not have to include mention of the liquidity
   token unless they are removing or adding liquidity.
6. Support "multiples" in offer rules. Multiples are a
   way of expressing partial fulfillment of offers without having to
   deal with the problem of division. For instance, we may want to buy
   100 shares of stock for 10 dollars each, and if we can't buy 100
   shares, we're happy with as much as we can get. We want to be able
   to encode this kind of offer more succinctly than having to make
   100 separate offers.
7. Support "disjuncts" in offer rules. By disjuncts, we mean allowing
   compound offers in which we want exactly one of them to be
   accepted. For instance, we might want to find a good weekend
   activity and we're ok with buying a ticket to the museum or the
   concert, but not both because they will happen at the same time.
8. Separate Zoe into two layers. One layer, doing the escrowing and
   actually holding the assets, is in a different Vat than the other
   layer, which runs the contracts.
