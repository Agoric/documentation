---
layout: home

title: Agoric
titleTemplate: Secured, Distributed JavaScript

hero:
  name: Agoric
  text: JavaScript-Powered Smart Contract Platform
  tagline: Secure, adaptable, and approachable. Discover the blockchain framework tailored for JavaScript developers.
  actions:
    - theme: brand
      text: Get Started
      link: /guides/getting-started/
    - theme: alt
      text: View on GitHub
      link: https://github.com/agoric/agoric-sdk
  image:
    src: /bld-logo-color.svg
    alt: Agoric

features:
  - icon: ❓
    title: What is Agoric?
    details: An overview of the Agoric chain and platform
    link: /what-is-agoric

  - icon: 🧑‍🎓️
    title: Learn
    details: Learn how Smart Contracts work on Agoric Platform
    link: /guides/zoe/

  - icon: 🛠️
    title: Build
    details: Build Cross Chain Smart Contracts using Agoric Orchestration APIs
    link: /guides/getting-started/

  - icon: 📑
    title: Tutorials
    details: Step by step instructions on how to get Started with Smart Contracts
    link: /guides/getting-started/tutorial-dapp-agoric-basics

  - icon: 💬
    title: Discord
    details: Meet our developer community and make friends.
    link: https://agoric.com/discord

  - icon: 💡
    title: Github Discussions
    details: Ask questions. Share ideas.
    link: https://github.com/Agoric/agoric-sdk/discussions

  - icon: 🕘
    title: Office Hours
    details: Join us for open discussion, whether you're just getting started or deep into the details.
    link: https://github.com/Agoric/agoric-sdk/wiki/Office-Hours

  - icon: 🐦
    title: Twitter
    details: Catch up on all things Agoric product, events, and more.
    link: https://twitter.com/agoric
---

<Chatbot /> <!-- chat bot demo -->

<style>
:root {
  --vp-home-hero-name-color: var(--vp-c-brand-1);
  --vp-home-hero-image-background-image: linear-gradient(-45deg, #e84b62 50%, #464646 50%);
  --vp-home-hero-image-filter: blur(44px);
  .dark {
    --vp-home-hero-image-background-image: linear-gradient(-45deg, #f7aab1 50%, #7c7c7c 50%);
  }
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}

</style>

