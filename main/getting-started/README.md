# Agoric Documentation Guide

::: tip Alpha status
The Agoric platform is at the alpha stage. It has not yet been 
formally tested or hardened. Do not use for production purposes. 
:::

Agoric provides three main types of documentation, as well as links to
"big picture" presentations and papers and links to our source code on GitHub. This page
describes our documentation structure, where documents are, and when you should use them, 
as well as what order to read them.

Our three main documentation types are:
- **Getting Started**: These are the first things you should
read. They cover what to do to install, set up, and start
using Agoric's smart contract tools. They also introduce those tools and
their underlying concepts and designs.
- **Guides**: These are more detailed and complete descriptions
of our tools and their concepts, designs, and usage. They include
descriptions and examples of how to do various tasks with Agoric
software.
- **Reference**: These are the specs for our APIs and commands,
  as well as checklist tables that specify and explain the
  steps for extended procedures, such as installing Agoric
  software.

Some documents fall into multiple categories. For example, our Agoric
installation document is both a Reference and a Getting Started document.

You should read them in this order:
1. **[Before Using the Agoric SDK](./before-using-agoric.md)**: 
How to install software that the Agoric SDK depends on.
2. **[Start a Project](./start-a-project.md)**: A
  procedure checklist that walks you through creating a new Agoric SDK 
  project from scratch. 
3. **[ERTP Introduction](./ertp-introduction.md)**:
  A Getting Started document that briefly explains the concepts and components of Agoric's Electronic
  Rights Transfer Protocol (ERTP) which is the heart of Agoric
  software.
4. **[Zoe Introduction](./intro-zoe.md)**: 
  A Getting Started document that briefly explains the concepts and components of Zoe, our reusable smart contract 
  for writing other smart contracts in JavaScript. Zoe implements our guarantee that users
  either get what they wanted from the contract or a full refund of what they put up for it. 
5. **[Agoric Platform/Stack](/platform/README.md)**: A brief introduction to the complete Agoric platform/technical stack.
6. **[Agoric Dapp Guide](/dapps/README.md)**: 
   A Dapp is a decentralized application, typically with a browser-based user interface, a public
   API server, and a contract running on the Agoric blockchain. This document explains a Dapp's
   basic directory and file structure.
7. **[Deploying Smart Contracts](./deploying.md)**: 
  A brief description of the tools and processes for deploying contracts to the chain and
  application code to the application server.
8. **[JavaScript Distributed Programming Guide](/distributed-programming.md)**: 
  We've made some Agoric-specific additions at various layers, including concepts, syntax, 
  and additions to the Agoric library. You should know about and understand these before 
  programming on the Agoric platform.
8. **[ERTP Guide](/ertp/guide/README.md)**: 
  A detailed description of ERTP concepts, design, components, and commands. 
  Includes examples of command usage. You should also look at the ERTP API 
  documentation, accessible from the ERTP documentation sidebar menu.
9. **[Zoe Guide](/zoe/guide/README.md)**: 
  A detailed description of Zoe concepts, design, components, and commands. 
  Includes examples of command usage. You should also look at the Zoe API 
  documentation, accessible from the Zoe documentation sidebar menu.

When needed, refer to the **[ERTP API Reference](/ertp/api/)**, **[Zoe API
Reference](/zoe/api/)**, **[Wallet API Reference](/wallet-api.md)**,
and **[Agoric CLI Guide](/getting-started/agoric-cli-guide.md)** for details about 
their respective commands. 

You use Agoric's Dynamic IBC ([Inter-Blockchain Communication Protocol](https://cosmos.network/ibc)), aka dIBC, 
to connect to services on other blockchains or make services on the Agoric blockchain available to other blockchains. 
See our **[dIBC Guide](https://github.com/Agoric/agoric-sdk/blob/master/packages/SwingSet/docs/networking.md)** for more information. 

To familiarize yourself with working Agoric smart contracts, take a look at our 
**[Sample Contracts](/zoe/guide/contracts/README.md)**. 

We also have an **[Agoric Glossary](/glossary/)** for terms we've given Agoric-context
definitions to (i.e. what does *mint* mean in an Agoric context?).

For more about Agoric's ideas, plans, and goals, see our **[Homepage](https://agoric.com/)**. 

Our **[Papers](https://agoric.com/papers/)** page has links to various documents you may find useful, such as conference talks, white papers, conference papers, etc. that discuss Agoric's technical background and ideas.

Our **[YouTube channel](https://www.youtube.com/c/Agoric/videos)** has many different videos, ranging from our monthly Community Calls to workshops and 
tutorials. We particularly recommend the [OTC Desk Contract tutorial](https://www.youtube.com/watch?v=faxrecQgEio)(Note: This is on the Cosmos
channel, not the Agoric channel) and [Smart Contracts in JavaScript](https://www.youtube.com/watch?v=qudVWjSqDJU&t=2732s) (one of our DiFi Workshops).

Finally, we have links to the ultimate documentation; the **[GitHub
repositories](https://github.com/Agoric/)** for the code that defines the Agoric SDK.
