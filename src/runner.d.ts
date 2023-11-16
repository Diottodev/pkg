import type { Agent } from './agents';
import type { DetectOptions } from './detect';
export interface RunnerContext {
    programmatic?: boolean;
    hasLock?: boolean;
    cwd?: string;
}
export type Runner = (agent: Agent, args: string[], ctx?: RunnerContext) => Promise<string | undefined> | string | undefined;
export declare function runCli(fn: Runner, options?: DetectOptions & {
    args?: string[];
}): Promise<void>;
export declare function getCliCommand(fn: Runner, args: string[], options?: DetectOptions, cwd?: string): Promise<string | undefined>;
export declare function run(fn: Runner, args: string[], options?: DetectOptions): Promise<void>;
