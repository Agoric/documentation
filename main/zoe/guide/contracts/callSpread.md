# Call Spread

<Zoe-Version/>

##### [View the code on Github](https://github.com/Agoric/agoric-sdk/blob/master/packages/zoe/src/contracts/callSpread.js) (Last updated: 03-NOV-2020)
##### [View all contracts on Github](https://github.com/Agoric/agoric-sdk/tree/master/packages/zoe/src/contracts)

This contract implements a fully collateralized call spread. You can use a call spread as a
[financial building block](https://youtu.be/m5Pf2d1tHCs) to create futures, puts, calls, and event
binaries that would form the basis for a prediction market, insurance, and much more. A call spread
is a combination of a call option bought at one strike price and a second call option sold at a
higher price. A call spread has two participants, each holding an ERTP asset that pays out
complementary amounts depending on the value of some good at a known future time. This video gives
a [walkthrough of the implementation](https://youtu.be/m5Pf2d1tHCs?t=3566) of the contract.

The Zoe invitations representing the options are produced in pairs representing the matching
assets.  The purchaser deposits the entire amount that will be approtioned between the holders of
the two positions. The individual options are ERTP invitations whose details are inspectable by
prospective purchasers.

These options are settled financially. There is no requirement that the original purchaser have
ownership of the underlying asset at the start, and the beneficiaries shouldn't expect to take
delivery at closing.

The Strike and collateral currencies are often the same, however this contract decouples the
currencies. You can have, for example, a spread based on APPL stock (`Underlying`), with the stock
price in USD (`Strike`) and contract paying out in JPY (`Collateral`).

The issuerKeywordRecord specifies the issuers for four keywords: Underlying, Strike, Collateral,
and Quote.

 * The asset whose eventual value determines the payouts uses `Underlying`. This is often a
   fungible currency, but doesn't have to be. It would be perfectly sensible to have a call spread
   contract on the value of a "Superior Magic Sword", as long as there was a price oracle to say
   how its price varies over time.
 * The original deposit and the payout use the `Collateral` issuer.
 * `Strike` amounts are used for the price oracle's quote as to the value of the Underlying, as
   well as the strike prices in the terms.
  * The priceAuthority's quotes are ERTP assets issued by a QuoteAuthority, which must be specified
    using the keyword `Quote`.

The terms include { timer, underlyingAmount, expiration, priceAuthority, strikePrice1,
strikePrice2, settlementAmount }.

 * `timer` is a timer, and must be recognized by `priceAuthority`.
 * `expiration` is a time recognized by the `timer`.
 * `underlyingAmount` is passed to `priceAuthority`. It could be an NFT or a fungible amount.
 * `strikePrice2` must be greater than `strikePrice1`.
 * `settlementAmount` is the amount deposited by the funder and split between the holders of the
 options. It uses Collateral.
 * `priceAuthority` is an oracle that has a timer so it can respond to requests for prices as of a
   stated time. After the deadline, it will issue a PriceQuote giving the value of the underlying
   in the strike currency.

<<< @/snippets/zoe/contracts/test-callSpread.js#startInstance

The terms specify all the details of the options. However, the options are not handed out until the
creator provides the collateral that will make them valuable.  The creatorInvitation has
customProperties including `longAmount` and `shortAmount`, the amounts of the two options.

<<< @/snippets/zoe/contracts/test-callSpread.js#invitationDetails

The funder can use these option amounts to create an offer that assures them they will get the two
options in exchange for the funds. The proposal describes the options they want and the collateral
they give. When the offer is made they get a payout that contains the two option positions, which
are themselves invitations which can be exercised for free, and provide the option payouts with the
keyword Collateral.

<<< @/snippets/zoe/contracts/test-callSpread.js#creatorInvitation

The options that are returned by the contract are Zoe invitations, so their values and terms can be
verified by asking Zoe for the contract terms.  This makes it possible to sell the options because
a prospetive purchaser can inspect their value. The prospective purchaser can verify the underlying
amount, and check to see that the priceAuthority is one they are willing to rely on. They can check
the expiration to see that it matches their expectations (here it's a small integer suitable for a
manual timer in a test; in actual use, it would represent block height or wall clock time.) The
strike prices and settlement amount are likewise visible.

<<< @/snippets/zoe/contracts/test-callSpread.js#verifyTerms

The contract doesn't rely on the options being exercised before the specified close. If either
option is exercised after the closing price is determined, the payouts will still be available. The
two options make their payment available as soon after exercise as the price is available, and
neither waits for the other to exercise.

<<< @/snippets/zoe/contracts/test-callSpread.js#bobExercise

There is a
[unit test](https://raw.githubusercontent.com/Agoric/agoric-sdk/master/packages/zoe/test/unitTests/contracts/test-callSpread.js)
(search for "sell options") that demonstrates how these options could be offered using the
SimpleExchange contract.
