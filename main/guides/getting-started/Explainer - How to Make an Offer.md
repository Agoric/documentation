# Making an Offer
As you saw in the `dapp-offer-up` tutorial you could use the dapp UI to make an offer on up to three items. Let's take a look at how making offers works in this dapp.

## How It Works
We can see how the offer is made in this application by taking a look at the `App.tsx` file located under `ui/src`. Note the `makeOffer` function which handles making an offer.
Note that each offer must specify both a 'give' (what is being offered for the exchange, in this case some IST) and a 'want' (what the buyer wants to trade for, in this case some maps, potions, and scrolls).
```js
const makeOffer = (giveValue: bigint, wantChoices: Record<string, bigint>) => {
  const { wallet, offerUpInstance, brands } = useAppStore.getState();
  if (!offerUpInstance) throw Error('no contract instance');
  if (!(brands && brands.IST && brands.Item))
    throw Error('brands not available');

  const value = makeCopyBag(entries(wantChoices));
  const want = { Items: { brand: brands.Item, value } };
  const give = { Price: { brand: brands.IST, value: giveValue } };

  wallet?.makeOffer(
    {
      source: 'contract',
      instance: offerUpInstance,
      publicInvitationMaker: 'makeTradeInvitation',
    },
    { give, want },
    undefined,
    (update: { status: string; data?: unknown }) => {
      if (update.status === 'error') {
        alert(`Offer error: ${update.data}`);
      }
      if (update.status === 'accepted') {
        alert('Offer accepted');
      }
      if (update.status === 'refunded') {
        alert('Offer rejected');
      }
    },
  );
};
```

### App.tsx
We can see the `makeOffer` function being called when `App.tsx` is rendering the `Trade.tsx` component:
```
  return (
    <>
      <Logos />
      <h1>Items Listed on Offer Up</h1>

      <div className="card">
        <Trade
          makeOffer={makeOffer}
          istPurse={istPurse as Purse}
          walletConnected={!!wallet}
        />
        <hr />
        {wallet && istPurse ? (
          <Inventory
            address={wallet.address}
            istPurse={istPurse}
            itemsPurse={itemsPurse as Purse}
          />
        ) : (
          <button onClick={tryConnectWallet}>Connect Wallet</button>
        )}
      </div>
    </>
  );
```

### Trade.tsx
Finally, by taking a look at `components/Trade.tsx` we can see the passed `makeOffer` function being used to handle the click event on the 'Make an Offer' button.
```
      <div>
        {walletConnected && (
          <button onClick={() => makeOffer(giveValue, choices)}>
            Make an Offer
          </button>
        )}
      </div>
```

::: tip Video Walkthrough

As you're going through this explainer it may be helpful to watch this video walkthrough.

<iframe width="560" height="315" src="https://www.youtube.com/embed/SbxygFIiXWA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

:::


### The Result
The `Trade.tsx` component button which calls the `makeOffer` function:
![The Trade.tsx component button which calls the makeOffer function](./assets/keplr-legible-offer.png)
