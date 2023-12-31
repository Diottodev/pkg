export interface Storage {
    lastRunCommand?: string;
}
export declare function load(fn?: (storage: Storage) => Promise<boolean> | boolean): Promise<Storage>;
export declare function dump(): Promise<void>;
