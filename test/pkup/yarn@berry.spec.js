import { expect, it } from 'vitest';
import { parsePkUp } from '../../src/commands';
const agent = 'yarn@berry';
function _(arg, expected) {
    return () => {
        expect(parsePkUp(agent, arg.split(' ').filter(Boolean))).toBe(expected);
    };
}
it('empty', _('', 'yarn up'));
it('interactive', _('-i', 'yarn up -i'));
//# sourceMappingURL=yarn@berry.spec.js.map