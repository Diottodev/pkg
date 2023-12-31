/// <reference types="node" />
import type { Buffer } from 'node:buffer';
export declare const CLI_TEMP_DIR: string;
export declare function remove<T>(arr: T[], v: T): T[];
export declare function exclude<T>(arr: T[], v: T): T[];
export declare function cmdExists(cmd: string): boolean;
export declare function getVoltaPrefix(): string;
/**
 * Write file safely avoiding conflicts
 */
export declare function writeFileSafe(path: string, data?: string | Buffer): Promise<boolean>;
