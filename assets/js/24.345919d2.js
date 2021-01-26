(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{410:function(e,t,o){"use strict";o.r(t);var n=o(42),v=Object(n.a)({},(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("h1",{attrs:{id:"price-authority"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#price-authority"}},[e._v("#")]),e._v(" Price Authority")]),e._v(" "),o("p",[o("code",[e._v("PriceAuthority")]),e._v(" is an object that mints "),o("code",[e._v("PriceQuotes")]),e._v(" and handles\ntriggers and notifiers for changes in the price.")]),e._v(" "),o("p",[o("code",[e._v("PriceAuthority")]),e._v(" objects use timer services. You should be familiar with the objects\nand methods in the "),o("RouterLink",{attrs:{to:"/REPL/timerServices.html"}},[e._v("REPL TimerService document")])],1),e._v(" "),o("h2",{attrs:{id:"price-quote-objects"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#price-quote-objects"}},[e._v("#")]),e._v(" Price quote objects")]),e._v(" "),o("p",[e._v("Before discussing "),o("code",[e._v("PriceAuthority")]),e._v(" and "),o("code",[e._v("PriceAuthorityAdmin")]),e._v(" methods, we need to\ncover the other price-based objects and methods they interact with.")]),e._v(" "),o("p",[e._v("A "),o("code",[e._v("PriceQuote")]),e._v(" is an object with two properties:")]),e._v(" "),o("ul",[o("li",[o("code",[e._v("quoteAmount")]),e._v(": An "),o("code",[e._v("Amount")]),e._v(" whose value is a "),o("code",[e._v("PriceQuoteValue")]),e._v(".")]),e._v(" "),o("li",[o("code",[e._v("quotePayment")]),e._v(": The "),o("code",[e._v("quoteAmount")]),e._v(" wrapped as a "),o("code",[e._v("Payment")]),e._v(". It is either an "),o("code",[e._v("ERef<Payment>")]),e._v(" or "),o("code",[e._v("null")]),e._v(".")])]),e._v(" "),o("p",[e._v("The "),o("code",[e._v("quoteAmount")]),e._v(" describes a price available at a particular time. So that price can be shared by\nrecipients with others, its associated "),o("code",[e._v("quotePayment")]),e._v(" is the same value wrapped as a payment from the QuoteIssuer.\nThis lets other recipients validate the quote is from the intended source.")]),e._v(" "),o("p",[e._v("Accessing the "),o("code",[e._v("quotePayment")]),e._v(" value requires a round trip, so "),o("code",[e._v("quoteAmount")]),e._v("is included for the original recipient's\nconvenience. They know  who they received it from and don't need to validate provenance.")]),e._v(" "),o("p",[e._v("A "),o("code",[e._v("PriceQuoteValue")]),e._v(" is the "),o("code",[e._v("Value")]),e._v(" part of a "),o("code",[e._v("quoteAmount")]),e._v(". Its properties are:")]),e._v(" "),o("ul",[o("li",[o("code",[e._v("amountIn")]),e._v(" "),o("code",[e._v("{ Amount }")]),e._v(": The amount supplied to a trade")]),e._v(" "),o("li",[o("code",[e._v("amountOut")]),e._v(" "),o("code",[e._v("{ Amount }")]),e._v(": The quoted result of trading "),o("code",[e._v("amountIn")])]),e._v(" "),o("li",[o("code",[e._v("timer")]),e._v(" "),o("code",[e._v("{ TimerService }")]),e._v(":  The service that gave the "),o("code",[e._v("timestamp")])]),e._v(" "),o("li",[o("code",[e._v("timestamp")]),e._v(" "),o("code",[e._v("{ Timestamp }")]),e._v(": A timestamp according to "),o("code",[e._v("timer")]),e._v(" for the quote")]),e._v(" "),o("li",[o("code",[e._v("conditions")]),e._v(" "),o("code",[e._v("{ any= }")]),e._v(": Additional conditions for the quote")])]),e._v(" "),o("h2",{attrs:{id:"getquoteissuer-brandin-brandout"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#getquoteissuer-brandin-brandout"}},[e._v("#")]),e._v(" "),o("code",[e._v("getQuoteIssuer(brandIn, brandOut)")])]),e._v(" "),o("ul",[o("li",[o("code",[e._v("brandIn")]),e._v(" "),o("code",[e._v("{ Brand }")])]),e._v(" "),o("li",[o("code",[e._v("brandOut")]),e._v(" "),o("code",[e._v("{ Brand }")])]),e._v(" "),o("li",[e._v("Returns: "),o("code",[e._v("{ ERef<Issuer> }")])])]),e._v(" "),o("p",[e._v("Returns the ERTP "),o("code",[e._v("PriceQuote")]),e._v(" issuer for the specified brands pair.")]),e._v(" "),o("h2",{attrs:{id:"gettimerservice-brandin-brandout"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#gettimerservice-brandin-brandout"}},[e._v("#")]),e._v(" "),o("code",[e._v("getTimerService(brandIn, brandOut)")])]),e._v(" "),o("ul",[o("li",[o("code",[e._v("brandIn")]),e._v(" "),o("code",[e._v("{ Brand }")])]),e._v(" "),o("li",[o("code",[e._v("brandOut")]),e._v(" "),o("code",[e._v("{ Brand }")])]),e._v(" "),o("li",[e._v("Returns: "),o("code",[e._v("{ ERef<TimerService> }")])])]),e._v(" "),o("p",[e._v("Returns the timer used in "),o("code",[e._v("PriceQuotes")]),e._v(" for the specified brands.")]),e._v(" "),o("h2",{attrs:{id:"makequotenotifier-amountin-brandout"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#makequotenotifier-amountin-brandout"}},[e._v("#")]),e._v(" "),o("code",[e._v("makeQuoteNotifier(amountIn, brandOut)")])]),e._v(" "),o("ul",[o("li",[o("code",[e._v("amountIn")]),e._v(" "),o("code",[e._v("{ Amount }")])]),e._v(" "),o("li",[o("code",[e._v("brandOut")]),e._v(" "),o("code",[e._v("{ Brand }")])]),e._v(" "),o("li",[e._v("Returns: "),o("code",[e._v("{ ERef<Notifier<PriceQuotes>> }")])])]),e._v(" "),o("p",[e._v("Be notified of the latest "),o("code",[e._v("PriceQuotes")]),e._v(" for the given "),o("code",[e._v("amountIn")]),e._v(".\nDifferent "),o("code",[e._v("PriceAuthories")]),e._v(" may issue these at very different rates.")]),e._v(" "),o("h2",{attrs:{id:"getpricenotifier-brandin-brandout"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#getpricenotifier-brandin-brandout"}},[e._v("#")]),e._v(" "),o("code",[e._v("getPriceNotifier(brandIn, brandOut)")])]),e._v(" "),o("ul",[o("li",[o("code",[e._v("brandIn")]),e._v(" "),o("code",[e._v("{ Brand }")])]),e._v(" "),o("li",[o("code",[e._v("brandOut")]),e._v(" "),o("code",[e._v("{ Brand }")])]),e._v(" "),o("li",[e._v("Returns: "),o("code",[e._v("{ Notifier }")])])]),e._v(" "),o("p",[e._v("Returns a notifier for the specified brands. Different "),o("code",[e._v("PriceAuthories")]),e._v(" may\nissue these at very different rates.")]),e._v(" "),o("h2",{attrs:{id:"quotegiven-amountin-brandout"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#quotegiven-amountin-brandout"}},[e._v("#")]),e._v(" "),o("code",[e._v("quoteGiven(amountIn, brandOut)")])]),e._v(" "),o("ul",[o("li",[o("code",[e._v("amountIn")]),e._v(" "),o("code",[e._v("{ Amount }")])]),e._v(" "),o("li",[o("code",[e._v("brandOut")]),e._v(" "),o("code",[e._v("{ Brand }")])]),e._v(" "),o("li",[e._v("Returns: "),o("code",[e._v("{ Promise<PriceQuote> }")])])]),e._v(" "),o("p",[e._v("Returns a price quote corresponding to the specified amount in the specified brand.\n"),o("code",[e._v('quoteGiven() essentially asks "how much')]),e._v("brandOut"),o("code",[e._v("would I get for")]),e._v("amountIn`.")]),e._v(" "),o("p",[e._v("Note that "),o("code",[e._v("quoteGiven()")]),e._v(" and "),o("code",[e._v("quoteWanted()")]),e._v(" can give different answers for not-trivial amounts.")]),e._v(" "),o("h2",{attrs:{id:"quotewanted-brandin-amountout"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#quotewanted-brandin-amountout"}},[e._v("#")]),e._v(" "),o("code",[e._v("quoteWanted(brandIn, amountOut)")])]),e._v(" "),o("ul",[o("li",[o("code",[e._v("brandIn")]),e._v(" "),o("code",[e._v("{ Brand }")])]),e._v(" "),o("li",[o("code",[e._v("amountOut")]),e._v(" "),o("code",[e._v("{ Amount }")])]),e._v(" "),o("li",[e._v("Returns: "),o("code",[e._v("{ Promise<PriceQuote> }")])])]),e._v(" "),o("p",[e._v("Returns a price quote for the specified amount in the specified brand.\n"),o("code",[e._v('quoteWanted() essentially asks "how much')]),e._v("brandIn"),o("code",[e._v("would I have to pay to get")]),e._v("amountOut`.")]),e._v(" "),o("p",[e._v("Note that "),o("code",[e._v("quoteGiven()")]),e._v(" and "),o("code",[e._v("quoteWanted()")]),e._v(" can give different answers for not-trivial amounts.")]),e._v(" "),o("h2",{attrs:{id:"quoteattime-deadline-amountin-brandout"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#quoteattime-deadline-amountin-brandout"}},[e._v("#")]),e._v(" "),o("code",[e._v("quoteAtTime(deadline, amountIn, brandOut)")])]),e._v(" "),o("ul",[o("li",[o("code",[e._v("deadline")]),e._v(" "),o("code",[e._v("{ Timestamp }")])]),e._v(" "),o("li",[o("code",[e._v("amountIn")]),e._v(" "),o("code",[e._v("{ Amount }")])]),e._v(" "),o("li",[o("code",[e._v("brandOut")]),e._v(" "),o("code",[e._v("{ Brand }")])]),e._v(" "),o("li",[e._v("Returns: "),o("code",[e._v("{ Promise<PriceQuote> }")])])]),e._v(" "),o("p",[e._v("Resolves after "),o("code",[e._v("deadline")]),e._v(" passes on the Price Authority's "),o("code",[e._v("timerService")]),e._v("\nwith "),o("code",[e._v("amountIn")]),e._v("'s price quote at that time.")]),e._v(" "),o("h2",{attrs:{id:"quotewhengt-amountin-amountoutlimit"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#quotewhengt-amountin-amountoutlimit"}},[e._v("#")]),e._v(" "),o("code",[e._v("quoteWhenGT(amountIn, amountOutLimit)")])]),e._v(" "),o("ul",[o("li",[o("code",[e._v("amountIn")]),e._v(" "),o("code",[e._v("{ Amount }")])]),e._v(" "),o("li",[o("code",[e._v("amountOutLimit")]),e._v("{ Amount }`")]),e._v(" "),o("li",[e._v("Returns: "),o("code",[e._v("{ Promise<PriceQuote> }")])])]),e._v(" "),o("p",[e._v("Resolve when a price quote of "),o("code",[e._v("amountIn")]),e._v(" exceeds "),o("code",[e._v("amountOutLimit")])]),e._v(" "),o("h2",{attrs:{id:"quotewhengte-amountin-amountoutlimit"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#quotewhengte-amountin-amountoutlimit"}},[e._v("#")]),e._v(" "),o("code",[e._v("quoteWhenGTE(amountIn, amountOutLimit)")])]),e._v(" "),o("ul",[o("li",[o("code",[e._v("amountIn")]),e._v(" "),o("code",[e._v("{ Amount }")])]),e._v(" "),o("li",[o("code",[e._v("amountOutLimit")]),e._v("{ Amount }`")]),e._v(" "),o("li",[e._v("Returns: "),o("code",[e._v("{ Promise<PriceQuote> }")])])]),e._v(" "),o("p",[e._v("Resolve when a price quote of "),o("code",[e._v("amountIn")]),e._v(" reaches or exceeds "),o("code",[e._v("amountOutLimit")])]),e._v(" "),o("h2",{attrs:{id:"quotewhenlte-amountin-amountoutlimit"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#quotewhenlte-amountin-amountoutlimit"}},[e._v("#")]),e._v(" "),o("code",[e._v("quoteWhenLTE(amountIn, amountOutLimit)")])]),e._v(" "),o("ul",[o("li",[o("code",[e._v("amountIn")]),e._v(" "),o("code",[e._v("{ Amount }")])]),e._v(" "),o("li",[o("code",[e._v("amountOutLimit")]),e._v("{ Amount }`")]),e._v(" "),o("li",[e._v("Returns: "),o("code",[e._v("{ Promise<PriceQuote> }")])])]),e._v(" "),o("p",[e._v("Resolve when a price quote of "),o("code",[e._v("amountIn")]),e._v(" reaches or drops below "),o("code",[e._v("amountOutLimit")])]),e._v(" "),o("h2",{attrs:{id:"quotewhenlt-amountin-amountoutlimit"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#quotewhenlt-amountin-amountoutlimit"}},[e._v("#")]),e._v(" "),o("code",[e._v("quoteWhenLT(amountIn, amountOutLimit)")])]),e._v(" "),o("ul",[o("li",[o("code",[e._v("amountIn")]),e._v(" "),o("code",[e._v("{ Amount }")])]),e._v(" "),o("li",[o("code",[e._v("amountOutLimit")]),e._v("{ Amount }`")]),e._v(" "),o("li",[e._v("Returns: "),o("code",[e._v("{ Promise<PriceQuote> }")])])]),e._v(" "),o("p",[e._v("Resolve when a price quote of "),o("code",[e._v("amountIn")]),e._v(" drops to below "),o("code",[e._v("amountOutLimit")]),e._v(".")])])}),[],!1,null,null,null);t.default=v.exports}}]);