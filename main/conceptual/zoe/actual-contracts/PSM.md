# PSM Contract

<Zoe-Version/>

##### [View the code on Github](https://github.com/Agoric/agoric-sdk/blob/master/packages/inter-protocol/src/psm/psm.js) (Last updated: Aug 15, 2022)

The Parity Stability Module (PSM) supports minting or burning Inter Stable Tokens (ISTs)
at a specified fixed ratio to external stable tokens.

IST is an evolving, fully collateralized, cryptocurrency-backed decentralized stable token for the interchain ecosystem on the Agoric chain. IST is designed to maintain parity with the US dollar (USD) for broad accessibility and provide Agoric and the interchain ecosystem users an asset with minimum price volatility. In addition, IST is the native fee token for the Agoric platform and provides some of the core functionality and stability for the Agoric cryptoeconomy. Right now the PSM is the only minter of ISTs.

The external stable tokens are chosen by governance in the form of a vote of all BLD holders. Governance may elect to only allow one external stable token, in which case only one PSM will be instantiated.

## PSM Parameters

The following parameters in the PSM are controllable by the EC:
GiveMintedFee - fee on trades where user wishes to trade IST for stablecoin held by the PSM. Expressed as a percentage: (0.03 = 0.03%)
WantMintedFee - fee on trades where user wishes to trade anchor (external stablecoin) in exchange for newly minted IST
MintLimit - refers to the max amount of IST, net of burns, that can be minted by this contract

## Contract API

The PSM keywords are **In** and **Out**. The contract treats the two keywords symmetrically. New offers are created and existing offers accepted in either direction.

{ give: { Asset: simoleans(5) }, want: { Price: quatloos(3) } }
{ give: { Price: quatloos(8) }, want: { Asset: simoleans(3) } }
Note: Here we used a shorthand for assets whose values are 5 simoleons, 3 quatloos, 8 quatloos, and 3 simoleons. Elsewhere this might have been done by creating amounts inline (i.e. AmountMath.make(quatloosBrand, 8n)). Or by creating amounts outside the proposal and assigning them to variables. For example, const quatloos8 = AmountMath.make(quatloosBrand, 8n); and then using quatloos8 as the value for Price in the second clause above.

The want term is an exact amount to exchange, while the give term is a limit that may be improved on. This simple exchange does not partially fill orders.

The publicFacet is returned when the contract is started.




The PSM has two primary functions: 

1. **wantMinted(seat, given, wanted)** - The user gives the PSM an accepted external stable token, which causes the PSM to mint an IST and give it to the user.
	* **seat** - 
	* **given** - 
	* **wanted** - 
2. **giveMinted(seat, given, wanted)** - The user gives an IST to the PSM. The PSM destroys the IST token, and then gives the user an external stable token.
	* **seat** - 
	* **given** - 
	* **wanted** - 

```
  /**
   * @param {ZCFSeat} seat
   * @param {Amount<'nat'>} given
   * @param {Amount<'nat'>} [wanted] defaults to maximum anchor (given exchange rate minus fees)
   */
  const giveMinted = (seat, given, wanted = emptyAnchor) => {
    const fee = ceilMultiplyBy(given, params.getGiveMintedFee());
    const afterFee = AmountMath.subtract(given, fee);
    const maxAnchor = floorMultiplyBy(afterFee, anchorPerMinted);
    AmountMath.isGTE(maxAnchor, wanted) ||
      assert.fail(X`wanted ${wanted} is more than ${given} minus fees ${fee}`);
    try {
      stageTransfer(seat, stage, { In: afterFee }, { Minted: afterFee });
      stageTransfer(seat, feePool, { In: fee }, { Minted: fee });
      stageTransfer(
        anchorPool,
        seat,
        { Anchor: maxAnchor },
        { Out: maxAnchor },
      );
      zcf.reallocate(seat, anchorPool, stage, feePool);
      burnMinted(afterFee);
    } catch (e) {
      stage.clear();
      anchorPool.clear();
      feePool.clear();
      // TODO(#6116) someday, reallocate should guarantee that this case cannot happen
      throw e;
    }
    totalAnchorProvided = AmountMath.add(totalAnchorProvided, maxAnchor);
  };
```

```
    makeGiveMintedInvitation() {
      return zcf.makeInvitation(
        giveMintedHook,
        'giveMinted',
        undefined,
        M.split({
          give: { In: stableAmountShape },
          want: M.or({ Out: anchorAmountShape }, {}),
        }),
      );
    },
```

```
  /**
   * @param {ZCFSeat} seat
   * @param {Amount<'nat'>} given
   * @param {Amount<'nat'>} [wanted]
   */
  const wantMinted = (seat, given, wanted = emptyStable) => {
    const asStable = floorDivideBy(given, anchorPerMinted);
    assertUnderLimit(asStable);
    const fee = ceilMultiplyBy(asStable, params.getWantMintedFee());
    const afterFee = AmountMath.subtract(asStable, fee);
    AmountMath.isGTE(afterFee, wanted) ||
      assert.fail(X`wanted ${wanted} is more than ${given} minus fees ${fee}`);
    mintMinted(asStable);
    try {
      stageTransfer(seat, anchorPool, { In: given }, { Anchor: given });
      stageTransfer(stage, seat, { Minted: afterFee }, { Out: afterFee });
      stageTransfer(stage, feePool, { Minted: fee });
      zcf.reallocate(seat, anchorPool, stage, feePool);
    } catch (e) {
      stage.clear();
      anchorPool.clear();
      feePool.clear();
      // TODO(#6116) someday, reallocate should guarantee that this case cannot happen
      burnMinted(asStable);
      throw e;
    }
    totalMintedProvided = AmountMath.add(totalMintedProvided, asStable);
  };
```

```
    makeWantMintedInvitation() {
      return zcf.makeInvitation(
        wantmintedHook,
        'wantMinted',
        undefined,
        M.split({
          give: { In: anchorAmountShape },
          want: M.or({ Out: stableAmountShape }, {}),
        }),
      );
    },
```
