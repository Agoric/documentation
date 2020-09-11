# Electronic Rights Transfer Protocol - ERTP

::: tip Out-of-date status
ERTP's master branch is currently an Alpha release candidate. This doc
is in the process of being updated, and should be current with
the release candidate in another few days. What you see here is out of
date. We apologize for any inconvenience this may cause. 
:::

## Introduction

ERTP, or the Electronic Rights Transfer Protocol, is Agoric's token
standard for fungible and non-fungible assets.

![ERTP Foundations](./assets/ertp-foundations.svg)

ERTP is a uniform way of transferring tokens and other digital assets in JavaScript. All kinds of digital assets can be easily created, but importantly, they can be transferred in exactly the same ways, with exactly the same security properties.

You are currently reading the guide. There is also an [ERTP API reference](/ertp/api/) available.

## How It Works

ERTP itself doesn't have any concept of cryptography or account addresses.
Instead, it uses object capabilities to enforce access control.
Instead of having to prove ownership of a corresponding private key,
in the world of object capabilities, if your program has a reference
to an object, it can call methods on that object. If it doesn't have a
reference, it can't. For more on object capabilities, see [Chip
Morningstar's
post](http://habitatchronicles.com/2017/05/what-are-capabilities/).

ERTP is at the economic layer of the Agoric stack. You can find out
more about the Agoric stack in this introductory video:
<iframe width="560" height="315" src="https://www.youtube.com/embed/52SgGFpWjsY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Guide

Let's get started by creating some different kinds of digital assets:
- [Creating a fungible asset with ERTP](./create-fungible-erights.md)
- [Creating non-fungible tokens with ERTP](./create-non-fungible-tokens.md)
