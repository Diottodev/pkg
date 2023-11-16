import { expect, it } from 'vitest';
import { parsePkUp } from '../../src/commands';
const agent = 'yarn';
function _(arg, expected) {
    return () => {
        expect(parsePkUp(agent, arg.split(' ').filter(Boolean))).toBe(expected);
    };
}
it('empty', _('', 'yarn upgrade'));
it('interactive', _('-i', 'yarn upgrade-interactive'));
it('interactive latest', _('-i --latest', 'yarn upgrade-interactive --latest'));
//# sourceMappingURL=yarn.spec.js.map