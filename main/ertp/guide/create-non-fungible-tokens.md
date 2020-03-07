# Creating non-fungible tokens with ERTP

## Definition of fungible/non-fungible

Assets are fungible if each asset is just as valuable as other assets of the same kind. 
For instance, dollar bills are fungible because it doesn't matter which bill you use. 
Each dollar bill is interchangeable with any other. Paintings, on the other hand, are not fungible. 
Paintings have drastically different values depending on the content and painter. 
A deal involving a specific painting would not be satisfied by another painting.


## Creating a non-fungible asset with ERTP

### Modeling and creating the asset

In ERTP, digital assets are created by a [`mint`](./issuer#mint). Having access to the mint
gives you the power to create more digital assets of the same type at will.

Let's say we own an Opera and want to sell tickets to seats for ballet shows. Tickets are
the non-fungible assets we want to represent. Tickets refer to a specific seat for a specific 
show at a specific time and date.

To do that, you would first install the [ertp JavaScript package](https://www.npmjs.com/package/@agoric/ertp)
(`npm install @agoric/ertp`) and then:

```js
import produceIssuer from '@agoric/ertp';
import harden from '@agoric/harden';

const { mint, issuer } = produceIssuer('Agoric Ballet Opera tickets', 'set');
```

At this Opera, there are [1114](https://fr.wikipedia.org/wiki/Grand_Th%C3%A9%C3%A2tre_(Bordeaux)#Salle_de_spectacle) seats numbered `1` to `1114`.
Objects that represent valid tickets will have the following properties:
- `seat` with a number
- `show` with a string describing the show
- `start` with a string representing a [time/date in ISO format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString)

Let's create the tickets in ERTP!
The first step is to create JavaScript objects, each representing a ticket.
Then, only [amounts](./amounts) can be minted, so let's create amounts from the JavaScript objects and then, let's mint the tickets!

```js
const startDateString = (new Date(2019, 11, 9, 20, 30)).toISOString();

const ticketDescriptionObjects = Array(1114).fill()
  .map((_, i) => ({
    seat: i + 1,
    show: 'The Sofa',
    start: startDateString,
  }));

const balletTicketPayments = ticketDescriptionObjects.map(
  ticketDescription => balletTicketMint.mintPayment(
    issuer.getAmountMath().make(harden([ticketDescription]))
  )
);
```

For each ticket amount, we've created a [payment](../api/payment.md) which contains the corresponding amount. These payments can then be used in smart contracts.
