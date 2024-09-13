# Writing a Core Eval Script to Deploy a Contract

When a core eval script is evaluated, the completion value is expected
to be a function. The function is invoked with a _BootstrapPowers_ object
with various capabilities useful for deploying contracts.

For example, in [dapp-agoric-basics](https://github.com/Agoric/dapp-agoric-basics/),
there's a contract to sell concert tickets. To deploy it, we

- install the contract bundle as a Zoe installation
- start the contract instance, using the **IST** brand to make price amounts for terms
- publish the installation and instance in the [agoricNames](../integration/name-services.md#agoricnames-agoricnamesadmin-well-known-names) name service under the name **sellConcertTickets**
  in the **installation** and **instance** section, respectively
- publish its **Ticket** issuer and brand in the **agoricNames** **issuer** and **brand** sections, respectively.

After some preliminaries, ...

::: details imports, makeTerms etc.

```js
// @ts-check
import { allValues } from './objectTools.js'
import {
  AmountMath,
  installContract,
  startContract
} from './platform-goals/start-contract.js'

const { Fail } = assert
const IST_UNIT = 1_000_000n

export const makeInventory = (brand, baseUnit) => {
  return {
    frontRow: {
      tradePrice: AmountMath.make(brand, baseUnit * 3n),
      maxTickets: 3n
    },
    middleRow: {
      tradePrice: AmountMath.make(brand, baseUnit * 2n),
      maxTickets: 3n
    },
    lastRow: {
      tradePrice: AmountMath.make(brand, baseUnit * 1n),
      maxTickets: 3n
    }
  }
}

export const makeTerms = (brand, baseUnit) => {
  return {
    inventory: makeInventory(brand, baseUnit)
  }
}

/**
 * @typedef {{
 *   brand: PromiseSpaceOf<{ Ticket: Brand }>;
 *   issuer: PromiseSpaceOf<{ Ticket: Issuer }>;
 *   instance: PromiseSpaceOf<{ sellConcertTickets: Instance }>
 * }} SellTicketsSpace
 */
```

:::

... the function for deploying the contract is `startSellConcertTicketsContract`:

```js
const contractName = 'sellConcertTickets'

/**
 * Core eval script to start contract
 *
 * @param {BootstrapPowers} permittedPowers
 * @param {*} config
 */
export const startSellConcertTicketsContract = async (powers, config) => {
  console.log('core eval for', contractName)
  const {
    // must be supplied by caller or template-replaced
    bundleID = Fail`no bundleID`
  } = config?.options?.[contractName] ?? {}

  const installation = await installContract(powers, {
    name: contractName,
    bundleID
  })

  const ist = await allValues({
    brand: powers.brand.consume.IST,
    issuer: powers.issuer.consume.IST
  })

  const terms = makeTerms(ist.brand, 1n * IST_UNIT)

  await startContract(powers, {
    name: contractName,
    startArgs: {
      installation,
      issuerKeywordRecord: { Price: ist.issuer },
      terms
    },
    issuerNames: ['Ticket']
  })

  console.log(contractName, '(re)started')
}
```

A `BootstrapPowers` object is composed of several _promise spaces_.
A promise space is a `{ produce, consume }` pair where

- `consume[name]` is a promise associated with a specific name.
- `produce[name].resolve(value)` resolves the promise associated with the same name by providing a value.

There is one such space at the top, so that `powers.consume.zoe` is a promise for the Zoe Service. _This promise was resolved early in the execution of the virtual machine._

There are also several more promise spaces one level down, including:

- `powers.installation`
- `powers.instance`
- `powers.issuer`
- `powers.brand`

The `installContract` helper calls `E(zoe).installBundleID(bundleID)` to create an `Installation`, much like our earlier discussion of [Contract installation](../zoe/#contract-installation).
It also calls `powers.installation[name].resolve(installation)`.

```js
/**
 * Given a bundleID and a permitted name, install a bundle and "produce"
 * the installation, which also publishes it via agoricNames.
 *
 * @param {BootstrapPowers} powers - zoe, installation.produce[name]
 * @param {{ name: string, bundleID: string }} opts
 */
export const installContract = async (
  { consume: { zoe }, installation: { produce: produceInstallation } },
  { name, bundleID }
) => {
  const installation = await E(zoe).installBundleID(bundleID)
  produceInstallation[name].reset()
  produceInstallation[name].resolve(installation)
  console.log(name, 'installed as', bundleID.slice(0, 8))
  return installation
}
```

This `installation` promise space is linked to the `E(agoricNames).lookup('installation')` NameHub: when you call `produce[name].resolve(value)` on the installation promise space, it triggers an update in the NameHub. The update associates the provided name with the provided value so that `E(agoricNames).lookup('installation', name)` is a promise for `value`.

Similarly, the `startContract()` helper does `E(zoe).startInstance(...)` as
in our earlier discussion of [starting a contract instance](../zoe/#starting-a-contract-instance). Plus, it "produces" the instance
so that it's available as `E(agoricNames).lookup('instance', 'sellConcertTickets')`. Once the contract is started, the helper
uses the `issuerNames` argument to get the `Ticket` issuer and
brand and "produces" them likewise as `E(agoricNames).lookup('issuer', 'Ticket')` and `E(agoricNames).lookup('brand', 'Ticket')`.
