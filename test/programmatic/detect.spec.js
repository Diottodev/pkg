import path from 'node:path';
import { tmpdir } from 'node:os';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import fs from 'fs-extra';
import { AGENTS, detect } from '../../src';
let basicLog, errorLog, warnLog, infoLog;
function detectTest(agent) {
    return async () => {
        const cwd = await fs.mkdtemp(path.join(tmpdir(), 'ni-'));
        const fixture = path.join(__dirname, '..', 'fixtures', 'lockfile', agent);
        await fs.copy(fixture, cwd);
        expect(await detect({ programmatic: true, cwd })).toMatchSnapshot();
    };
}
beforeAll(() => {
    basicLog = vi.spyOn(console, 'log');
    warnLog = vi.spyOn(console, 'warn');
    errorLog = vi.spyOn(console, 'error');
    infoLog = vi.spyOn(console, 'info');
});
afterAll(() => {
    vi.resetAllMocks();
});
const agents = [...Object.keys(AGENTS), 'unknown'];
const fixtures = ['lockfile', 'packager'];
// matrix testing of: fixtures x agents
fixtures.forEach(fixture => describe(fixture, () => agents.forEach((agent) => {
    it(agent, detectTest(agent));
    it('no logs', () => {
        expect(basicLog).not.toHaveBeenCalled();
        expect(warnLog).not.toHaveBeenCalled();
        expect(errorLog).not.toHaveBeenCalled();
        expect(infoLog).not.toHaveBeenCalled();
    });
})));
//# sourceMappingURL=detect.spec.js.map