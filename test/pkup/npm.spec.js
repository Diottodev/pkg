import { expect, it } from 'vitest';
import { parsePkUp } from '../../src/commands';
const agent = 'npm';
function _(arg, expected) {
    return () => {
        expect(parsePkUp(agent, arg.split(' ').filter(Boolean))).toBe(expected);
    };
}
it('empty', _('', 'npm update'));
//# sourceMappingURL=npm.spec.js.map