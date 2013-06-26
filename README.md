Investigatory tool to grab performance data for various sites; right now
hardcoded for bugzilla.mozilla.org because that was what I was investigating.

Right now all output is just via console.log and in order to see the output you
need to bring up about:config and set the "extensions.sdk.console.logLevel"
preference to (string) "all".  Alternatively, you could figure out the
extension-id and put that in.  See
https://addons.mozilla.org/en-US/developers/docs/sdk/latest/dev-guide/console.html#Logging%20Levels
for more details.
