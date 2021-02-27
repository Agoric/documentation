
## The Wallet UI

From a shell window, run `agoric open` to open the Wallet UI in a browser tab.

### Menu Bar

At the top of the UI is a menu bar with four items.

![Menu bar](./assets/0-MenuBar.png)

- **Inbox**
  - ![Inbox](./assets/2-InboxWalletUI.png)
  - Shows your offers, impending payments, Dapps, and purses.
  - Lets you send payments, enable/disable Dapps and change their petname, approve/decline offers, or deposit impending payments.
- **Transfers**
  - ![Transfers](./assets/3-TransfersWalletUI.png)
  - Shows your purses and contacts.
  - Lets you send payments, import contacts by Board ID and give them a petname.
- **Setup**
  - ![Setup](./assets/4-SetupWalletUI.png)
  - Shows your Dapps, issuers, and contacts. 
  - Lets you create empty purses, import contacts by Board ID and give them a petname, and enable/disable Dapps and change their petname.
- **Connected/Disconnect**
  - ![Connected](./assets/5-ConnectWalletUI.png)
  - Shows if the Wallet UI is connected to your ag-solo.
  - Lets you connect the Wallet to or disconnect the Wallet UI from your ag-solo.

As there are only six page components, several of which are repeated on the three pages making up the Wallet UI,
we will cover the components in detail rather than the pages.

### Purses

![Purses](./assets/PursesWalletUI.png)

The Purses component shows all purses in the wallet and their current balances (both the value and the brand).
It also shows the special default purse that holds Zoe invitations.

![Purse Send](./assets/PursesSendWalletUI.png)

If you expand a purse entry, you'll see a red **SEND** button for that purse. Clicking it opens the above
popup. From the popup, you can specify how much of the purse's shown current balance you would like to 
send elsewhere. 

You can transfer assets to another purse within your wallet. However, there must already be a purse that accepts
assets of that brand to select. Otherwise, your only option is to send the assets back to the same purse they came
from, which can be used for testing.

Or you can transfer assets from the purse to any contact you already have. As noted, this is an irrevocable one way
transfer. If the contact doesn't have an auto-deposit purse that accepts this asset type, it just sits under their
Incoming Payments until an appropriate purse is created and it is manually deposited.  Only one purse can be 
designated the auto-deposit purse for its asset type.

When you are finished specifying how much the payment is and where it's going, click the **Send** button at the bottom
of the popup. Otherwise click the **Cancel** button to cancel the prospective transfer and close the popup.

If you enable a Purse's **AutoDeposit** by sliding its buttonto the right, causing it to turn red, any
incoming Payments of that Purse's Brand are automatically deposited into it. Doing so disables any other 
auto-deposit purses for that Brand. Sliding the button to the left, causing it to turn white, means you have
to manually approve the deposit.

### Dapps

![Dapps](./assets/DappsWalletUI.png)

The Dapps component shows all Dapps that can communicate with the Wallet. An expanded entry
shows an alleged URL for that Dapp's UI, its Petname, and a toggle to enable/disable the Dapp
from communicating with the Wallet. Note that like the other entries with an on/off slider,
a Dapp is enabled when the button is slid to the right and turns red, and disabled when slid to the 
left and turns white.

### Issuers

![Issuers](./assets/IssuersWalletUI.png)

The Issuers component shows all Issuers known to the Wallet, along with their associated Brands.
An expanded entry shows that Issuer's Board ID and a **Make Purse** button. When **Make Purse** is
clicked the following popup appears:

![Make Purse](./assets/CreatePurseWalletUI.png)

The Issuer creates a new empty Purse, that holds its Brand of assets, in the Wallet, giving it the Petname
you specify. Remember there can be more than one Purse in a Wallet that holds assets of a specific Brand.

If you click the **Import** button at the bottom of the Issuers list, this popup appears:

![Import Issuer](./assets/ImportIssuerWalletUI.png)

You specify a Petname and the Board ID (obtained from a trusted source) of an Issuer, and it's imported
into the Wallet and can be used to create new empty Purses to store assets of its associated Brand. 

### Contacts

![Contacts](./assets/ContactsWalletUI.png)

The Contacts component shows all entities known to the Wallet, including the Wallet itself as "Self". An
expanded entry shows the contact's Board ID. If you click on the **Import** button, this popup appears:

![Import Contact](./assets/ImportContactWalletUI.png)

You specify a Petname and the Board ID (obtained from a trusted source) of a Contact, and it's imported
into the Wallet. 

### Offers

![Offers](./assets/OffersWalletUI.png)

The Offers component shows any pending offers known to the Wallet. Click the green **Accept** button
to accept the offer, or click the red **Decline** button to decline it.

Note the small, red, `<>` at the far right
of an offer. Clicking it opens a popup with the JSON representation of that offer, for example:

![Offer Detail](./assets/OfferDetailWalletUI.png)

### Incoming Payments

![Payments](./assets/IncomingPaymentWalletUI.png)

The Incoming Payments component shows any pending incoming payments not yet deposited in a purse.
A Deposit To value of "Automatic" means to deposit the payment in the apprpriate purse that has
auto-deposit enabled. Otherwise, you need to select into which of your purses for that brand of asset you
want to deposit the payment. Note that you can't divide the payment or otherwise make a partial
deposit; it's all or nothing. 

Note the small, red, `<>` at the far right
of a payment. Clicking it opens a popup with the JSON representation of that payment, for example:

![Payment Detail](./assets/PaymentDetailWalletUI.png)
