# PSM Contract

<Zoe-Version/>

##### [View the code on Github](https://github.com/Agoric/agoric-sdk/blob/master/packages/inter-protocol/src/psm/psm.js) (Last updated: Aug 15, 2022)

The Parity Stability Module (PSM) contract has two primary functions:

1. **wantMinted** - The user gives PSM an accepted external stable token, which causes the PSM to mint IST and gives it to the user 
2. **giveMinted** - The user gives IST back to the PSM, which is burned; PSM returns the external stable token
Once the user has received IST, he or she will transfer it to an external chain over the Inter Blockchain Communication (IBC) protocol.

The PSM (Parity Stability Module) contract

IST will be minted only by the Parity Stability Module (PSM) contract, which may have multiple instantiations. Each PSM is willing to trade IST for a single external stable token and vice versa. These external stable tokens are chosen by governance in the form of a vote of all BLD holders. Governance may elect to only allow one external stable token, in which case only one PSM will be instantiated.


The Inter Stable Token (IST) is an evolving, fully collateralized, cryptocurrency-backed decentralized stable token for the interchain ecosystem on the Agoric chain.  The Inter Protocol, which mints IST, will grow to encompass a variety of minting mechanisms controlled with granular minting limits that creates a dynamic stable token model which has never existed before.
IST is designed to maintain parity with the US dollar (USD) for broad accessibility and provide Agoric and the interchain ecosystem users an asset with minimum price volatility. In addition, IST is the native fee token for the Agoric platform and provides some of the core functionality and stability for the Agoric cryptoeconomy.
