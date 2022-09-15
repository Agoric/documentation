---
####
# YAML section setting up the home page
# run `yarn docs:dev` at any time to start local dev server and access
# website at localhost:8080 by default
####
home: true # use default home page layout (hero image with text, features section)
heroImage: https://agoric.com/wp-content/themes/agoric_2021_theme/assets/img/logo.svg
## Action button
actionText: Get Started → # text that goes in the button
actionLink: /getting-started/before-using-agoric.html # go-to link when clicking on button

## Features section
features:
  - title: Electronic Rights Transfer Protocol (ERTP)
    details: Agoric empowers individuals to securely execute transactions, establish new markets, and craft novel patterns of exchange — without centralized control.

  - title: Better security architecture with Ocaps
    details: Agoric uses an object-capability model (Ocaps) security architecture, in which access to a programming object itself is the authority to use the object.

  - title: Securely Create and Transfer Assetss
    details: All kinds of digital assets can be easily created, but importantly, they can be transferred in exactly the same ways, with exactly the same security properties.

footer: Apache-2.0 Licensed | Copyright © 2022 - Agoric
---

<div class="flex flex--column flex--center">
  <p>
    Learn about <a href="/getting-started/ertp-introduction.html">ERTP</a>, a uniform way of transferring tokens and other digital assets in JavaScript.
  </p>
  <Button-Action-Link
    text="Explore ERTP"
    link="/ertp/guide/"
  />
</div>
<br>
<div class="flex flex--column flex--center">
  <p>Check out <a href="/getting-started/intro-zoe.html">Zoe</a>, a responsible for enforcing what we call "offer safety". The smart contract that runs on top of Zoe is responsible for figuring out proposed reallocations of resources.
  </p>
  <Button-Action-Link
    text="Build on Zoe"
    link="/zoe/guide/"
  />
</div>

## The Platform
Building on 30 years of experience, Agoric is developing a secure distributed ocap platform for smart contracts and market-oriented programming. Our platform supports the development of smart contracts and market institutions across many different scales, from large public blockchains to small two-party contracts.

Our OCaps platform consists of:

- A robust architecture for building secure smart contracts.
- A foundation in JavaScript for maximum reach.
- A cryptographic routing fabric for inter-chain interoperability.
- A library of market abstractions and a framework for securely composing them.
- A framework for secure user interaction.

## Build Beta Dapps

This documentation site goes into detail about the Agoric system. For Beta, we recommend everyone begin by [getting started](/getting-started/beta.md) with a deployed application as a user. You'll start by getting your wallet set up, including getting some mock assets to play with. Then you'll be able to play experiment the deployed application, see how it works, and starting envisioning your own Dapp.