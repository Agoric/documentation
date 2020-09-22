(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{397:function(t,e,o){"use strict";o.r(e);var r=o(42),n=Object(r.a)({},(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[o("h1",{attrs:{id:"agoric-documentation-guide"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#agoric-documentation-guide"}},[t._v("#")]),t._v(" Agoric Documentation Guide")]),t._v(" "),o("div",{staticClass:"custom-block tip"},[o("p",{staticClass:"custom-block-title"},[t._v("Alpha status")]),t._v(" "),o("p",[t._v("The Agoric platform is at the alpha stage. It has not yet been\nformally tested or hardened. Do not use for production purposes.")])]),t._v(" "),o("p",[t._v('Agoric provides three main types of documentation, as well as links to\n"big picture" presentations and papers and links to our source code on GitHub. This page\ndescribes our documentation structure, where documents are, and when you should use them,\nas well as what order to read them.')]),t._v(" "),o("p",[t._v("Our three main documentation types are:")]),t._v(" "),o("ul",[o("li",[o("strong",[t._v("Getting Started")]),t._v(": These are the first things you should\nread. They cover what to do to install, set up, and start\nusing Agoric's smart contract tools. They also introduce those tools and\ntheir underlying concepts and designs.")]),t._v(" "),o("li",[o("strong",[t._v("Guides")]),t._v(": These are more detailed and complete descriptions\nof our tools and their concepts, designs, and usage. They include\ndescriptions and examples of how to do various tasks with Agoric\nsoftware.")]),t._v(" "),o("li",[o("strong",[t._v("Reference")]),t._v(": These are the specs for our APIs and commands,\nas well as checklist tables that specify and explain the\nsteps for extended procedures, such as installing Agoric\nsoftware.")])]),t._v(" "),o("p",[t._v("Some documents fall into multiple categories. For example, our Agoric\ninstallation document is both a Reference and a Getting Started document.")]),t._v(" "),o("p",[t._v("You should read them in this order:")]),t._v(" "),o("ol",[o("li",[o("strong",[o("RouterLink",{attrs:{to:"/getting-started/before-using-agoric.html"}},[t._v("Before Using the Agoric SDK")])],1),t._v(":\nHow to install software that the Agoric SDK depends on.")]),t._v(" "),o("li",[o("strong",[o("RouterLink",{attrs:{to:"/getting-started/start-a-project.html"}},[t._v("Start a Project")])],1),t._v(": A\nprocedure checklist that walks you through creating a new Agoric SDK\nproject from scratch.")]),t._v(" "),o("li",[o("strong",[o("RouterLink",{attrs:{to:"/getting-started/ertp-introduction.html"}},[t._v("ERTP Introduction")])],1),t._v(":\nA Getting Started document that briefly explains the concepts and components of Agoric's Electronic\nRights Transfer Protocol (ERTP) which is the heart of Agoric\nsoftware.")]),t._v(" "),o("li",[o("strong",[o("RouterLink",{attrs:{to:"/getting-started/intro-zoe.html"}},[t._v("Zoe Introduction")])],1),t._v(":\nA Getting Started document that briefly explains the concepts and components of Zoe, our reusable smart contract\nfor writing other smart contracts in JavaScript. Zoe implements our guarantee that users\neither get what they wanted from the contract or a full refund of what they put up for it.")]),t._v(" "),o("li",[o("strong",[o("RouterLink",{attrs:{to:"/platform/"}},[t._v("Agoric Platform/Stack")])],1),t._v(": A brief introduction to the complete Agoric platform/technical stack.")]),t._v(" "),o("li",[o("strong",[o("RouterLink",{attrs:{to:"/dapps/"}},[t._v("Agoric Dapp Guide")])],1),t._v(":\nA Dapp is a distributed application, typically with a browser-based user interface, a public\nAPI server, and a contract running on the Agoric blockchain. This document explains a Dapp's\nbasic directory and file structure.")]),t._v(" "),o("li",[o("strong",[o("RouterLink",{attrs:{to:"/getting-started/deploying.html"}},[t._v("Deploying Smart Contracts")])],1),t._v(":\nA brief description of the tools and processes for deploying contracts to the chain and\napplication code to the application server.")]),t._v(" "),o("li",[o("strong",[o("RouterLink",{attrs:{to:"/distributed-programming.html"}},[t._v("JavaScript Distributed Programming Guide")])],1),t._v(":\nWe've made some Agoric-specific additions at various layers, including concepts, syntax,\nand additions to the Agoric library. You should know about and understand these before\nprogramming on the Agoric platform.")]),t._v(" "),o("li",[o("strong",[o("RouterLink",{attrs:{to:"/ertp/guide/"}},[t._v("ERTP Guide")])],1),t._v(":\nA detailed description of ERTP concepts, design, components, and commands.\nIncludes examples of command usage. You should also look at the ERTP API\ndocumentation, accessible from the ERTP documentation sidebar menu.")]),t._v(" "),o("li",[o("strong",[o("RouterLink",{attrs:{to:"/zoe/guide/"}},[t._v("Zoe Guide")])],1),t._v(":\nA detailed description of Zoe concepts, design, components, and commands.\nIncludes examples of command usage. You should also look at the Zoe API\ndocumentation, accessible from the Zoe documentation sidebar menu.")])]),t._v(" "),o("p",[t._v("When needed, refer to the "),o("strong",[o("RouterLink",{attrs:{to:"/ertp/api/"}},[t._v("ERTP API Reference")])],1),t._v(", "),o("strong",[o("RouterLink",{attrs:{to:"/zoe/api/"}},[t._v("Zoe API\nReference")])],1),t._v(", "),o("strong",[o("RouterLink",{attrs:{to:"/wallet-api.html"}},[t._v("Wallet API Reference")])],1),t._v(",\nand "),o("strong",[o("a",{attrs:{href:"./agoric-cli-guide"}},[t._v("Agoric CLI Guide")])]),t._v(" for details about\ntheir respective commands.")]),t._v(" "),o("p",[t._v("You use Agoric's Dynamic IBC ("),o("a",{attrs:{href:"https://cosmos.network/ibc",target:"_blank",rel:"noopener noreferrer"}},[t._v("Inter-Blockchain Communication Protocol"),o("OutboundLink")],1),t._v("), aka dIBC,\nto connect to services on other blockchains or make services on the Agoric blockchain available to other blockchains.\nSee our "),o("strong",[o("a",{attrs:{href:"https://github.com/Agoric/agoric-sdk/blob/master/packages/SwingSet/docs/networking.md",target:"_blank",rel:"noopener noreferrer"}},[t._v("dIBC Guide"),o("OutboundLink")],1)]),t._v(" for more information.")]),t._v(" "),o("p",[t._v("To familiarize yourself with working Agoric smart contracts, take a look at our\n"),o("strong",[o("RouterLink",{attrs:{to:"/zoe/guide/contracts/"}},[t._v("Sample Contracts")])],1),t._v(".")]),t._v(" "),o("p",[t._v("We also have an "),o("strong",[o("RouterLink",{attrs:{to:"/glossary/"}},[t._v("Agoric Glossary")])],1),t._v(" for terms we've given Agoric-context\ndefinitions to (i.e. what does "),o("em",[t._v("mint")]),t._v(" mean in an Agoric context?).")]),t._v(" "),o("p",[t._v("For more about Agoric's ideas, plans, and goals, see our "),o("strong",[o("a",{attrs:{href:"https://agoric.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Homepage"),o("OutboundLink")],1)]),t._v(".")]),t._v(" "),o("p",[t._v("Our "),o("strong",[o("a",{attrs:{href:"https://agoric.com/papers/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Papers"),o("OutboundLink")],1)]),t._v(" page has links to various documents you may find useful, such as conference talks, white papers, conference papers, etc. that discuss Agoric's technical background and ideas.")]),t._v(" "),o("p",[t._v("Finally, we have links to the ultimate documentation; the "),o("strong",[o("a",{attrs:{href:"https://github.com/Agoric/",target:"_blank",rel:"noopener noreferrer"}},[t._v("GitHub\nrepositories"),o("OutboundLink")],1)]),t._v(" for the code that defines the Agoric SDK.")])])}),[],!1,null,null,null);e.default=n.exports}}]);