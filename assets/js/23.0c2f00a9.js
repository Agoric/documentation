(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{227:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"purse"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#purse"}},[t._v("#")]),t._v(" Purse")]),t._v(" "),a("p",[t._v("Purses hold an amount of digital assets of the same brand, but unlike payments, they are not meant to be sent to others. To transfer digital assets, a payment should be withdrawn from a purse. A purse's balance can rise and fall, through the action of deposit() and withdraw().")]),t._v(" "),a("p",[t._v("The digital assets in purses and payments can be currency-like and goods-like digital assets, but they can also be other kinds of rights, such as the right to participate in a particular contract.")]),t._v(" "),a("h2",{attrs:{id:"purse-getcurrentamount"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#purse-getcurrentamount"}},[t._v("#")]),t._v(" purse.getCurrentAmount()")]),t._v(" "),a("ul",[a("li",[t._v("Returns: "),a("code",[t._v("{Amount}")])])]),t._v(" "),a("p",[t._v("Get the current "),a("code",[t._v("amount")]),t._v(" contained in this purse, confirmed by the\nissuer. Note that this amount will change from call to call if assets\nhave been deposited or withdrawn between calls.")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" issuer "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("makeIssuerKit")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'bucks'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" purse "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" issuer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("makeEmptyPurse")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" currentBalance "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" purse"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getCurrentAmount")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h2",{attrs:{id:"purse-deposit-payment-optamount"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#purse-deposit-payment-optamount"}},[t._v("#")]),t._v(" purse.deposit(payment, optAmount)")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("payment")]),t._v(" "),a("code",[t._v("{Payment}")])]),t._v(" "),a("li",[a("code",[t._v("optAmount")]),t._v(" "),a("code",[t._v("{Amount}")]),t._v(" - Optional. This parameter ensures you are depositing the amount you expect.")]),t._v(" "),a("li",[t._v("Returns: "),a("code",[t._v("{Amount}")])])]),t._v(" "),a("p",[t._v("Deposit all the contents of "),a("code",[t._v("payment")]),t._v(" into this purse, returning the payment's amount\nof digital assets (i.e. the deposit amount). If the optional argument "),a("code",[t._v("optAmount")]),t._v(" does not equal the balance of\n"),a("code",[t._v("payment")]),t._v(", or if "),a("code",[t._v("payment")]),t._v(" is an unresolved promise, throw an error.")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" issuer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" mint"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" amountMath "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("makeIssuerKit")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'bucks'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" purse "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" issuer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("makeEmptyPurse")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" payment "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" mint"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("mintPayment")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("amountMath"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("make")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("123")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" bucks123 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" amountMath"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("make")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("123")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Deposit a payment for 123 bucks into the purse. Ensure that this is the amount you expect.")]),t._v("\npurse"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("deposit")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("payment"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" bucks123"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" secondPayment "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" mint"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("mintPayment")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("amountMath"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("make")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("100")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Throws error")]),t._v("\npurse"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("deposit")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("secondPayment"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" fungible123"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n")])])]),a("h2",{attrs:{id:"purse-makedepositfacet"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#purse-makedepositfacet"}},[t._v("#")]),t._v(" purse.makeDepositFacet()")]),t._v(" "),a("p",[t._v("Creates a deposit-only facet on the "),a("code",[t._v("purse")]),t._v(". This is an object you can give to other parties\nthat lets them deposit to your  "),a("code",[t._v("purse")]),t._v(" without being able to withdraw, making it a safe\nway to let other people send you payments.")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" depositOnlyFacet "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" purse"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("makeDepositFacet")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Give depositOnlyFacet to someone else. They can pass a payment that will be deposited:")]),t._v("\ndepositOnlyFacet"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("receive")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("payment"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h2",{attrs:{id:"purse-withdraw-amount"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#purse-withdraw-amount"}},[t._v("#")]),t._v(" purse.withdraw(amount)")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("amount")]),t._v(" "),a("code",[t._v("{Amount}")])]),t._v(" "),a("li",[t._v("Returns: "),a("code",[t._v("{Payment}")])])]),t._v(" "),a("p",[t._v("Withdraw the "),a("code",[t._v("amount")]),t._v(" from this purse into a new Payment.")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Create a purse with a balance of 10 amount")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" issuer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" mint "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("makeIssuerKit")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'bucks'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" purse "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" issuer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("makeEmptyPurse")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" payment "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" mint"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("mintPayment")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("amountMath"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("make")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" fungible10 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" amountMath"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("make")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\npurse"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("deposit")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("payment"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" fungible10"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Withdraw 3 amount from the purse")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" fungible3 "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" amountMath"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("make")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" withdrawalPayment "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" purse"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("withdraw")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("fungible3"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// The balance of the withdrawal payment is 3 amount")]),t._v("\nissuer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getAmountOf")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("withdrawalPayment"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// The new balance of the purse is 7 amount")]),t._v("\npurse"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getCurrentAmount")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);