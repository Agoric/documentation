# Units
Units are the canonical description of tradable goods. They are
manipulated by mints, and represent the goods and currency carried by
purses and payments. They can be used to represent things like
currency, stock, and the abstract right to participate in a particular
exchange.

## Labeled extents
Units are labeled extents. To be specific, units are a record with two
parts: a label, which identifies an assay, and an extent. The balance
of a purse or payment is in units. For example, the balance of a purse
might be 3 bucks, written in units as:

```js
{
  label: {
    allegedName: 'bucks',
    assay: bucksAssay,
  },
  extent: 3,
}
```
