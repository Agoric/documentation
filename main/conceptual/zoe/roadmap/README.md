# Zoe Roadmap

<Zoe-Version/>

Here's a number of features that we are planning to add in the near
future to Zoe, in response to user feedback.

1. Support "multiples" in proposals. Multiples are a
   way of expressing partial fulfillment of offers without having to
   deal with the problem of division. For instance, we may want to buy
   100 shares of stock for 10 dollars each, and if we can't buy 100
   shares, we're happy with as much as we can get. We want to be able
   to encode this kind of offer more succinctly than having to make
   100 separate offers.
2. Support "disjuncts" in proposals. By disjuncts, we mean allowing
   compound offers in which we want exactly one of them to be
   accepted. For instance, we might want to find a good weekend
   activity and we're ok with buying a ticket to the museum or the
   concert, but not both because they will happen at the same time.
3. Separate Zoe into two layers. One layer, doing the escrowing and
   actually holding the assets, is in a different Vat than the other
   layer, which runs a contract instance.
