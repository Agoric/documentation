# PSM Contract

<Zoe-Version/>

##### [View the code on Github](https://github.com/Agoric/agoric-sdk/blob/master/packages/inter-protocol/src/psm/psm.js) (Last updated: Aug 15, 2022)

The Parity Stability Module (PSM) contract allows users to convert Inter Stable Tokens (ISTs)
to external stable tokens at a specified fixed ratio, and vice versa.

IST is an evolving, fully collateralized, cryptocurrency-backed decentralized stable
token for the interchain ecosystem on the Agoric chain. IST is designed to maintain parity
with the US dollar (USD) for broad accessibility and provides Agoric and the interchain
ecosystem users an asset with minimum price volatility. In addition, IST is the native 
fee token for the Agoric platform and provides some of the core functionality and stability 
for the Agoric cryptoeconomy. Currently the PSM is the only minter of ISTs.

Which external stable tokens are supported is determined by governance in the form of a
vote of the economic committee. Governance may elect to only support one external stable token,
in which case only one PSM will be instantiated.

## Instantiating the PSM

There will be one instance of the PSM for each supported external stable token. 

## Creating an Offer

The PSM contract supports 2 different offer types: swapping external stable tokens for IST tokens,
and swapping IST tokens for external stable tokens. For both offer types only one user is required
for a successful offer; in both cases the PSM itself acts as the other trading party.
 
### Swapping External Stable Tokens for IST Tokens

To create an offer to swap external stable tokens for IST tokens, do the following:

1. Create an invitation using the makeWantMintedInvitation method.
	```js
	const myInvitation  = E(publicFacet).makeWantMintedInvitation();  
	```
2. Create Amounts for the external stable tokens you want to trade and for the IST tokens 
you want to receive.

	```js
	const giveAnchorAmount = AmountMath.make(anchorBrand, 200_000_000n);
	const wantMintedAmount = AmountMath.make(istBrand, 200_000_000n);
	```
3. Create a proposal. Use the keywords **In** and **Out**, where **In** is the amount of 
external stable tokens you’re offering, and **Out** is the amount of IST tokens you expect
to receive. Note that because the PSM will always be able to act as the other trading partner,
this proposal doesn’t have (or need) an exit condition.

	```js
	const myProposal = { 
	  give: {In: giveAnchorAmount },
	  want: {Out: wantMintedAmount }
	};
	```
4. Create a payment record containing the external stable tokens you’re trading to the PSM.

	```js
	const myPaymentRecord = { In: anchorPayment };
	```
5. Create the offer, remembering to harden the proposal & payment record.

	```js
	const seat = E(zoe).offer(
	  myInvitation,
	  harden(myProposal),
	  harden(myPaymentRecord)
	);
	```

### Swapping IST Tokens for External Stable Tokens
To create an offer to swap IST tokens for external stable tokens, do the following:

1. Create an invitation using the makeGiveMintedInvitation method.

	```js
	const myInvitation  = E(publicFacet).makeGiveMintedInvitation();  
	```
2. Create Amounts for the IST tokens you want to trade and for the external stable 
tokens you want to receive.
	```js
	const giveMintedAmount = AmountMath.make(istBrand, 200_000_000n);
	const wantAnchorAmount = AmountMath.make(anchorBrand, 200_000_000n);
	```
3. Create (and harden) a proposal. Use the keywords **In** and **Out**, where **In** is the amount
of IST tokens you’re offering, and **Out** is the amount of external stable tokens you
expect to receive. Note that because the PSM will always be able to act as the other
trading partner, this proposal doesn’t have (or need) an exit condition.
	```js
	const myProposal = harden({ 
	  give: { In: giveMintedAmount },
	  want: { Out: wantAnchorAmount },
    });
	```
4. Create a payment record containing the IST tokens you’re trading to the PSM.
	```js
	const myPaymentRecord = harden({ In: mintedPayment });
	```
5. Create the offer.
	```js
	const seat = E(zoe).offer(
	  myInvitation,
	  myProposal,
	  myPaymentRecord,
	);
	```




