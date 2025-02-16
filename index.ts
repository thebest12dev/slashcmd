/*!
 * @file index.ts
 * @description The main file for a highly minimal command parser.
 * @version 1.0.0
 * 
 * Copyright (c) 2024 thebest12lines
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * A command interface that is used for the command registering/deregistering/executing logic.
 */
export interface Command {
    /**
     * The name of the command.
     */
    name: string;

    /**
     * The execution function.
     * @param args The arguments passed.
     * @param error Function to error.
     * @param errors The list of built-in errors.
     */
    execute: (args: string[], error: (message: string) => void, errors: string[]) => void;
}

/**
 * List of errors that will be used during parsing. 
 */
export const errors = [
    "Expected '${initializer}' to be before command at 1:1.",
    "Expected command at ${location}, got nonexistent command."
]

/**
 * A class for registering and deregistering commands.
 * @since v1.0.0
 */
export class Commands {
    // The map to store the commands.
    private static commands: Map<string, Command> = new Map();

    // Our initializer which every command needs to prefix
    private static initializer = "/";

    /**
     * Registers a command.
     * @param command The `Command` object to register.
     */
    static registerCommand(command: Command): void {
        // Sets the key-value pair
        this.commands.set(command.name, command);
    }

    /**
     * Deregisters a command.
     * @param command The `Command` object to deregister.
     */
    static deregisterCommand(command: Command): void {
        // Deletes the command from the map
        this.commands.delete(command.name)
    }
    /**
     * Registers a nested command.
     * @param parentCmd The parent command to be used.
     * @param cmd The child command to be used.
     */
    static registerNestedCommand(parentCmd: Command, cmd: Command): void {
        // Sets the key-value pair with the parent command's name appended with a space
        // and the child command's name.
        this.commands.set(parentCmd.name + " " + cmd.name, cmd);
    }
    /**
     * Sets the initializer for the command parser (defaults to '/').
     * @param initializer The initializer to be used.
     */
    static setInitializer(initializer: string): void {
        // Sets the initializer directly.
        Commands.initializer = initializer;
    }

    /**
     * Parses and executes a command.
     * @param commandStruct The command to execute.
     */
     static execute(commandStruct: string) {
            // Check if the command starts with the initializer
            if (!commandStruct.startsWith(this.initializer)) {
                // If not, throw type error
                throw new TypeError(errors[0].replace("${initializer}", this.initializer));
            }
            
            // Get the arguments (parts)
            const parts = commandStruct.slice(this.initializer.length).split(" ");

            // Get the command name
            const commandName = parts[0];

            // Get the arguments
            const args = parts.slice(1);
            
            // And the command for the execution
            const command = this.commands.get(commandName);

            // If command exists
            if (command) {

                // We'll execute the command with the args, error function and errors constant.

                // Along as a try-catch block for handling.
                try {
                    command.execute(args,(msg) => {
                        throw new Error(msg);
                    }, errors);
                } catch (e: any) {
                    // Throw error (casted)
                    throw e as Error;
                }
                
            } else {
                // Throw type error
                throw new TypeError(errors[1].replace("${location}", "1:" + commandName.length));
            }
        
       
    }
}

// Check if we're in a Node.js environment
if (typeof module !=='undefined' && typeof module.exports !== 'undefined') {
    // Exports (CommonJS)
    module.exports = {Commands, errors};
}