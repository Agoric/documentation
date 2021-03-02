# Vats

A vat is a *unit of isolation*. To paraphrase the Las Vegas advertising slogan, what happens in the vat stays in the vat. Objects and functions in a JavaScript vat can communicate synchronously with one another. Vats and their contents can communicate with other vats and their objects and functions, but have to
[manage asynchronous messages and responses](/guides/js-programming/eventual-send.md).

There are no tools for telling what vat something is in, or if two things are in the same or different vats. In general, you/your code should know if things are local (in the same vat) because you created them or they were passed to you by something guaranteeing that’s the case. Other objects you should treat as if they might be distant (in different vats). In practice, you will know that your normal method calls (`obj.method()`) fails because the method doesn't exist and that's usually when you slap your forehead and go "Of course, it's remote!".

Vats need to run on some platform. Both a single physical machine and a blockchain (which might itself be running on a set of  collaborating machines) are possible platforms. Either type of platform can host one or more vats.

Since a vat runs in a single *event loop*, each incoming request has to finish before the next one starts. If there's remaining work, you schedule it to happen later after a Promise resolves.

The Agoric process starts several vats. Each vat hosts a service (e.g. the Board, Zoe,
etc.). As of July, 2020, all contracts run in the Zoe vat. Eventually this will change to each contract having a dedicated vat.
