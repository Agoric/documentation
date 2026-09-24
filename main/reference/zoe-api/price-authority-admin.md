## E(PriceAuthorityRegistryAdmin).registerPriceAuthority(priceAuthority, brandIn, brandOut, force)

• **registerPriceAuthority**: (`pa`: `ERef`\<`PriceAuthority`\>, `brandIn`: `Brand`\<`AssetKind`\>, `brandOut`: `Brand`\<`AssetKind`\>, `force?`: `boolean`) => `Promise`\<`Deleter`\>

Add a unique price authority for a given pair.

If the pair is already registered, throw unless `force` is `true`.

##### Returns

`Promise`\<`Deleter`\>

#### Defined in

[priceAuthorityRegistry.js:189](https://github.com/Agoric/agoric-sdk/blob/1db3919939eacd3194c4f07baf507612900ec754/packages/vats/src/priceAuthorityRegistry.js#L189)

## E(Deleter).delete()

• **delete**: () => `void`
