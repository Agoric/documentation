## E(PriceAuthorityRegistryAdmin).registerPriceAuthority(priceAuthority, brandIn, brandOut, force)

• **registerPriceAuthority**: (`pa`: `ERef`\<`PriceAuthority`\>, `brandIn`: `Brand`\<`AssetKind`\>, `brandOut`: `Brand`\<`AssetKind`\>, `force?`: `boolean`) => `Promise`\<`Deleter`\>

Add a unique price authority for a given pair.

If the pair is already registered, throw unless `force` is `true`.

##### Returns

`Promise`\<`Deleter`\>

#### Defined in

[priceAuthorityRegistry.js:27](https://github.com/Agoric/agoric-sdk/blob/a8c322206/packages/vats/src/priceAuthorityRegistry.js#L27)

## E(Deleter).delete()

• **delete**: () => `void`
