---
####
# YAML section setting up the home page
# run `yarn docs:dev` at any time to start local dev server and access
# website at localhost:8080 by default
####
home: false # use default home page layout (hero image with text, features section)

## Features section
# features:
#   - title: Electronic Rights Transfer Protocol (ERTP)
#     details: Agoric empowers individuals to securely execute transactions, establish new markets, and craft novel patterns of exchange — without centralized control.

#   - title: Better security architecture with OCaps
#     details: Agoric uses an object-capability model (OCaps) security architecture, in which access to a programming object itself is the authority to use the object.

#   - title: Securely Create and Transfer Assets
#     details: All kinds of digital assets can be easily created, but importantly, they can be transferred in exactly the same ways, with exactly the same security properties.

footer: Apache-2.0 Licensed | Copyright © 2023 - Agoric
---

<div class="flex flex--column flex--left">
  <h1>Agoric documentation</h1>
  <div style="margin-bottom: 1em;">
    The Agoric platform makes it possible to write safer smart contracts with your JavaScript skillset.
  </div>
  <HomeButtonRow
    title1="What's Agoric"
    text1="Learn about Agoric and its Javascript platform"
    link1="/guides/what-is-agoric/"
    title2="Getting Started"
    text2="Set up your environment and start building apps"
    link2="/guides/getting-started/"
    title3="Contract Framework"
    text3="Set up your environment and start building"
    link3="/guides/zoe/"
  />
  <HomeButtonRow
    title1="Token Standards"
    text1="Understand the ins and outs of Agoric's ERTP standard"
    link1="/guides/ertp/"
    title2="Samples"
    text2="Look through our smart contract and dapp examples"
    link2="/guides/zoe/contracts/"
    title3="Integrations"
    text3="Browse through our catalogue of integrations"
    link3="/guides/chainlink-integration.html#overview"
    />
</div>

<br/>

<div class="flex flex--column flex--left">
  <h1>Blockchain resources</h1>
  <div>
    The tools your need to get the job done.
  </div>
  <HomeButtonRow
    title1="Block Explorer"
    text1="View transactions across the Agoric chain"
    link1="https://bigdipper.live/agoric"
    title2="Keplr Wallet"
    text2="A native wallet running with HardenedJS under the hood"
    link2="https://www.keplr.app/download"
    title3="Component Library"
    text3="Pre-built smart contracts for DeFi, NFTs, and cross-chain!"
    link3="https://components.agoric.com/"
  />
  <HomeButtonRow
    title1="Cosmos SDK"
    text1="Our battle-tested consensus mechanism"
    link1="https://docs.cosmos.network/"
    title2="IBC"
    text2="The protocol ensuring Agoric is interoperable with 60÷ chains"
    link2="https://ibc.cosmos.network/main"
    title3="Bounties"
    text3="A rotating list of incentivized bounties to grow our platform"
    link3="https://components.agoric.com/bounties/open-bounties"
    />
</div>

<br/>

<div class="flex flex--column flex--left">
  <h1>Ready to learn more?</h1>
  <div>
    Once you've completed the <a href="">Getting Started</a> here are a few more steps..
  </div>
  <div>
    <h3>
      <a href="/guides/js-programming/hardened-js.html">Learn the basics of HardenedJS</a>
    </h3>
    <div>
      It's just JavaScript but with extra safety features - see why MetaMask uses it to safely run their Snaps technology for 30M+ customers.
    </div>
  </div>

  <div>
    <h3>
      <a href="m/guides/zoe/">See the safety properties of our Zoe Framework</a>
    </h3>
    <div>
      From Offer Safety to the POLA, the Zoe Framework protects devs (and users) while writing your smart contract logic.
    </div>
  </div>
</div>

<div class="flex flex--column flex--left">
  <h1>Videos</h1>
  <div>
    Check out our primer on writing programmable smart contracts in JavaScript!
  </div>
  <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/Em32hztid_k?si=9CTt0mB1M7VtFMiR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" allowfullscreen></iframe>
</div>

<div class="flex flex--column flex--left">
  <h1>Connect with us</h1>
</div>
<HomeButtonRow
  title1="Office Hours"
  text1="Workshop ideas with our engineers every Wednesday!"
  link1="https://agoric.com/office-hours"
  title2="Discord"
  text2="Meet our developer community and make friend <3"
  link2="https://agoric.com/discord"
  title3="Twitter"
  text3="Catch up on all things Agoric product, events, and more"
  link3="https://twitter.com/agoric"
/>
