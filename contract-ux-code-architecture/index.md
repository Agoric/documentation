# Contract UX code architecture

This page explores an [idea being currently discussed](https://github.com/Agoric/ERTP/issues/121)

The following diagrams show where code is stored in the Pixel Galery Demo

Code storage is documented, because it affects **building** and **distribution** the various software parts, which in turn affect security properties of the smart contract user experience

Code that is stored in the blockchain is more easily auditable and unless the blockchain integrity is attacked, the code that runs is the code that is stored
This is less true for code stored in the solo node which might be distributed by Agoric or by the contract author

Here is a diagram of the current Pixel Gallery Demo contract UX code architecture (the diagram contains clickable links not rendered in the markdown. You can right-click and choose "Show image"):

![Diagram showing the blockchain, solo node and web browser. Notably, the solo node contains a custom web server and the user interface code](./Pixel-demo-scenario-0-architrecture.svg)

In the current situation, the **solo node** contains a custom web server and the user interface code which require the participation of the contract author: the **solo node** needs to be built then distributed by the contract author.

![Diagram showing the blockchain, solo node and web browser. Notably, the solo node contains only generic code, no need for the contract author intervention](./Ideal-pixel-demo-architrecture.svg)

In this "ideal"(?) setup, the **solo node** contains only generic contract-independent code, no need for the contract author intervention. The source code can be distributed as open source, with a [reproducible build](https://reproducible-builds.org/) process, making the **solo node** more trustworthy

