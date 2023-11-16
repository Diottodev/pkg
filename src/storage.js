import { existsSync, promises as fs } from 'node:fs';
import { resolve } from 'node:path';
import { CLI_TEMP_DIR, writeFileSafe } from './utils';
let storage;
const storagePath = resolve(CLI_TEMP_DIR, '_storage.json');
export async function load(fn) {
    if (!storage) {
        storage = existsSync(storagePath)
            ? (JSON.parse(await fs.readFile(storagePath, 'utf-8') || '{}') || {})
            : {};
    }
    if (fn) {
        if (await fn(storage))
            await dump();
    }
    return storage;
}
export async function dump() {
    if (storage)
        await writeFileSafe(storagePath, JSON.stringify(storage));
}
//# sourceMappingURL=storage.js.map