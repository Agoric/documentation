# Agoric Beta
Release Version: Baltic

![Agoric Banner](./assets/agoric-banner-2.png)

Welcome to Phase 1 of the Agoric Beta!

This documentation site goes into detail about the Agoric system. For Beta, we recommend everyone start by interacting with the deployed application as a user. To start, make sure you've gotten your wallet set up.

## Set Up A Wallet (Agoric Solo Machine) ##

Unlike other blockchains you may be familiar with, your "wallet" in Agoric is actually a solo machine which maintains some additional state about your account.  For now, you'll need to run some processes locally to manage this.  See below for our set-up instructions:

[Wallet Set-up Guide (Docker)](https://github.com/Agoric/agoric-sdk/wiki/Setting-up-an-Agoric-Dapp-Client-with-docker-compose)

We also have a video walking you through the set-up. To watch it, click [here](https://www.youtube.com/watch?v=e5LQx0EqR0o).

Don't worry - a downloadable application is coming (once it passes reviews).  On mainnet launch, Agoric will be integrated with several leading wallet providers via a simple plugin.

## Head to the Treasury ##

[Treasury Application](https://treasury.agoric.app)

## Start Building ##

[Start Coding](/getting-started/)

[Join Our Community](https://discord.gg/gC9z6US)

## What You Can Build in Beta

<div class="two-col-table">

| Fungible and non-fungible tokens | Atomic swap |
| ------ | ----------- |
| <div style="text-align: center">![Non Fungible Token](./assets/nft-small.png) </div> <br>Create and use either fungible or non-fungible digital assets with your contracts. | <div style="text-align: center">![Atomic Swap](./assets/autoswap-small.png) </div> <br>Enable the exchange of one cryptocurrency for another without using centralized intermediaries. |

| Covered call | Simple exchange |
| ------ | ----------- |
| <div style="text-align: center">![Covered Call](./assets/covered-call-small.png) </div> <br>Create an option contract that enables the holder to buy a specific, previously escrowed, asset at a predetermined strike price (before expiration). | <div style="text-align: center">![Simple Exchange](./assets/simple-exchange-small.png) </div> <br>A basic exchange with an order book for one asset, priced in a second asset. |

| Automated market maker (“autoswap”) |
| ------ |
| <div style="text-align: center">![Automated Market Maker](./assets/amm-small.png) </div> <br>Build a smart contract that acts as an on-chain automated DEX with liquidity. |

</div>

## Smart Contract Code Sample: Call Option

As an example, the covered call option is the right (with no obligation) to buy digital assets at a predetermined price, called the strike price. This call option is "covered," meaning that the owner escrowed the digital assets for the call option. Escrow guarantees that the assets can be transferred without relying on the owner to keep their promise. The call option has an expiration date, which is when the opportunity is cancelled. The digital assets owner cannot remove the assets from escrow before the expiration date.

```
const proposal = {
    give: { StrikePrice: moola(25) },
    want: { Asset: concertTicket("E4") },
    exit: { afterDeadline: { deadline: time, timer: myTimer } },
};
```

This deadline is the expiration date for the covered call option. If the option has not been exercised by the deadline, as specified in the above code example, its underlying assets are paid out to the contract's creator as a refund of their escrowed assets.

## Developer Experience
Agoric is a team of engineers. We've based our developer experience on our decades of open-source software experience. In our beta, you can expect the following:

* VS Code with debugging support
* Ability to build and test locally
* Types included to accelerate your local development
* Rapid testing iteration with the Ava test infrastructure

### Ready to get started?
[Start Coding](/getting-started/)

### Stuck on something?
Chat with our engineers on [Agoric Discord](https://discord.gg/gC9z6US).

### Want to connect on socials?
Follow us on [Twitter](https://twitter.com/agoric), [Telegram](https://t.me/agoricsystems) and [LinkedIn](https://www.linkedin.com/company/agoric/).
