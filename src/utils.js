import os from 'node:os';
import { dirname, join } from 'node:path';
import { existsSync, promises as fs } from 'node:fs';
import process from 'node:process';
import which from 'which';
export const CLI_TEMP_DIR = join(os.tmpdir(), 'diotto-dev');
export function remove(arr, v) {
    const index = arr.indexOf(v);
    if (index >= 0)
        arr.splice(index, 1);
    return arr;
}
export function exclude(arr, v) {
    return arr.slice().filter(item => item !== v);
}
export function cmdExists(cmd) {
    return which.sync(cmd, { nothrow: true }) !== null;
}
export function getVoltaPrefix() {
    // https://blog.volta.sh/2020/11/25/command-spotlight-volta-run/
    const VOLTA_PREFIX = 'volta run';
    const hasVoltaCommand = cmdExists('volta');
    return hasVoltaCommand ? VOLTA_PREFIX : '';
}
let counter = 0;
async function openTemp() {
    if (!existsSync(CLI_TEMP_DIR))
        await fs.mkdir(CLI_TEMP_DIR, { recursive: true });
    const competitivePath = join(CLI_TEMP_DIR, `.${process.pid}.${counter}`);
    counter++;
    return fs.open(competitivePath, 'wx')
        .then(fd => ({
        fd,
        path: competitivePath,
        cleanup() {
            fd.close().then(() => {
                if (existsSync(competitivePath))
                    fs.unlink(competitivePath);
            });
        },
    }))
        .catch((error) => {
        if (error && error.code === 'EEXIST')
            return openTemp();
        else
            return undefined;
    });
}
/**
 * Write file safely avoiding conflicts
 */
export async function writeFileSafe(path, data = '') {
    const temp = await openTemp();
    if (temp) {
        fs.writeFile(temp.path, data)
            .then(() => {
            const directory = dirname(path);
            if (!existsSync(directory))
                fs.mkdir(directory, { recursive: true });
            return fs.rename(temp.path, path)
                .then(() => true)
                .catch(() => false);
        })
            .catch(() => false)
            .finally(temp.cleanup);
    }
    return false;
}
//# sourceMappingURL=utils.js.map