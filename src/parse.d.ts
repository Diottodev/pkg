import type { Agent, Command } from './agents';
import type { Runner } from './runner';
export declare class UnsupportedCommand extends Error {
    constructor({ agent, command }: {
        agent: Agent;
        command: Command;
    });
}
export declare function getCommand(agent: Agent, command: Command, args?: string[]): string;
export declare const parsePkg: Runner;
export declare const parsePkr: Runner;
export declare const parsePkUp: Runner;
export declare const parsePkUn: Runner;
export declare const parsePkx: Runner;
export declare const parsePkAg: Runner;
