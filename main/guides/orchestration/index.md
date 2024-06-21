# Orchestration Overview


Orchestration is a core concept within the Agoric platform designed to empower entrepreneurs. It enables the creation of smart contracts that seamlessly interact with applications deployed on various blockchains. This composability allows for the development of user-centric applications that leverage the unique strengths of different blockchain ecosystems.
The Agoric Orchestration API simplifies interactions between multiple networks, particularly those using the Inter-Blockchain Communication (IBC) protocol within Cosmos. The API acts as an abstraction layer, streamlining multi-step processes while maintaining requestor authority. Smart contracts involved gain no additional privileges. 
Orchestration integrates with existing Agoric components (SwingSet, Cosmos modules) and introduces the vat-orchestration vat. This vat manages Inter-Chain Account (ICA) identities and connections to host chains, ensuring proper transaction authorization.
The orchestration client handles asynchronous tasks and complex workflows, including those spanning multiple chains. This empowers smart contracts for actions like inter-chain staking and multi-hop transfers, facilitated by notifications from the transfer vat and IBC middleware updates. Orchestration simplifies complex cross-chain interactions within a secure and user-controlled environment on the Agoric platform.


## Example API Usage

```javascript
const amount = coins(100, 'utia');
const celestiaChain = await orchestration.getChain('celestia');
const icaCelestia = await celestiaChain.createAccount();
await icaOsmosis.transfer(icaCelestia.getAddress(), amount);
await E(timerService).delay(600n);
return icaCelestia.delegate(celestiaValidator, amount);
```
