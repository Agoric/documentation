---
####
# YAML section setting up the home page
# run `yarn docs:dev` at any time to start local dev server and access
# website at localhost:8080 by default
####
home: true # use default home page layout (hero image with text, features section)
heroImage: https://agoric.com/assets/images/logo.svg
## Action button
actionText: Try Alpha → # text that goes in the button
actionLink: /getting-started/alpha.html # go-to link when clicking on button
features:
  - title: New Protocol
    details: Agoric empowers individuals to securely execute transactions, establish new markets, and craft novel patterns of exchange — without centralized control.

  - title: Better security architecture with OCAPs
    details: Agoric uses an object-capability (ocap) security architecture, in which access to a programming object itself is the authority to use the object.

  - title: Securely Create and Transfer
    details: All kinds of digital assets can be easily created, but importantly, they can be transferred in exactly the same ways, with exactly the same security properties.

footer: Apache-2.0 Licensed | Copyright © 2020 - Agoric
---

<div class="flex flex--column flex--center">
  <p>
    Learn about <a href="/getting-started/ertp-introduction.html">ERTP</a>, a uniform way of transferring tokens and other digital assets in JavaScript.
  </p>
  <Button-Action-Link
    text="Get Started with ERTP"
    link="/ertp/guide/"
  />
</div>
<br>
<div class="flex flex--column flex--center">
  <p>Ready for more? Check out <a href="/getting-started/intro-zoe.html">Zoe</a>. Zoe is responsible for enforcing what we call "offer safety", and the smart contract that runs on top of Zoe is responsible for figuring out a proposed reallocation of resources.
  </p>
  <Button-Action-Link
    text="Build on Zoe"
    link="/zoe/guide/"
  />
</div>

## The Platform
Building on 30 years of experience, Agoric is developing a secure distributed ocap platform for smart contracts and market-oriented programming. Our platform supports the development of smart contracts and market institutions across many different scales, from large public blockchains to small two-party contracts.

Our ocap platform consists of:

- A robust architecture for building secure smart contracts.
- A foundation in JavaScript for maximum reach.
- A cryptographic routing fabric for inter-chain interoperability.
- A library of market abstractions and a framework for securely composing them.
- A framework for secure user interaction.

## Getting Started

Our [Documentation Guide](/getting-started/) describes our documentation and suggests an order for getting started with the Agoric platform.
