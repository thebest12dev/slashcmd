# slashcmd
A basic and highly minimal (around 0.8kb!) command parser. Supports commands with arguments and nested commands.

## Example
To register a command:
```js
const { Commands } = require("slashcmd");
Commands.registerCommand({
    name: "foo",
    execute: () => {
        console.log("Executed command!");
    }
});

Commands.execute("/foo"); // Executed command!
```

To register a command with arguments:
```js
const { Commands } = require("slashcmd");
Commands.registerCommand({
    name: "foo",
    execute: (args) => {
        console.log(args);
    }
});

Commands.execute("/foo bar") // [ 'bar' ]
```

## ESM and Global
This package supports ES modules, so you can use the import statement.
Regards for global, this project doesn't include a global-only file,
so you need to add `globalThis.slashcmd = {Commands, errors}` to the
source files.
## Discord?
This package is **NOT** for Discord as it is a minimal slash-command
parser. While Discord does use slash-commands, this package does not
interact with the Discord API. If you are making a Discord bot,
please check out the `discord.js` package.

This package is **intended** to be used in projects like games (where a command system is needed) or maybe any project than needs a command parser.