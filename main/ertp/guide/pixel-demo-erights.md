## Pixel Demo

For a demo on how ERTP can be used for non-fungible digital assets, check out our [Pixel Demo](/documentation/getting-started/pixel-demo.html#installation).

### A preemption hierarchy of rights

All of the pixels (individual squares) on the demo webpage are owned by the
gallery, the code that administers the pixels. The gallery has the power to revoke
the pixels from any user at any time. When a user calls `gallery~.tapFaucet()`,
the gallery takes the least recently colored pixel from its current holder (if
anyone holds it) and gives it to the user in the form of an ERTP payment. The
gallery is able to revoke the pixels held by users because the pixel demo creates
a customized version of ERTP in which rights are hierarchical. Hierarchical rights
are familiar in the case of real property. For instance, a property owner might
lease an apartment to a tenant, who might in turn, lease it to a subtenant. Anyone
higher in the hierarchy can take away access from anyone lower in the hierarchy,
and give it to someone else.
