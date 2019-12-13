# Creating non-fungible tokens with ERTP

## Definition of fungible/non-fungible

Assets are fungible if each asset is just as valuable as other assets of the same kind. 
For instance, dollar bills are fungible because it doesn't matter which bill you use. 
Each dollar bill is interchangeable with any other. Paintings, on the other hand, are not fungible. 
Paintings have drastically different values depending on the content and painter. 
A deal involving a specific painting would not be satisfied by another painting.


## Creating a fungible asset with ERTP

### Creating and sending the asset

In ERTP, digital assets are created by a [`mint`](./mint.html). Having access to the mint
gives you the power to create more digital assets of the same type at
will.

Let's say we own an Opera and want to sell tickets to seats for ballet shows. Tickets are
the non-fungible assets we want to represent. Tickets refer to a specific seat for a specific 
show at a specific time and date.

To do that, you would first install the [ertp JavaScript package](https://www.npmjs.com/package/@agoric/ertp)
(`npm install @agoric/ertp`) and then:

```js
import { makeMint } from '@agoric/ertp/core/mint';

import harden from '@agoric/harden';

import { noCustomization } from '@agoric/ertp/core/config/noCustomization.js';
import { makeCoreMintKeeper } from '@agoric/ertp/core/config/coreMintKeeper';

import { insist } from '@agoric/ertp/util/insist';
import { mustBeComparable } from '@agoric/ertp/util/sameStructure';

const insistOptDescription = optDescription => {
  insist(!!optDescription)`optDescription must be truthy ${optDescription}`;
  mustBeComparable(optDescription);
};

function makeInviteConfig() {
  return harden({
    ...noCustomization,
    makeMintKeeper: makeCoreMintKeeper,
    extentOpsName: 'uniExtentOps',
    extentOpsArgs: [insistOptDescription],
  });
}

const balletTicketMint = makeMint('Agoric Ballet Opera tickets', makeInviteConfig);
```

At this Opera, there are [1114](https://fr.wikipedia.org/wiki/Grand_Th%C3%A9%C3%A2tre_(Bordeaux)#Salle_de_spectacle) seats numbered `1` to `1114`.
Objects that represent valid tickets will have the following properties:
- `seat` with a number
- `show` with a string describing the show
- `start` with a string representing a [time/date in ISO format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString)

Let's create the tickets in ERTP! The first step is to describe the **extents**. [Extents](https://agoric.com/documentation/ertp/guide/extent.html) are [comparable](https://github.com/Agoric/agoric-sdk/blob/f1b9dcae7d22aa7adc6222a42a0727ea29c055f3/packages/ERTP/util/sameStructure.js#L243-L245) values (as a first approximation, you can think of data-only objects that would translate as well in [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)).

```js
const startDateString = (new Date(2019, 11, 9, 20, 30)).toISOString()

const ticketExtents = Array(1114).fill().map((_, i) => ({
  seat: i+1,
  show: 'The Sofa',
  start: startDateString,
}))
```

Now these ticket descriptions need to be turned into **units**. While extents can be thought of as data-only objects, [units](https://agoric.com/documentation/ertp/guide/units.html) are objects that represent goods that can be minted and exclusively shared.

```js
const balletTicketUnitOps = balletTicketMint.getAssay().getUnitOps();

const ticketUnits = ticketExtents.map(ticketExtent => balletTicketUnitOps.make(ticketExtent))
```

And now, let's mint tickets!

```js
const balletTicketPurses = ticketUnits.map(ticketUnit => balletTicketMint.mint(ticketUnit))
```

For each ticket unit, we've created a [purse](https://agoric.com/documentation/ertp/api/purse.html) which contains the corresponding unit. These purses can later be transformed into [payments](https://agoric.com/documentation/ertp/api/payment.html) via a call to `balletTicketPurse.withdrawAll()`. This payment can later be traded against other payments or on conditions decided by the payment holder.