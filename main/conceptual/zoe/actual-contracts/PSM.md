# PSM Contract

<Zoe-Version/>

##### [View the code on Github](https://github.com/Agoric/agoric-sdk/blob/master/packages/inter-protocol/src/psm/psm.js) (Last updated: Aug 15, 2022)

The Parity Stability Module (PSM) supports minting or burning Inter Stable Tokens (ISTs)
at a specified fixed ratio to external stable tokens.

IST is an evolving, fully collateralized, cryptocurrency-backed decentralized stable token for the interchain ecosystem on the Agoric chain. IST is designed to maintain parity with the US dollar (USD) for broad accessibility and provide Agoric and the interchain ecosystem users an asset with minimum price volatility. In addition, IST is the native fee token for the Agoric platform and provides some of the core functionality and stability for the Agoric cryptoeconomy. Right now the PSM is the only minter of ISTs.

The external stable tokens are chosen by governance in the form of a vote of all BLD holders. Governance may elect to only allow one external stable token, in which case only one PSM will be instantiated.



## Contract API

See the [Zoe Overview](/conceptual/zoe/) documentation for general information about contracts such as how to instantiate them and their basic structure.

The PSM has two primary functions: 

1. **wantMinted(seat, given, wanted)** - The user gives the PSM accepted external stable tokens, which causes the PSM to mint ISTs and give them to the user.
	* **@param seat, type: ZCFSeat** - The seat of a user who wants to swap ISTs for external stable tokens.
	* **@param given, type: Amount<'nat'>** - The external stable tokens which the user wants to convert into ISTs.
	* **@param wanted, type: Amount<'nat'>** - The number of ISTs that the user expects to receive in exchange for their external stable tokens.
	* **returns Amount<'nat'>** - Upon a successful transaction, this method returns the minted ISTs that the user requested.
2. **giveMinted(seat, given, wanted)** - The user gives an IST to the PSM. The PSM destroys the IST, and then gives the user an external stable token.
	* **@param seat, type: ZCFSeat** - The seat of a user who wants to swap external stable tokens for ISTs.
	* **@param given, type: Amount<'nat'>** - The ISTs which the user wants to convert into external stable tokens.
	* **@param wanted, type: Amount<'nat'>** - The number of external stable tokens that the user expects to receive in exchange for their ISTs.
	* **returns Amount<'nat'>** - Upon a successful transaction, this method returns the external stable tokens that the user requested.

The PSM keywords are **In** and **Out**. They're used differently, depending on which of the 2 invitations are being used:

1. **makeWantMintedInvitation()** - With this invitation, **In** is used for the external stable token Amount, while **Out** is used for the IST Amount.
2. **makeGiveMintedInvitation()** - With this invitation, **In** is used for the IST Amount, while **Out** is used for the external stable token Amount.
