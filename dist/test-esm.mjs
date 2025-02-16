import { Commands } from "./index.mjs";
console.log();
let failed = false;
Commands.registerCommand({
    name: "test",
    execute: (args) => {
        if (!(args[0] === "foo" && args[1] === "bar")) throw new Error();
    }
});
try {
    Commands.execute("/test foo bar");
    console.log("Regular command test passed.");
} catch {
    failed = true;
    console.log("Regular command test failed.");
}
Commands.setInitializer("!");
try {
    Commands.execute("!test foo bar");
    console.log("Change initializer test passed.");
} catch {
    failed = true;
    console.log("Change initializer test failed.");
}

Commands.deregisterCommand({name: "test"});
try {
    Commands.execute("!test foo bar");
    failed = true;
    console.log("Deregister command test failed.");
} catch  {
    console.log("Deregister command test passed.");
}
if (failed) {
    console.log("Some tests failed. Please check the code.");
} else {
    console.log("All tests passed for ESM. The code is working as expected.");
}