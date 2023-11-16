import { expect, it } from 'vitest';
import { parsePkAg } from '../../src/commands';
const agent = 'yarn@berry';
function _(arg, expected) {
    return () => {
        expect(parsePkAg(agent, arg.split(' ').filter(Boolean))).toBe(expected);
    };
}
it('empty', _('', 'yarn'));
it('foo', _('foo', 'yarn foo'));
it('run test', _('run test', 'yarn run test'));
//# sourceMappingURL=yarn@berry.spec.js.map