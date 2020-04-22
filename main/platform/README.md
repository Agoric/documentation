# The Agoric Platform

![agoric stack](./assets/stack.svg "The Agoric Stack")

This document focuses on the layers beneath Zoe and ERTP, what we call
the Agoric Platform. This includes "Swingset", which can be thought of
as our VM providing a distributed Javascript environment, as well as
the Cosmos SDK and IBC. 

## Swingset

On a single blockchain, or even a single machine with multiple users,
it's very important to ensure that one user cannot prevent another
user's code from executing and that the way in which code is
interleaved doesn't open up hazards such as reentrancy. Swingset
solves that problem by dividing up the execution environment into
*vats*. A <router-link
to="/distributed-programming.html#vats">vat</router-link> is a *unit
of synchrony*. This means that within a JavaScript vat, objects and
functions can communicate with one another synchronously. Between
vats, objects and functions communicate asynchronously, by design.

A vat runs a single *event loop*.

A physical machine can run one or several vats. A blockchain can run
one or several communicating vats.

The internal state of a vat can be stored in a persistent memory so
that the vat can be turned off and later turned back on (on the same
or a different physical machine) by loading the stored state.

A Swingset instance also handles communication between the vats it
provides and the outside world. On a blockchain, this means writing to
a part of the state that is intended to serve as an outbox. On a
non-blockchain machine, this might mean sending a message to a remote
machine.

## Cosmos SDK

Our testnet has a single Swingset instance with multiple vats running
on top of Cosmos SDK. Swingset and most of our code is written in
JavaScript, so we currently have a complicated process that starts up
Node, starts a Swingset instance, and then connects through Go to ???

## Dynamic IBC

IBC is the protocol for [Inter-Blockchain
Communication](https://cosmos.network/ibc/). IBC enables messages to
be sent from one blockchain to another with the use of intermediary
relayers. Dynamic IBC (dIBC) is, in essence, the idea of using a smart
contract or VM platform to deploy new contracts that support new
protocols, all on an existing chain without having to wait for chain
upgrades. The tl;dr is: There shouldn’t need to be a platform upgrade
or chain governance vote every time someone wants to roll out a new
protocol.

For more information, check out [a recent article on
dIBC](https://medium.com/agoric/the-road-to-dynamic-ibc-4a43bc964bca).

## Tendermint

Tendermint is a byzantine fault tolerant engine, defining how blocks
are agreed upon and created. Effectively, Tendermint is the lowest level layer that
defines the blockchain itself.