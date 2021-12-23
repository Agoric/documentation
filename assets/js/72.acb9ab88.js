(window.webpackJsonp=window.webpackJsonp||[]).push([[72],{472:function(t,e,a){"use strict";a.r(e);var n=a(44),o=Object(n.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"contract-requirements"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#contract-requirements"}},[t._v("#")]),t._v(" Contract Requirements")]),t._v(" "),a("Zoe-Version"),t._v(" "),a("p",[t._v("When writing a smart contract to run on Zoe, you need\nto know the proper format and other expectations.")]),t._v(" "),a("p",[t._v("A Zoe contract is a JavaScript file that can import other JavaScript\ncode, including:")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://www.npmjs.com/package/@agoric/harden",target:"_blank",rel:"noopener noreferrer"}},[t._v("@agoric/harden"),a("OutboundLink")],1),t._v(": a package for recursively deep-freezing")]),t._v(" "),a("li",[a("a",{attrs:{href:"https://www.npmjs.com/package/@agoric/nat",target:"_blank",rel:"noopener noreferrer"}},[t._v("@agoric/nat"),a("OutboundLink")],1),t._v(": a package\nfor testing whether something is a natural number (natural numbers\nare recommended for currency-related programming in order to avoid\nrounding issues) and throwing if not.")]),t._v(" "),a("li",[a("a",{attrs:{href:"https://www.npmjs.com/package/@agoric/zoe",target:"_blank",rel:"noopener noreferrer"}},[t._v("@agoric/notifier"),a("OutboundLink")],1),t._v(": A package that provides updates through\nsmartly resolving promises rather than polling")]),t._v(" "),a("li",[a("a",{attrs:{href:"https://www.npmjs.com/package/@agoric/zoe",target:"_blank",rel:"noopener noreferrer"}},[t._v("@agoric/zoe"),a("OutboundLink")],1),t._v(": Zoe has\nhelpers that contracts can use by importing\n"),a("code",[t._v("@agoric/zoe/src/contractSupport/zoeHelpers.js")])])]),t._v(" "),a("p",[t._v("A Zoe contract will be bundled up, so you should feel free to divide\nyour contract into multiple files (perhaps putting helper functions in a\nseparate file, for example) and import them.")]),t._v(" "),a("p",[t._v("A Zoe contract needs to be able to run under "),a("a",{attrs:{href:"https://github.com/endojs/endo/tree/master/packages/ses",target:"_blank",rel:"noopener noreferrer"}},[t._v("Agoric's SES shim for Hardened JavaScript"),a("OutboundLink")],1),t._v(". Some legacy\nJavaScript code is incompatible with Hardened JavaScript, because Lockdown freezes the\nJavaScript objects you start out with (the primordials, such as "),a("code",[t._v("Object")]),t._v("), and some legacy code tries to\nmutate these.")]),t._v(" "),a("p",[t._v("If you add this type annotation at the start of your contract code, TypeScript-aware tools\n(IDEs like vsCode and WebStorm) will warn about mismatches in parameters and return values\nin calls to "),a("code",[t._v("zcf")]),t._v(" methods.  Put this right before the start of your contract code.")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n * @type {ContractStartFn}\n */")]),t._v("\n")])])]),a("p",[t._v("Your contract code must export a function "),a("code",[t._v("start()")]),t._v(" as a non-default export. "),a("code",[t._v("zcf")]),t._v(" is the "),a("RouterLink",{attrs:{to:"/zoe/api/zoe-contract-facet.html"}},[t._v("Zoe Contract Facet")]),t._v(" and is the first argument provided to\nthe contract. The second argument, "),a("code",[t._v("privateArgs")]),t._v(", is used by the\ncaller of "),a("code",[t._v("startInstance")]),t._v(" to pass in any arguments that should not be\npart of the public terms. "),a("code",[t._v("privateArgs")]),t._v(" is an object with keys and\nvalues as decided by the caller of "),a("code",[t._v("startInstance")]),t._v(". If no private\narguments are passed, "),a("code",[t._v("privateArgs")]),t._v(" is undefined.")],1),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("start")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("zcf"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" privateArgs")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// your code here")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("harden")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" creatorFacet"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" creatorInvitation"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" publicFacet "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("harden")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("start"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" start "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("The contract must return a record with any (or none) of the following:")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("creatorFacet")]),t._v(": An object, usually with admin authority. It is only given to the entity\nthat calls "),a("code",[t._v("E(zoe).startInstance()")]),t._v("; i.e. the party that was the creator of the current\ncontract "),a("code",[t._v("instance")]),t._v(". It might create "),a("code",[t._v("invitations")]),t._v(" for other parties, or take actions that\nare unrelated to making offers.")]),t._v(" "),a("li",[a("code",[t._v("creatorInvitation")]),t._v(": A Zoe "),a("code",[t._v("invitation")]),t._v(" only given to the entity that\ncalls "),a("code",[t._v("E(zoe).startInstance()")]),t._v("; i.e. the party that was the creator of the current\ncontract "),a("code",[t._v("instance")]),t._v(". This is usually used when a party has to make an offer first,\nsuch as escrowing the underlying good for sale in an auction or covered call.")]),t._v(" "),a("li",[a("code",[t._v("publicFacet")]),t._v(": An object available through Zoe to anyone who knows the contract "),a("code",[t._v("instance")]),t._v(".\nUse the "),a("code",[t._v("publicFacet")]),t._v(" for general queries and actions, such as getting the current price\nor creating public "),a("code",[t._v("invitations")]),t._v(".")])]),t._v(" "),a("p",[t._v("The contract can contain arbitrary JavaScript code, but there are a few things you'll want\nto do in order to act as a contract, and interact with Zoe and zcf (the internal contract\nfacet).")]),t._v(" "),a("p",[t._v("For users to make offers, the contract has to include a handler with the\ncode for what to do when the "),a("code",[t._v("invitation")]),t._v(" is used to make an offer. This handler is passed\nto "),a("code",[t._v("zcf.makeInvitation()")]),t._v(", and the resulting "),a("code",[t._v("invitation")]),t._v(" is made available (using the\n"),a("code",[t._v("creatorFacet")]),t._v(", the "),a("code",[t._v("publicFacet")]),t._v(", or whatever makes sense for the particular contract.")]),t._v(" "),a("p",[t._v("For instance, AtomicSwap makes two "),a("code",[t._v("invitations")]),t._v(". The first is used to create the initial\noffer, so it defines the terms that the counterparty responds to. The second party\nneeds to make a matching offer, so there are more constraints.")]),t._v(" "),a("p",[t._v("Use "),a("code",[t._v("zcf.makeInvitation()")]),t._v(" to create the first party's "),a("code",[t._v("invitation")]),t._v(":")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" creatorInvitation "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" zcf"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("makeInvitation")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n    makeMatchingInvitation"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'firstOffer'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[a("code",[t._v("makeMatchingInvitation()")]),t._v(" creates the second "),a("code",[t._v("invitation")]),t._v(".")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" matchingSeatInvitation "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" zcf"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("makeInvitation")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n      matchingSeatOfferHandler"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'matchOffer'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        asset"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" give"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Asset"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        price"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" want"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Price"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("The third argument (which is optional and wasn't needed for the first "),a("code",[t._v("invitation")]),t._v(") says\nthe counterparty has to offer an "),a("code",[t._v("amount")]),t._v(" matching the first party's "),a("code",[t._v("want.Price")]),t._v(",\nand should ask for the first party's "),a("code",[t._v("give.Asset")]),t._v(". The optional third argument to\n"),a("code",[t._v("makeInvitation()")]),t._v(" is included so the "),a("code",[t._v("invitation")]),t._v(" will contain the "),a("code",[t._v("terms")]),t._v(" so the "),a("code",[t._v("invitation")]),t._v("\nrecipient can rely on them.")]),t._v(" "),a("p",[t._v("The "),a("code",[t._v("matchingSeatOfferHandler")]),t._v(" for this very simple contract calls "),a("code",[t._v("swap()")]),t._v(", a helper for\nthe simple case that each party wants what the other offered. If the terms match, Zoe\ngives each the "),a("code",[t._v("payout")]),t._v(" they asked for, and closes out the contract. If the terms don't\nmatch, they each get back what they brought to the exchange, and it's still over.")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("matchingSeatOfferHandler")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("matchingSeat")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" swapResult "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("swap")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("zcf"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" firstSeat"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" matchingSeat"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      zcf"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("shutdown")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" swapResult"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("If you study other contracts, you'll see they all have this basic format. Depending\non their goals, they may do additional bookkeeping, or try to find compatible terms\nbetween multiple offers, or create new assets to order.")]),t._v(" "),a("h2",{attrs:{id:"making-an-invitation"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#making-an-invitation"}},[t._v("#")]),t._v(" Making an Invitation")]),t._v(" "),a("p",[t._v("To create an invitation in the contract, use the Zoe Contract\nFacet method "),a("RouterLink",{attrs:{to:"/zoe/api/zoe-contract-facet.html#zcf-makeinvitation-offerhandler-description-customproperties"}},[a("code",[t._v("zcf.makeInvitation")])]),t._v(".")],1),t._v(" "),a("h2",{attrs:{id:"using-bundlesource"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#using-bundlesource"}},[t._v("#")]),t._v(" Using "),a("code",[t._v("bundleSource")])]),t._v(" "),a("p",[t._v("Modules start as files on disk, but then are bundled together\ninto an archive before being loaded into a vat. The bundling tool uses several standard\nfunctions to locate other modules that must be included. These are not a part of Hardened JavaScript, but\nare allowed in module source code, and are translated or removed before execution.")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("import")]),t._v(" and "),a("code",[t._v("export")]),t._v(" syntax are allowed in ESM-style modules (preferred over CommonJS).\nThese are not globals as such, but top-level syntax that defines the module graph.")]),t._v(" "),a("li",[a("code",[t._v("require")]),t._v(", "),a("code",[t._v("module")]),t._v(", "),a("code",[t._v("module.exports")]),t._v(", and "),a("code",[t._v("exports")]),t._v(" are allowed in CommonJS-style modules,\nand should work as expected. However, new code should be written as ESM modules. They\nare either consumed by the bundling process, provided (in some form) by the execution\nenvironment, or otherwise rewritten to work sensibly")]),t._v(" "),a("li",[a("code",[t._v("__dirname")]),t._v(" and "),a("code",[t._v("__filename")]),t._v(" are not provided")]),t._v(" "),a("li",[t._v("The dynamic import expression ("),a("code",[t._v("await import('name')")]),t._v(") is currently prohibited in vat\ncode, but a future SES implementation of Hardened JavaScript may allow it.")])]),t._v(" "),a("p",[t._v("The "),a("a",{attrs:{href:"https://nodejs.org/dist/latest-v14.x/docs/api/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Node.js API"),a("OutboundLink")],1),t._v(' includes "built-in\nmodules", such as '),a("code",[t._v("http")]),t._v(" and "),a("code",[t._v("crypto")]),t._v(". Some are clearly platform-specific (e.g. "),a("code",[t._v("v8")]),t._v("), while\nothers are not so obvious ("),a("code",[t._v("stream")]),t._v("). All are accessed by importing a\nmodule ("),a("code",[t._v("const v8 = require('v8')")]),t._v(" in CommonJS modules, or "),a("code",[t._v("import v8 from 'v8'")]),t._v(" in ESM modules).\nThese modules are built out of native code (C++), not plain JS.")]),t._v(" "),a("p",[t._v("None of these built-in modules are available to vat code. "),a("code",[t._v("require")]),t._v(" or "),a("code",[t._v("import")]),t._v(" can be used\non pure JS modules, but not on modules including native code. For a vat to exercise authority\nfrom a built-in module, you have to write a "),a("em",[t._v("device")]),t._v(" with an endowment with the built-in\nmodule's functions, then have the vat send messages to the device.")]),t._v(" "),a("h2",{attrs:{id:"library-compatibility"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#library-compatibility"}},[t._v("#")]),t._v(" Library compatibility")]),t._v(" "),a("p",[t._v("Vat code can use "),a("code",[t._v("import")]),t._v(" or "),a("code",[t._v("require()")]),t._v(" to import other libraries consisting\nonly of JS code, which are compatible with the Hardened JavaScript environment. This includes\na significant portion of the NPM registry.")]),t._v(" "),a("p",[t._v("However, many NPM packages use built-in Node.js modules. If used at import\ntime (in their top-level code), vat code cannot use the package and fails\nto load at all. If they use the built-in features at runtime, then the\npackage can load. However, it might fail later when a function is invoked\nthat accesses the missing functionality. So some NPM packages are partially\ncompatible; you can use them if you don't invoke certain features.")]),t._v(" "),a("p",[t._v("The same is true for NPM packages that use missing globals, or attempt to\nmodify frozen primordials.")])],1)}),[],!1,null,null,null);e.default=o.exports}}]);