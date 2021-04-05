# DisplayInfo object

`DisplayInfo` objects have one optional property, `decimalPlaces`, which takes a positive integer value.

Tells the display software how many decimal places to move the
decimal over to the left, or in other words, which position corresponds to whole
numbers. Fungible digital assets are represented in integers, in their smallest unit.
So, for example, the smallest unit for a US Dollar might be either mill, 1/1000 of a 
dollar, or cent, 1/100 of a dollar. If mill, `decimalPlaces` would be 3, if cent, it
would be 2. 

Do **not** specify a value for non-fungible digital assets.

`decimalPlaces` should be used for *display purposes only*. Any
other use is an anti-pattern.
