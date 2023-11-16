import path from 'node:path';
import { tmpdir } from 'node:os';
import fs from 'fs-extra';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { AGENTS, parsePkAg, parsePkg, parsePkx, parsePkUn, parsePkUp, runCli } from '../../src';
let basicLog, errorLog, warnLog, infoLog;
function runCliTest(fixtureName, agent, runner, args) {
    return async () => {
        const cwd = await fs.mkdtemp(path.join(tmpdir(), 'ni-'));
        const fixture = path.join(__dirname, '..', 'fixtures', fixtureName, agent);
        await fs.copy(fixture, cwd);
        await runCli(async (agent, _, ctx) => {
            // we override the args to be test specific
            return runner(agent, args, ctx);
        }, {
            programmatic: true,
            cwd,
            args,
        }).catch((e) => {
            // it will always throw if execa is mocked
            if (e.command)
                expect(e.command).toMatchSnapshot();
            else
                expect(e.message).toMatchSnapshot();
        });
    };
}
beforeAll(() => {
    basicLog = vi.spyOn(console, 'log');
    warnLog = vi.spyOn(console, 'warn');
    errorLog = vi.spyOn(console, 'error');
    infoLog = vi.spyOn(console, 'info');
    vi.mock('execa', async (importOriginal) => {
        const mod = await importOriginal();
        return {
            ...mod,
            execaCommand: (cmd) => {
                // break execution flow for easier snapshotting
                // eslint-disable-next-line no-throw-literal
                throw { command: cmd };
            },
        };
    });
});
afterAll(() => {
    vi.resetAllMocks();
});
const agents = [...Object.keys(AGENTS), 'unknown'];
const fixtures = ['lockfile', 'packager'];
// matrix testing of: fixtures x agents x commands
fixtures.forEach(fixture => describe(fixture, () => agents.forEach(agent => describe(agent, () => {
    /** pk ag */
    it('pk ag', runCliTest(fixture, agent, parsePkAg, []));
    it('pk ag run foo', runCliTest(fixture, agent, parsePkAg, ['run', 'foo']));
    /** pkg */
    it('pkg', runCliTest(fixture, agent, parsePkg, []));
    it('pkg foo', runCliTest(fixture, agent, parsePkg, ['foo']));
    it('pkg foo -D', runCliTest(fixture, agent, parsePkg, ['foo', '-D']));
    it('pkg --frozen', runCliTest(fixture, agent, parsePkg, ['--frozen']));
    it('pkg -g foo', runCliTest(fixture, agent, parsePkg, ['-g', 'foo']));
    /** pkx */
    it('pkx', runCliTest(fixture, agent, parsePkx, ['foo']));
    /** pk up */
    it('pk up', runCliTest(fixture, agent, parsePkUp, []));
    it('pk up -i', runCliTest(fixture, agent, parsePkUp, ['-i']));
    /** pk un */
    it('pk un foo', runCliTest(fixture, agent, parsePkUn, ['foo']));
    it('pk un -g foo', runCliTest(fixture, agent, parsePkUn, ['-g', 'foo']));
    it('no logs', () => {
        expect(basicLog).not.toHaveBeenCalled();
        expect(warnLog).not.toHaveBeenCalled();
        expect(errorLog).not.toHaveBeenCalled();
        expect(infoLog).not.toHaveBeenCalled();
    });
}))));
//# sourceMappingURL=runCli.spec.js.map