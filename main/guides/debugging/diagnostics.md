# Developing with better error diagnostics

If you are using the bash shell and are debugging multivat code (as all dapp developers do),
put this:
```js
export LOCKDOWN_OPTIONS='{"errorTaming":"unsafe","stackFiltering":"verbose"}'
```
somewhere such that it affects all the shells you use to spawn the code under test. 
For example, in `~/.bashrc`. Once you've done that, either paste the above line manually
into your existing shells or shut those shells down and restart them so  they execute the
`export` command.

**Important**: This setting is unsafe for production, so put where it is unlikely to affect 
any shells from which code is spawned for production.
 
 For non-bash shells, there will be some similar procedure for setting 
up environment variables. The string between the single quotes is a JSON encoding 
of [the options to `lockdown`](https://github.com/endojs/endo/blob/master/packages/ses/lockdown-options.md). Read 
that document to understand what settings are right for you.

If you use `agoric --start -v` instead of `agoric --start`, that shell will have additional diagnostic 
information scrolling by. `-v` is the "verbose" flag. Most of this will not be interesting, which is why
it's not on by default. But when you see a received error elsewhere, somewhere in the noise you'll find 
the corresponding sent error.

For more information about what the `errorTaming` and `stackFiltering` options of `lockdown()` do, see
[here](/guides/js-programming/ses/lockdown.md#options-quick-reference).
