/*!
 * @file index.ts
 * @description The main file for a highly minimal command parser.
 * @version 1.1.2
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
export declare const errors: string[];

/**
 * A class for registering and deregistering commands.
 * @since v1.0.0
 */
export declare class Commands {
    // The map to store the commands.
    private static commands: Map<string, Command>

    // Our initializer which every command needs to prefix
    private static initializer: string

    /**
     * Registers a command.
     * @param command The `Command` object to register.
     */
    static registerCommand(command: Command): void 

    /**
     * Deregisters a command.
     * @param command The `Command` object to deregister.
     */
    static deregisterCommand(command: Command): void 
   
    /**
     * Sets the initializer for the command parser (defaults to '/').
     * @param initializer The initializer to be used.
     */
    static setInitializer(initializer: string): void
    /**
     * Parses and executes a command.
     * @param commandStruct The command to execute.
     */
     static execute(commandStruct: string)
}