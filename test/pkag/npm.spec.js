import { expect, it } from 'vitest';
import { parsePkAg } from '../../src/commands';
const agent = 'npm';
function _(arg, expected) {
    return () => {
        expect(parsePkAg(agent, arg.split(' ').filter(Boolean))).toBe(expected);
    };
}
it('empty', _('', 'npm'));
it('foo', _('foo', 'npm foo'));
it('run test', _('run test', 'npm run test'));
//# sourceMappingURL=npm.spec.js.map