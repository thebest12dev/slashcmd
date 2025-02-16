export const errors = [
    "Expected '${initializer}' to be before command at 1:1.",
    "Expected command at ${location}, got nonexistent command."
];
export class Commands {
    #commands;
    #initializer;
    // Method to register a command
    static registerCommand(command) {
        this.commands.set(command.name, command);
    }
    static registerNestedCommand(parentCmd, cmd) {
        this.commands.set(parentCmd.name + " " + cmd.name, cmd);
    }
    static setInitializer(initializer) {
        Commands.initializer = initializer;
    }
    static execute(commandStruct) {
        if (!commandStruct.startsWith(this.initializer)) {
            throw new TypeError(errors[0].replace("${initializer}", this.initializer));
        }
        const parts = commandStruct.slice(this.initializer.length).split(" ");
        const commandName = parts[0];
        const args = parts.slice(1);
        const command = this.commands.get(commandName);
        if (command) {
            try {
                command.execute(args, (msg) => {
                    throw new Error(msg);
                }, errors);
            }
            catch (e) {
                throw e;
            }
        }
        else {
            throw new TypeError(errors[1].replace("${location}", "1:" + commandName.length));
        }
    }
}