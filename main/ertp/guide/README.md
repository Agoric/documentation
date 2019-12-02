# Electronic Rights Transfer Protocol - ERTP

## Introduction

Bitcoin has unspent transactions. Ethereum has account balances.
Agoric has ERTP.

![ERTP Foundations](./assets/ertp-foundations.svg)

ERTP is a uniform way of transferring tokens and other digital assets in JavaScript. All kinds of digital assets can be easily created, but importantly, they can be transferred in exactly the same ways, with exactly the same security properties.

You are currently reading the guide. There is also an [ERTP API reference](/ertp/api/) available.

## How It Works

ERTP, or the Electronic Rights Transfer Protocol, is a smart contract
framework. ERTP itself doesn't have any concept of cryptography.
Instead, it uses object capabilities to enforce access control.
Instead of having to prove ownership of a corresponding private key,
in the world of object capabilities, if your program has a reference
to an object, it can call methods on that object. If it doesn't have a
reference, it can't. For more on object capabilities, see [Chip
Morningstar's
post](http://habitatchronicles.com/2017/05/what-are-capabilities/).

ERTP is the top layer of the Agoric stack. You can find out more about this stack in this introductory video:
<iframe width="560" height="315" src="https://www.youtube.com/embed/52SgGFpWjsY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Guide

Let's get started by creating some different kinds of digital assets:
- [Creating a fungible asset with ERTP](./create-fungible-erights.md)
- [Explanation of the Pixel Demo](./pixel-demo-erights.md)



## Higher Order Smart Contracts

The `contractHost` tests detail the composition of a covered call option
with an escrow exchange contract.

```sh
npx tape -r esm test/swingsetTests/contractHost/test-contractHost.js
```

For more examples, please see the code for Alice and Bob in `test/swingsetTests/contractHost/`.

![higher-order-smart-contract-covered-call-escrow](https://user-images.githubusercontent.com/150986/59150181-f3f55080-89e4-11e9-8046-fcb9c10831b1.png)
