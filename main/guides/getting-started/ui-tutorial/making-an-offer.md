## Making an Offer

If you've made it this far, you've created a React app that connects to the wallet, renders
the IST purse balance of the user, and reads the chain with `chainStorageWatcher`. If you've
run into an issues, you can check out the `checkpoint-4` branch for reference.

In this final tutorial, you'll see how to make offers from your app, tying everything together
in a basic end-to-end experience for the user.

### Building out the UI

Before we can submit an offer, we'll need to build out some basic inputs so the user can specify
the Items they want. There's 3 types of items available for sale in the contract, so start by
creating an array to list them in `Trade.tsx`:

```ts
const allItems = ['scroll', 'map', 'potion'];
```

Next, add another component to `Trade.tsx` for letting the user choose the amount of each item in the offer:

```tsx
const Item = ({
  label,
  value,
  onChange,
  inputStep,
}: {
  label: string;
  value: number | string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  inputStep?: string;
}) => (
  <div className="item-col">
    <h4>{label}</h4>
    <input
      title={label}
      type="number"
      min="0"
      max="3"
      value={value}
      step={inputStep || '1'}
      onChange={onChange}
      className="input"
    />
  </div>
);
```

And add some styles to `App.css`:

```css
.item-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px 25px 15px;
  margin: 5px;
}

.row-center {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.input {
  border: none;
  background: #242424;
  text-align: center;
  padding: 5px 10px;
  border-radius: 8px;
  font-size: 1.2rem;
  width: 75px;
}

.input[type='number']::-webkit-inner-spin-button {
  opacity: 1;
}
```

Next, in your `Trade` component, render an `Item` for each item in the list:

```tsx
const Trade = () => {
  ...

  const [choices, setChoices] = useState<Record<string, bigint>>({
    map: 1n,
    scroll: 2n,
  });

  const changeChoice = (ev: FormEvent) => {
    if (!ev.target) return;
    const elt = ev.target as HTMLInputElement;
    const title = elt.title;
    if (!title) return;
    const qty = BigInt(elt.value);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [title]: _old, ...rest } = choices;
    const newChoices = qty > 0 ? { ...rest, [title]: qty } : rest;
    setChoices(newChoices);
  };

  return (
    <div className="trade">
      <h3>Want: Choose up to 3 items</h3>
      <div className="row-center">
        {allItems.map(title => (
          <Item
            key={title}
            value={Number(choices[title] || 0n)}
            label={title}
            onChange={changeChoice}
          />
        ))}
      </div>
    </div>
  );
}
```

As you can see, you're storing `choices` with a `useState` hook. This way, as the user changes the inputs,
the number of items of each type is updated. Later on you'll use `choices` to specify the offer.

Next, you'll add an input to let the user specify the amount of IST they want to give in exchange for the items.
First, get a reference to the IST purse with the `usePurse` you created earlier, and create a state hook for the IST value:

```tsx
const Trade = () => {
  const istPurse = usePurse('IST');
  const [giveValue, setGiveValue] = useState(0n);

  ...
}
```

Next, use the `<AmountInput>` component to add an input for the IST "give" amount:

```tsx
import { AmountInput } from '@agoric/react-components';

...

// In your 'Trade' component:
{istPurse && (
  <>
    <h3>Give: At least 0.25 IST</h3>
    <div className="row-center">
      <AmountInput
        className="input"
        value={giveValue}
        onChange={setGiveValue}
        decimalPlaces={istPurse.displayInfo.decimalPlaces as number}
      />
    </div>
  </>
)}
```

### Submitting the Offer

With these components in place, the user is able to select their Item and IST amounts, and the app
is able to store those in its state. Now, you'll see how to use the `makeOffer` function to sign
a transaction and make an offer to the smart contract with the selected amounts.

Recall the `useContract` hook you added to your `Trade` component previously. Now, you'll need the
brands and instance from that to submit the offer:

```ts
const { brands, instance } = useContract();
```

Next, get the `makeOffer` function from the `useAgoric()` hook:

```ts
const { makeOffer } = useAgoric();
```

Now, create a function to submit the offer. For more details on how this works, see [making an offer](../../getting-started/explainer-how-to-make-an-offer.md):

```ts
import { makeCopyBag } from '@agoric/store';

// Inside your 'Trade' component:
const submitOffer = () => {
  assert(brands && instance && makeOffer);
  const value = makeCopyBag(Object.entries(choices));
  const want = { Items: { brand: brands.Item, value } };
  const give = { Price: { brand: brands.IST, value: giveValue } };

  makeOffer(
    {
      source: 'contract',
      instance,
      publicInvitationMaker: 'makeTradeInvitation',
    },
    { give, want },
    undefined,
    (update: { status: string; data?: unknown }) => {
      console.log('UPDATE', update);
      if (update.status === 'error') {
        alert(`Offer error: ${update.data}`);
      }
      if (update.status === 'accepted') {
        alert('Offer accepted');
      }
      if (update.status === 'refunded') {
        alert('Offer rejected');
      }
    },
  );
};
```

For specifics on how offers work, see [Specifying Offers](../../getting-started/contract-rpc.md#specifying-offers). The `makeOffer` function allows you to specify an
`InvitationSpec`, automatically handles the marshalling aspect, and makes it easy to
handle updates to the offer status.

The function you just wrote uses the `makeCopyBag` util to construct the Item amount in a way that the contract can understand. Add it to your dependencies:

```
yarn add -D @agoric/store@0.9.2
```

And add the type to `vite-env.d.ts`:

```ts
declare module '@agoric/store' {
  export const makeCopyBag;
}
```

Now, simply add a button to submit the offer:

```tsx
{
  !!(brands && instance && makeOffer && istPurse) && (
    <button onClick={submitOffer}>Make Offer</button>
  );
}
```

Upon clicking the offer, you should see a Keplr window pop up to approve the transaction with the "Give" and "Want"
you selected. Try selecting 3 items, and giving 0.25 IST, and the offer should be accepted. See what happens
if you select more than 3 items, or give less than 0.25 IST... it should reject the offer, and you should be
refunded your IST (see [offer safety](../../../guides/zoe/offer-safety.md))

### Rendering the Items Purse

So, you've made a successful offer and acquired some items, but where are they? You can render the items purse
similarly to the IST purse. In `Purses.tsx`, add the following:

```tsx
...

  const itemsPurse = usePurse('Item');
...

  <div>
    <b>Items: </b>
    {itemsPurse ? (
      <ul style={{ marginTop: 0, textAlign: 'left' }}>
        {itemsPurse.currentAmount.value.payload.map(
          // @ts-expect-error ignore 'any' type
          ([name, number]) => (
            <li key={name}>
              {String(number)} {name}
            </li>
          )
        )}
      </ul>
    ) : (
      'None'
    )}
  </div>
```

Now, make another offer, and see that your items purse automatically updates after the offer is accepted. To see the complete
solution for this example, check out the `checkpoint-5` branch.
