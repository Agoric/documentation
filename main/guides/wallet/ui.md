
# Wallet UI

From a shell window, run `agoric open` to open the Wallet UI in a browser tab.

The wallet facilitates several core user interactions within the Agoric ecosystem, described in the below sections.

## <a name="dapps">Dapps</a>

To interact with a dapp, it first must be connected in the wallet. The dapp will attempt to connect to the wallet instance registered at https://local.agoric.com/.

Before the dapp is able to make offers, the connection must be accepted from the wallet. Incoming dapp connections can be managed from the Dashboard view:

<img width="500" alt="Screen Shot 2021-12-01 at 7 30 32 PM" src="https://user-images.githubusercontent.com/8848650/144352840-06d3a7f4-d503-4d46-9a6e-dc65aab020ba.png">

Once accepted, they can be viewed and managed from the Dapps view:

<img width="499" alt="Screen Shot 2021-12-01 at 7 31 33 PM" src="https://user-images.githubusercontent.com/8848650/144352925-e9e51578-1cbc-4c63-bc0a-ab55275b47a5.png">

The petname is a string used to personally identify the dapp and should be unique. It can be modified as desired with the text field. It can be thought of like a contact name in a cellphone.

Dapps can be removed so that they are no longer able to propose offers.

## <a name="offers">Offers</a>

After connecting to a dapp, it is able to propose offers in the user's wallet. Offers are a unique concept to Agoric's Zoe framework. Users are guaranteed to receive that they are asking for in an offer, or get a full refund (a property called "[Offer Safety](https://agoric.com/documentation/zoe/guide/#what-is-zoe)").

When an offer is proposed (usually from some interaction in a dapp), it will appear in the dashboard view:

<img width="501" alt="Screen Shot 2021-12-01 at 7 43 34 PM" src="https://user-images.githubusercontent.com/8848650/144355118-c8f2544a-9406-43c7-931d-acd073feaa17.png">

If the offer is approved, it will show as pending:

<img width="498" alt="Screen Shot 2021-12-01 at 7 43 40 PM" src="https://user-images.githubusercontent.com/8848650/144355159-755d0151-2718-4427-9d11-006364293249.png">

Depending on the terms of the smart contract being interacted with, some offers may be "exited" before completion. Exiting an offer does not revert any asset transfers that have already taken place, but may prevent the contract from executing any future planned transfers (e.g. a user may "exit" to withdraw a bid from an auction before the deadline).

Completed offers will either show up in an accepted or rejected state, and can be dismissed by the user.

<img width="500" alt="Screen Shot 2021-12-01 at 7 43 54 PM" src="https://user-images.githubusercontent.com/8848650/144355387-994e3d7a-e170-45a3-b843-4f775d7839ff.png">

## <a name="transfers">Transfers</a>

The wallet can be used to transfer funds to and from other wallets, as well as between purses within the same wallet.

Every type of asset can be identified by a unique "Brand", and there exists one global Issuer for each Brand. If a user wants to send or receive a tokens of a particular Brand, its Issuer must be imported from the "Asset Issuers" view:

<img width="630" alt="Screen Shot 2021-12-01 at 8 10 05 PM" src="https://user-images.githubusercontent.com/8848650/144356129-74531aa4-4ab1-4dfc-8c77-62aafffb597a.png">

Some issuers are imported by default in the wallet as shown above. The user can make as many purses as they want for each issuer. The purses are where the actual tokens are held, and can be managed from the "Dashboard" view:

<img width="636" alt="Screen Shot 2021-12-01 at 8 13 30 PM" src="https://user-images.githubusercontent.com/8848650/144356409-89f18b3e-d715-44cc-9b70-b6d99cfe7a62.png">

Tokens can be freely sent between purses within the same wallet. To send tokens to another wallet, that wallet's Board ID must be imported in the "Contacts" view:

<img width="458" alt="Screen Shot 2021-12-01 at 8 16 22 PM" src="https://user-images.githubusercontent.com/8848650/144356809-7681a7a7-9983-4ad2-9e48-1adabbc272f9.png">

Then, a user can select the "Irrevocable one-way" transfer option to send their tokens to another wallet in their contacts:

<img width="469" alt="Screen Shot 2021-12-01 at 8 19 38 PM" src="https://user-images.githubusercontent.com/8848650/144357174-f4769fa2-aa98-40e8-ac73-9a738e6432bb.png">

