---
####
# YAML section setting up the home page
# run `yarn docs:dev` at any time to start local dev server and access
# website at localhost:8080 by default
####
home: true # use default home page layout (hero image with text, features section)
heroImage: /logo.svg
## Action button
actionText: Get Started → # text that goes in the button
actionLink: /guides/getting-started/ # go-to link when clicking on button

## Features section
features:
  - title: Electronic Rights Transfer Protocol (ERTP)
    details: Agoric empowers individuals to securely execute transactions, establish new markets, and craft novel patterns of exchange — without centralized control.

  - title: Better security architecture with OCaps
    details: Agoric uses an object-capability model (OCaps) security architecture, in which access to a programming object itself is the authority to use the object.

  - title: Securely Create and Transfer Assets
    details: All kinds of digital assets can be easily created, but importantly, they can be transferred in exactly the same ways, with exactly the same security properties.

footer: Apache-2.0 Licensed | Copyright © 2022 - Agoric
---

<div class="flex flex--column flex--center">
  <p>
    Learn about ERTP (Electronic Rights Transfer Protocol), a uniform way of transferring tokens and other digital assets in JavaScript.
  </p>
  <Button-Action-Link
    text="Explore ERTP"
    link="/guides/ertp/"
  />
</div>
<br>
<div class="flex flex--column flex--center">
  <p>Check out Zoe, a smart contract framework responsible for enforcing what we call "offer safety". The smart contracts that run on top of Zoe are responsible for figuring out proposed reallocations of resources.
  </p>
  <Button-Action-Link
    text="Build on Zoe"
    link="/guides/zoe/"
  />
</div>

## The Platform

Building on 30 years of experience, Agoric is developing a secure distributed object-capabilities (OCap) platform for smart contracts and market-oriented programming. Our platform supports the development of smart contracts and market institutions across many different scales, from large public blockchains to small two-party contracts.

Our OCaps platform consists of:

- A robust architecture for building secure smart contracts.
- A foundation in JavaScript for maximum reach.
- A cryptographic routing fabric for inter-chain interoperability.
- A library of market abstractions and a framework for securely composing them.
- A framework for secure user interaction.
