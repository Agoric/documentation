# Zoe Pre-Built Contracts

<Zoe-Version/>

While Zoe provides the means to build custom smart contracts, there is a good chance you will
want to use one that follows a commonly-used structure. Therefore, we currently provide several
pre-built contracts that can be imported and run on Zoe:

## Inter Protocol

### [Automated Market Maker](./constantProductAMM.md) (AMM)
An automated market maker with multiple liquidity pools that can trade
between any pair of funded currencies. It charges a poolFee (added to the
liquidity pools) and a protocolFee (set aside for the benefit of the Agoric
economy). These fees are subject to change by votes controlled by and made
visible by the governance system.

### [Vault](./vault.md)

The Vault is the primary mechanism for making IST (the Agoric stable-value
currency) available to participants in the economy. It does this by issuing
loans against supported types of collateral. The creator of the contract can
add new types of collateral. (This is expected to be under the control of
on-chain governance after the initial currencies are defined when the contract
starts up.)

### [Parity Stability Module](./parity-stability-module.md) (PSM)
The PSM supports efficiently minting/burning a stable token at a 
specified fixed ratio to a reference stable token.

### [Stake Factory](./stake-factory.md)
A contract for providing loans on the basis of staked assets that earn rewards.

### [Asset Reserve](./asset-reserve.md)
Asset Reserve holds onto assets for the Inter Protocol, and can
dispense it for various purposes under governance control. 

## Oracles

### [Oracle Contract](./oracle.md) 
A low-level oracle contract for querying [Chainlink](https://docs.chain.link/docs/request-and-receive-data#config)
or other oracles. 

### [PriceAuthority](/zoe/guide/price-authority.md)
To use an price oracle in your own contract, we recommend using the `priceAuthority`
higher-level abstraction.

## DeFi Contracts

These contracts create various sorts of financial instruments.

### [Loan Contract](./loan.md)
A basic collateralized loan contract.

### [Funded Call Spread](./fundedCallSpread.md) 
Creates a pair of fully collateralized call spread options. 
They are ERTP assets and can be used as such in other contracts. 
This contract has two variants, which affect how invitations are created. 
This version is fully funded by the creator, who receives a matching pair
of call spread options. They can be traded or sold separately.

### [Priced Call Spread](./pricedCallSpread.md) 
Creates a pair of fully collateralized call spread options.
They are ERTP assets and can be used as such in other contracts. 
This contract has two variants, which affect how invitations are created. 
In this version, the creator requests a pair of invitations. Each one lets
the holder obtain one of the positions by providing a started portion of 
the collateral. This version is useful for a market maker who finds pairs
of participants with matching interests.

### [Covered Call](./covered-call.md) 
Creates a call option, which is the right to buy an underlying asset.

### [OTC Desk](./otc-desk.md) 
A contract for giving quotes that can be exercised. The quotes are 
guaranteed to be exercisable because they are actually options with 
escrowed underlying assets.

## Generic Sales/Trading Contracts

These contracts involve trading or selling ERTP digital assets.

### [Sell Items](./sell-items.md) 
A generic sales contract, mostly used for selling NFTs for money.

### [Atomic Swap](./atomic-swap.md)
A basic trade of digital assets between two parties.

### [Barter Exchange](./barter-exchange.md) 
An exchange with an order book letting all kinds of goods
to be offered for explicit barter swaps.
  
### [Second-price Auction](./second-price-auction.md) 
An auction in which the highest bidder wins and pays the 
second-highest bid. This version doesn't conceal the 
bids (an essential aspect of second price auctions). 
Therefore, **it should not be used in production**.

### [Simple Exchange](./simple-exchange.md)
A basic exchange with an order book for one asset,
priced in a second asset.

## Governance

### [Escrow To Vote](./escrow-to-vote.md )
A coin voting contract in which votes are weighted by 
the escrowed governance tokens.

## Quick Examples

### [Automatic Refund](./automatic-refund.md) 
A trivial contract that gives the user back what they put in.

### [Mint Payments](./mint-payments.md) 
An example of minting fungible tokens.

## NFT Experiments

### [Mint and Sell NFTs](./mint-and-sell-nfts.md) 
A contract that mints NFTs and sells them through 
a separate sales contract.

### [Use Obj Example](./use-obj-example.md) 
An example of how you might associate the ability to take 
an action with ownership of a particular digital asset. In 
this case, you can color a pixel if you own the NFT for the pixel.

If you want to build your own smart contract, start with the [Zoe API](../../api/README.md)
