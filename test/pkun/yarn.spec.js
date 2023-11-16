import { expect, it } from 'vitest';
import { parsePkUn } from '../../src/commands';
const agent = 'yarn';
function _(arg, expected) {
    return () => {
        expect(parsePkUn(agent, arg.split(' ').filter(Boolean))).toBe(expected);
    };
}
it('single uninstall', _('axios', 'yarn remove axios'));
it('multiple', _('eslint @types/node', 'yarn remove eslint @types/node'));
it('-D', _('eslint @types/node -D', 'yarn remove eslint @types/node -D'));
it('global', _('eslint ni -g', 'yarn global remove eslint ni'));
//# sourceMappingURL=yarn.spec.js.map