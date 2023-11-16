import { resolve } from 'node:path';
import fs from 'node:fs';
import process from 'node:process';
export function getPackageJSON(ctx) {
    var _a;
    const cwd = (_a = ctx === null || ctx === void 0 ? void 0 : ctx.cwd) !== null && _a !== void 0 ? _a : process.cwd();
    const path = resolve(cwd, 'package.json');
    if (fs.existsSync(path)) {
        try {
            const raw = fs.readFileSync(path, 'utf-8');
            const data = JSON.parse(raw);
            return data;
        }
        catch (e) {
            if (!(ctx === null || ctx === void 0 ? void 0 : ctx.programmatic)) {
                console.warn('Failed to parse package.json');
                process.exit(1);
            }
            throw e;
        }
    }
}
//# sourceMappingURL=fs.js.map