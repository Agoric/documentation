∫# NFT Drop

<Zoe-Version/>

##### [View the code on Github](https://github.com/Agoric/dapp-nft-drop/blob/main/contract/src/NFTDropContractBasic.js)
##### [View all contracts on Github](https://github.com/Agoric/agoric-sdk/tree/master/packages/zoe/src/contracts)

This contract provides users with an invitation that will mint a NFT in exchange for a fixed price. It demonstrates how one could use Zoe to facilitate the release, or "drop", of a set oF NFTs created for a particular project. The contract code results in the creation of an [invitation](../../../glossary/#invitation) which can be accessed via the public in order to purchase one of the NFTs in the collection.

The purpose of the `NFTDropContractBasic.js` is to provide a point of reference for developers seeking to launch an NFT drop on the Agoric blockchain. While the implementation details are in complete control of the developer, some features that one may want to extend this contract with are:
  * Fixing the total supply of NFTs available.
  * Specifiying [the time](../../../repl/timerServices.md#timer-services):
    * in which the NFT drop is open to the public.
    * of an NFT drop deadline, after which users will no longer be able to mint and/or purchase.
  * Embedded additional metadata relating the project.
  * Whatever your heart desires!

The code for the smart contract can be found below:
```js
/** @type {ContractStartFn} */
const start = async (zcf) => {
  const { pricePerNFT, nftName } = zcf.getTerms();

  // Set up the mint
  const mint = await zcf.makeZCFMint(nftName, AssetKind.SET);
  const { brand: NFTBrand } = mint.getIssuerRecord();

  let currentId = 1n;
  const { zcfSeat: sellerSeat } = zcf.makeEmptySeatKit();

  /** @type {OfferHandler} */
  const buyNFTs = (buyerSeat) => {
    // Mint the NFTs
    const amount = AmountMath.make(NFTBrand, harden([currentId]));
    mint.mintGains(harden({ NFTs: amount }), buyerSeat);
    currentId += 1n;

    // Take the money
    sellerSeat.incrementBy(buyerSeat.decrementBy(harden({ Money: pricePerNFT })));

    zcf.reallocate(buyerSeat, sellerSeat);
    buyerSeat.exit();

    return 'your offer was successful';
  };

  const publicFacet = Far('NFT Drop', {
    makeInvitation: () => zcf.makeInvitation(buyNFTs, 'buyNFTs'),
  });

  return harden({ publicFacet });
};

```

Taking a look inside of the contract code, you will notice that the minting process occurs **at the time of purchase**. This approach is in contrast to one in which a set of NFTs are minted prior to being made available to the public for purchase. 

To accomplish this design, the contract first creates an internal `mint` variable. Note that the `mint` variable specifies the [`AssetKind`](../../../ertp/api/issuer.md#makeissuerkit-allegedname-assetkind-displayinfo) to be a `SET` which is necessary when creating NFTs with Zoe.

```js
const mint = await zcf.makeZCFMint(nftName, AssetKind.SET);
```

Once the `mint` has been created, the next step is to use it within the `buyNFTs` function which will be provided to the the public as an invitation. Additionally, we will see that each NFT has a unique identifier, `currentId`, that is embedded within the NFT at the time it is minted. Although it is intended to be a placeholder, the use of `currentId` is meant to demonstrate how one could add unique properties to an NFT.

```JS
  /** @type {OfferHandler} */
  const buyNFTs = (buyerSeat) => {
    // Mint the NFTs
    const amount = AmountMath.make(NFTBrand, harden([currentId]));
    mint.mintGains(harden({ NFTs: amount }), buyerSeat);
    currentId += 1n;

    // Take the money
    sellerSeat.incrementBy(buyerSeat.decrementBy(harden({ Money: pricePerNFT })));

    zcf.reallocate(buyerSeat, sellerSeat);
    buyerSeat.exit();

    return 'your offer was successful';
  };
```

The final step is to create a [Remotable](../../../guides/js-programming/far.md#marshaling-by-copy-or-by-presence) for our public invitation using `zcf`s `makeInvitation` method. 

```js
const publicFacet = Far('NFT Drop', {
  makeBuyInvitation: () => zcf.makeInvitation(buyNFTs, 'buyNFTs'),
});

return harden({ publicFacet });
```
The contract is ready to be instantiated using the `E` as demonstrated in the test code below. In this snippet, the `nftName` for this collection is `PetRocks`, all of which are sold for the same fixed-price. 

```js
  const terms = harden({
    pricePerNFT: AmountMath.make(moneyBrand, 10n),
    nftName: 'PetRocks',
  });
  const { instance } = await E(zoe).startInstance(installation, issuers, terms);

  const publicFacet = E(zoe).getPublicFacet(instance);
  // we now have access to the pubic invitation for the `buyNFTs` function.
  const invitation = E(publicFacet).makeInvitation();
```

Those who wish to understand more about this contract are encouraged to inspect these test code and run it on their own machine.
