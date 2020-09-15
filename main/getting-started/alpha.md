# Agoric Alpha	
Release Version: Adriatic

![Alpha Cover](./assets/alpha-cover.png)

We’re building components to power the DeFi ecosystem. Come take a peek under the hood and help us scale our next-gen infrastructure. The Alpha Adriatic release provides you access to our toolset, API, and public chain.

[Start Coding](https://agoric.com/documentation/getting-started/)
[Join Community](https://discord.gg/gC9z6US)

---------------------

## What you can build in Alpha Adriatic 

Numerous transaction components -- what we think of as DeFi Legos -- are available in the Alpha Adriatic release. We’ll be adding to the pool with our growing community’s help and participation in the coming months as we scale contributions. The initial slate of elements includes the following: 

![Automated Market Maker](./assets/amm.png)
### Automated Market Maker
Build a smart contract that acts as an on-chain automated DEX with liquidity. 

![Autoswap](./assets/autoswap.png)
### Autoswap
Tap into our Uniswap-like, constant-product AMM that executes upon finding a match in the current liquidity pool.

![Covered Call](./assets/covered-call.png)
### Covered Call
Create an option contract that enables the holder to buy a specific, previously escrowed asset at a predetermined strike price (before expiration).

![Simple Exchange](./assets/simple-exchange.png)
### Simple Exchange
A basic exchange with an order book for one asset, priced in a second asset.

## Anatomy of a Smart Contract
A call option is the right (with no obligation) to buy digital assets at a predetermined price, called the strike price. This call option is "covered," meaning that the owner of the digital assets must put the assets in escrow. Escrow guarantees that the assets can be transferred without relying on the owner of the digital assets to keep their promise. The call option has an expiration date, when the opportunity is cancelled. The owner of the digital assets cannot remove the assets from escrow before the expiration date. Any number of assets of different brands can be escrowed under different keywords. The proposal must have an exit record with the key "afterDeadline": 

```
{
    give: { StrikePrice: moola(25) },
    want: { Asset: concertTicket("E4") }, 
    exit: { afterDeadline: { deadline: time, timer: myTimer } },
}
```

This deadline serves as the expiration date for the covered call option. After this deadline, if the option has not been exercised, the underlying assets are automatically paid out to the creator of the contract as a refund. 

[Start Building](https://agoric.com/documentation/getting-started/)

## Focused on the developer experience
Agoric is a company of engineers, and we've tailored the developer experience based on our decades of activity in open-source software. Here’s what you can expect in Alpha. 

* VS Code with debugging support
* Ability to build and test locally
* Types included to accelerate your local development
* Rapid testing iteration with our AVA infrastructure

### Stuck on something?
Chat with our engineers on [Agorc Discord](https://discord.gg/gC9z6US).

Want to connect on socials? 
Follow us on [Twitter](https://twitter.com/agoric).